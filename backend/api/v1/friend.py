"""
friend.py
    - Contains CRUD endpoints for backend operations related to the friend database table.
    - Takes in REST api calls from the front end and returns requested friend data for use in the front end application.
"""

from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_friend
from fastapi.exceptions import HTTPException
from typing import List

router = APIRouter()

responses = ['friends', 'declined']

@router.post('/requests', response_model = schemas.FriendResponse)
def create_friend_request(request: schemas.FriendRequest, database: Session = Depends(get_database)):
    """
    Creates a friend request in the EgoPeek database.
    Inputs: class: FriendRequest
    Outputs: class: FriendResponse
    """
    return db_friend.create_friend_request(database, request)


@router.get('/all', response_model = List[schemas.FriendResponse])
def retrieve_all_db_friends(database: Session = Depends(get_database)):
    """
    Retrieves all friends for the specified user from the EgoPeek database.
    Inputs: user_id: None
    Outputs: List[class: FriendResponse]
    """
    return db_friend.get_all_db_friends(database)


@router.get('/all/{user_id}', response_model = List[schemas.FriendResponse])
def retrieve_all_user_friends(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all friends for the specified user from the EgoPeek database.
    Inputs: user_id: int
    Outputs: List[class: FriendResponse]
    """
    return db_friend.get_all_user_friends(database, user_id)


@router.get('/list/{user_id}', response_model = List[schemas.FriendListResponse])
def retrieve_friend_list_data(user_id, database: Session = Depends(get_database)):
    """
    Retrieves the user id, username, and avatar path for all of the user's current friends
    Inputs: user_id: int
    Outputs: List[schema: FriendListResponse]
    """
    return db_friend.get_friend_list(database, user_id)


@router.get('/status/{user_id}', response_model = List[schemas.FriendStatusResponse])
def retrieve_friend_list_status(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all of a user's friends along with status
    Inputs: user_id: int
    Outputs: List[schema: FriendStatusResponse]
    """
    return db_friend.get_friend_list_status(database, user_id)


@router.get('/search/{username}', response_model = schemas.FriendListResponse)
def retrieve_user_by_name(username, database: Session = Depends(get_database)):
    """
    Retrieves user id, username, and avatar path for searched user
    Inputs: username: str
    Outputs: schema: FriendListResponse
    """
    result = db_friend.find_user(database, username)
    if not result:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                            detail = f'Username {username} does not exist')
    return result


@router.put('/responses')
def update_friend_request(request: schemas.FriendRequest, database: Session = Depends(get_database)):
    """
    Updates friend status to 'friends' or 'declined' for both sender and recipient.
    Inputs: class: FriendRequest
    Outputs: {'success': bool, 'message': str}
    """
    if request.answer not in responses:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail = "Answer must be 'friends' or 'declined'.")
    return db_friend.update_friend_request(database, request)


@router.delete('/{user_id}/{friend_id}')
def delete_friend(user_id, friend_id, database: Session = Depends(get_database)):
    """
    Deletes a friend entry in the EgoPeek database for both users.
    Inputs: user_id: int, friend_id: int
    Outputs: {'success': bool, 'message': str}
    """
    return db_friend.delete_friends(database, int(user_id), int(friend_id))