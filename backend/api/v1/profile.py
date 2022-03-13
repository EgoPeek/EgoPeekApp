from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_profile
from typing import List

router = APIRouter()


@router.post('/', response_model = schemas.ProfileResponse)
def create_profile(request: schemas.ProfileRequest, database: Session = Depends(get_database)):
    """
    Creates a user profile.
    Inputs: schema: ProfileRequest
    Outputs: schema: ProfileResponse
    """
    return db_profile.create_profile(database, request)


@router.get('/all', response_model = List[schemas.ProfileResponse])
def retrieve_all_db_profiles(database: Session = Depends(get_database)):
    """
    Retrieves all profile data stored in the database.
    Inputs: None
    Outputs: List[schema: ProfileResponse]
    """
    return db_profile.get_all_db_profiles(database)


@router.get('/{user_id}', response_model = schemas.ProfileResponse)
def retrieve_user_profile(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all information stored for the given user ID.
    Inputs: user_id: int
    Outputs: schema: ProfileResponse
    """
    return db_profile.get_user_profile(database, user_id)


@router.put('/{user_id}')
def update_profile(user_id, request: schemas.ProfileRequest, database: Session = Depends(get_database)):
    """
    Updates the profile database entry associated with the given user_id.
    Inputs: user_id: int, schema: ProfileRequest
    Outputs: {'success': bool, 'message': str}
    """
    return db_profile.update_profile(database, user_id, request)


@router.delete('/{user_id}')
def delete_profile(user_id, database: Session = Depends(get_database)):
    """
    Deletes the profile of the given user from the EgoPeek database.
    Inputs: user_id: int
    Outputs: {'success': bool, 'messsage': str}
    """
    return db_profile.delete_profile(database, user_id)