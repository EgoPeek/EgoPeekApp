"""
comment.py
    - Contains CRUD endpoints for backend operations related to the comment database table.
    - Takes in REST api calls from the front end and returns requested comment data for use in the front end application.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_database
from backend.database import db_comment
from backend.schemas import schema
from typing import List
from backend.auth.oauth import get_current_user

router = APIRouter()


@router.post('/', response_model = schema.CommentResponse)
def create_comment(request: schema.CommentRequest, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Creates a comment database entry associated with a comment on the EgoPeek App.
    Inputs: {'username': str, 'message': str, 'post_id': int}
    Outputs: {'comment_id': int, 'post_id': int, 'username': str, 'message': str, 'timestamp': datetime}
    """
    return db_comment.create_comment(database, request)


@router.get('/all', response_model = List[schema.CommentResponse])
def retrieve_all_db_comments(database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Retrieves all comments stored in the EgoPeek database.
    Inputs: None
    Outputs: {List[{'comment_id': int, 'post_id': int, 'username': str, 'message': str, 'timestamp': datetime}]}
    """
    return db_comment.get_all_db_comments(database)


@router.get('/all/{post_id}', response_model = List[schema.CommentResponse])
def retrieve_all_post_comments(post_id: int, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Retrieves all comments in the EgoPeek database associated with a specific post id.
    Inputs: 'post_id': int
    Outputs: {List[{'comment_id': int, 'post_id': int, 'username': str, 'message': str, 'timestamp': datetime}]}
    """
    return db_comment.get_all_post_comments(database, post_id)


@router.get('/{comment_id}', response_model = schema.CommentResponse)
def retrieve_comment(comment_id: int, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Retrieves a comment from the EgoPeek database associated with a specific comment id.
    Inputs: 'comment_id': int
    Outputs: {'comment_id': int, 'post_id': int, 'username': str, 'message': str, 'timestamp': datetime}
    """
    return db_comment.get_comment(database, comment_id)


@router.put('/{comment_id}')
def update_comment(comment_id: int, request: schema.CommentRequest, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Updates a comment in the EgoPeek database associated with a specific comment id.
    Inputs: 'comment_id': int, {'username': str, 'message': str, 'post_id': int}
    Outputs: {'success': bool, 'message': str}
    """
    return db_comment.update_comment(database, comment_id, request)


@router.delete('/{comment_id}')
def delete_comment(comment_id: int, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Delets a comment from the EgoPeek database associated with a specific comment id and user id.
    Inputs: 'user_id': int, 'comment_id': int
    Outputs: {'success': bool, 'message': str}
    """
    return db_comment.delete_comment(database, comment_id)

