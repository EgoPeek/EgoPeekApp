"""
user.py
    - Contains CRUD endpoints for backend operations related to the user database table.
    - Takes in REST api calls from the front end and returns requested user data for use in the front end application.
"""

from fastapi import APIRouter, Depends, status, Response
from fastapi.exceptions import HTTPException
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_user
from typing import List
from backend.auth.oauth import get_current_user

router = APIRouter()


@router.post('/', response_model=schemas.UserResponse)
def create_new_user(response: Response, request: schemas.UserRequest, database: Session = Depends(get_database)):
    """
    Creates a new user in the EgoPeek database.
    Inputs: {'username': str, 'email': str, 'password': str}
    Outputs: {'id': int, 'username': str, 'email': str}
    """
    if db_user.check_duplicates(database, request.username, request.email):
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail = 'Username or Email already exists.')
    response.status_code = status.HTTP_201_CREATED
    return db_user.create_user(database, request)


@router.get('/all', response_model=List[schemas.UserResponse])
def retrieve_all_users(database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Returns all users and their emails currently entered in the EgoPeek database.
    Inputs: None
    Outputs: {'id': int, 'username': str, 'email': str}
    """
    return db_user.get_all_user_data(database)


@router.get('/{username}', response_model=schemas.UserResponse)
def retrieve_user(username, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Retrieves user information from the EgoPeek database.
    Inputs: {username: str}
    Outputs: {'id': int, 'username': str, 'email': str}
    """
    return db_user.get_user_data(database, username)


@router.put('/{username}')
def update_user(username: str, request: schemas.UserRequest, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Updates user data stored in EgoPeek database.
    Inputs: {'username': str, 'email': str, 'password': str}
    Outputs: {'success': bool, 'message': str}
    """
    return db_user.update_user_data(database, username, request)


@router.put('/passwords/{username}')
def update_password(username: str, request: schemas.UpdatePasswordRequest, database: Session = Depends(get_database)):
    """
    Updates user password stored in the EgoPeek database after checking validity of reset token.
    Input: {username: str, schema: UpdatePasswordRequest}
    Outputs: {'success': bool, 'message': str}
    """
    if not db_user.check_reset_token(database, username, request.reset_token):
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail = 'Invalid reset token provided')
    return db_user.update_user_password(database, username, request.new_password)


@router.delete('/{username}')
def delete_user(username, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Deletes user data from EgoPeek database.
    Inputs: {'username': str}
    Outputs: {'success': bool, 'message': str}
    """
    return db_user.delete_user_data(database, username)