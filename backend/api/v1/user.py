from fastapi import APIRouter, Depends, status, Response
from fastapi.exceptions import HTTPException
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_user
from typing import List

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
def retrieve_all_users(database: Session = Depends(get_database)):
    """
    Returns all users and their emails currently entered in the EgoPeek database.
    Inputs: None
    Outputs: {'id': int, 'username': str, 'email': str}
    """
    return db_user.get_all_user_data(database)


@router.get('/{username}', response_model=schemas.UserResponse)
def retrieve_user(username, database: Session = Depends(get_database)):
    """
    Retrieves user information from the EgoPeek database.
    Inputs: {username: str}
    Outputs: {'id': int, 'username': str, 'email': str}
    """
    return db_user.get_user_data(database, username)


@router.put('/{username}')
def update_user(username: str, request: schemas.UserRequest, database: Session = Depends(get_database)):
    """
    Updates user data stored in EgoPeek database.
    Inputs: {'username': str, 'email': str, 'password': str}
    Outputs: {'success': bool, 'message': str}
    """
    return db_user.update_user_data(database, username, request)


@router.delete('/{username}')
def delete_user(username, database: Session = Depends(get_database)):
    """
    Deletes user data from EgoPeek database.
    Inputs: {'username': str}
    Outputs: {'success': bool, 'message': str}
    """
    return db_user.delete_user_data(database, username)


# Notes for raw SQL queries (tested, they work)
"""
@router.get('/test')
def test_SQL(database: Session = Depends(get_database)):
    print('attempting to retrieve table info')
    result = database.execute('DESCRIBE user')
    names = [row for row in result]
    print(names)

    
@router.put('/alter/table')
def test_alter(database: Session = Depends(get_database)):
    print('attempting to alter table schema')
    result = database.execute('ALTER TABLE user MODIFY email varchar(60)')

@router.delete('/delete/table/{name}')
def delete_table(name, database: Session = Depends(get_database)):
    print(f'attempting to delete table: {name}')
    result = database.execute(f'DROP TABLE IF EXISTS {name};')
    return result
"""