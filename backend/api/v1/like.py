"""
like.py
    - Contains CRUD endpoints for backend operations related to the like database table.
    - Takes in REST api calls from the front end and returns requested like data for use in the front end application.
"""

from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_like
from fastapi.exceptions import HTTPException
from typing import List

router = APIRouter()

@router.post('/')
def create_like(request: schemas.LikeRequest, database: Session = Depends(get_database)):
    """
    Creates a like in the database, increments the number of likes for the given post or comment.
    """
    if not request.post_id and not request.comment_id:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail = "Must include either a post ID or a comment ID.")
    if request.post_id and request.comment_id:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail = "Cannot include both a post ID and a comment ID.")
    db_like.increment_like_count(database, request.post_id, request.comment_id)
    return db_like.create_like(database, request)


@router.get('/all')
def retrieve_all_db_likes(database: Session = Depends(get_database)):
    """
    Retrieves all like data stored in the database.
    """
    return db_like.get_db_likes(database)


@router.get('/users/{user_id}')
def retrieve_all_likes_by_user(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all like data for a user.
    """
    return db_like.get_user_likes(database, user_id)


@router.get('/posts/{post_id}', response_model = List[schemas.LikeResponse])
def retrieve_all_likes_by_post(post_id, database: Session = Depends(get_database)):
    """
    Retrieves all like data for a post.
    """
    return db_like.get_post_likes(database, post_id)


@router.get('/comments/{comment_id}', response_model = List[schemas.LikeResponse])
def retrieve_all_likes_by_comment(comment_id, database: Session = Depends(get_database)):
    """
    Retrieves all like data for a comment.
    """
    return db_like.get_comment_likes(database, comment_id)


@router.delete('/')
def delete_like(request: schemas.LikeRequest, database: Session = Depends(get_database)):
    """
    Deletes a like in the database, decrements the like count for the given post or comment
    """
    if not request.post_id and not request.comment_id:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail = "Must include either a post ID or a comment ID.")
    if request.post_id and request.comment_id:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                        detail = "Cannot include both a post ID and a comment ID.")
    db_like.decrement_like_count(database, request.post_id, request.comment_id)
    db_like.delete_like(database, request)