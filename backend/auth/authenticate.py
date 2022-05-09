"""
authenticate.py
    - contains login endpoint to make sure provided username and password are valid
    - future: oauth2 authentication implementation
"""

from fastapi import APIRouter, Depends, status, BackgroundTasks
from backend.auth.oauth import create_access_token, get_current_user
from backend.database import get_database, db_user
from sqlalchemy.orm.session import Session
from backend.database.models import DbUser
from backend.database.hash import Hash
from backend import schemas
from fastapi.exceptions import HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from backend.core.config import email_config
import random
import string

router = APIRouter()


@router.post('/emails/reset-password', response_model = schemas.ResetEmailResponse)
async def create_password_email(request: schemas.ResetEmailRequest, background_tasks: BackgroundTasks, database: Session = Depends(get_database)):
    """
    Sends an email to the user with a reset password code, updates user table to reflect new code
    """
    # retrieve user information from db with given username
    try:
        user = db_user.get_user_by_username(database, request.username)
    except Exception as e:
        success = False
        status = f'User database retrieval failure: {str(e)}'

    # make sure provided password matches password stored in the db
    if request.email == user.email:

        # generate random token and store it in the database
        random_token = ''.join(random.choice(string.ascii_lowercase) for x in range(50))
        db_user.update_user_reset_token(database, request.username, random_token)

        # build email payload
        body = {'name': request.username, 'title': 'EgoPeek Password Reset', 'token': random_token}
        message = MessageSchema(
            subject = "EgoPeek Password Reset Request",
            recipients = [user.email],
            template_body = body,)
        success = True
        status = f'Password reset request email sent.'

        # send email
        try:
            fm = FastMail(email_config)
            background_tasks.add_task(fm.send_message, message, template_name = 'emails.html')
        except Exception as e:
            success = False
            status = f'Email send failure: {str(e)}'

    # handle case where provided email does not match database
    else:
        success = False
        status = 'Provided email does not match email associated with this user.'
        random_token = "error"

    return {'user_id': user.id,
            'username': request.username,
            'email': user.email,
            'reset_token': random_token,
            'success': success,
            'status': status}

 
@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_database)):
    user = db.query(DbUser).filter(DbUser.username == request.username).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = 'Invalid username.')
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = 'Invalid password.')

    access_token = create_access_token(data = {'username': user.username}) # key 'username'

    return {
        'access_token': access_token,
        'token_type': 'Bearer',
        'user_id': user.id,
        'username': user.username
    }


@router.get('/users/me/', response_model=schemas.UserResponse)
async def read_current_user(current_user = Depends(get_current_user)):
    return current_user