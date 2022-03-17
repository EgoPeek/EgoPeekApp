"""
message.py
    - Contains CRUD endpoints for backend operations related to the message, thread, and thread_members database tables.
    - Takes in REST api calls from the front end and returns requested direct message data for use in the front end application.
"""

from pkgutil import get_data
from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_message
from typing import List

router = APIRouter()


@router.post('/', response_model = schemas.MessageResponse)
def create_thread(request: schemas.FirstMessageRequest, database: Session = Depends(get_database)):
    """
    Creates new thread, thread_member, and message entries in the EgoPeek database.
    Inputs: schema: FirstMessageRequest
    Outputs: schema: MessageResponse
    """
    return db_message.create_thread(database, request)


@router.post('/replies', response_model = schemas.MessageResponse)
def create_reply(request: schemas.ReplyRequest, database: Session = Depends(get_database)):
    """
    Creates a new message entry in the EgoPeek database in reference to an existing thread.
    Inputs: schema: ReplyRequest
    Outputs: schema: MessageResponse
    """
    return db_message.create_reply(database, request)


@router.get('/threads', response_model = List[schemas.ThreadResponse])
def retrieve_all_db_threads(database: Session = Depends(get_database)):    
    """
    Retrieves all direct message threads stored in the EgoPeek database.
    Inputs: None
    Outputs: List[schema: ThreadResponse]
    """
    return db_message.get_all_threads_db(database)


@router.get('/thread_ids/{user_id}/{friend_id}')
def retrieve_thread_id(user_id, friend_id, database: Session = Depends(get_database)):
    """
    Retrieves the unique thread ID in use between two users.
    Inputs: user_id: int, friend_id: int
    Outputs: {'thread_id': int}
    """
    return db_message.get_thread_id(database, user_id, friend_id)


@router.get('/threads/all/{user_id}', response_model = List[schemas.ThreadResponse])
def retrieve_all_user_threads(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all direct message threads associated with the given user.
    Inputs: user_id: int
    Outputs: List[schema: ThreadResponse]
    """
    return db_message.get_all_user_threads(database, user_id)


@router.get('/threads/{thread_id}/{user_id}', response_model = schemas.ThreadResponse)
def retrieve_thread(thread_id, user_id, database: Session = Depends(get_database)):
    """
    Retrieves a specific direct message thread.
    Inputs: thread_id: int, user_id: int
    Outputs: schema: ThreadResponse
    """
    return db_message.get_thread(database, thread_id, user_id)


@router.get('/new/{user_id}')
def retrieve_user_unread_counts(user_id, database: Session = Depends(get_database)):
    """
    Retrieves thread IDs and the number of unread messages in each for given user.
    Inputs: user_id: int
    Outputs: List[{'thread_id': int, 'count': int}]
    """
    return db_message.get_unread_counts(database, user_id)


@router.put('/{message_id}')
def update_message(message_id, request: schemas.ReplyRequest, database: Session = Depends(get_database)):
    """
    Updates the body of a message.
    Inputs: message_id: int, schema: ReplyRequest
    Outputs: {'success': bool, 'message': str}
    """
    return db_message.update_message(database, message_id, request)


@router.delete('/{message_id}')
def delete_message(message_id, database: Session = Depends(get_database)):
    """
    Deletes a message from the database.
    Inputs: message_id: int
    Outputs: {'success': bool, 'message': str}
    """
    return db_message.delete_message(database, message_id)