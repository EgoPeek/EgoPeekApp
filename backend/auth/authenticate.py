"""
authenticate.py
    - contains login endpoint to make sure provided username and password are valid
    - future: oauth2 authentication implementation
"""

from email.policy import HTTP
from fastapi import APIRouter, Depends, status
from backend.auth.oauth import create_access_token
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database.models import DbUser
from backend.database.hash import Hash
from backend import schemas
from fastapi.exceptions import HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

router = APIRouter()


@router.post('/login')
def login(request: schemas.LoginRequest, database: Session = Depends(get_database)):
    """
    Attempts user login for EgoPeek App.
    Inputs: {username: str, password: str}
    Outputs: {'success': bool, 'reason': str}
    """
    user = database.query(DbUser).filter(DbUser.username == request.username).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = 'Invalid username.')
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = 'Invalid password.')
    return {'user_id': user.id, 'username': user.username}


# @router.post('/login')
# def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_database)):
#     user = db.query(DbUser).filter(DbUser.username == request.username).first()
#     if not user:
#         raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
#             detail = 'Invalid username.')
#     if not Hash.verify(user.password, request.password):
#         raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
#             detail = 'Invalid password.')

#     print('creating access token')
#     access_token = create_access_token(data = {'username': user.username})

#     return {
#         'access_token': access_token,
#         'token_type': 'bearer',
#         'user_id': user.id,
#         'username': user.username
#     }


"""
add the line below to endpoints that need to be authenticated:
current_user: schemas.UserAuth = Depends(get_current_user)
"""