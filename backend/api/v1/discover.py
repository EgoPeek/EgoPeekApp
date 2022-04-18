"""
discover.py
    - Contains CRUD endpoints for the discover page on the front end.
    - Takes in REST api calls from the front end and returns requested discover data for use in the front end application.
"""

from fastapi import APIRouter, Depends, status, Response
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_hashtag, db_post
from fastapi.exceptions import HTTPException
from typing import List
from backend.auth.oauth import get_current_user

router = APIRouter()


@router.post('/selected', response_model = List[schemas.PostResponse])
def create_selected_hashtag_feed(request: schemas.DiscoverCustomRequest, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Creates and returns a feed of posts related to whatever hashtags are passed in as input.
    Inputs: List[str]
    Outputs: List[schemas: PostResponse]
    """
    return db_post.get_hashtag_posts(database, request.hashtags)


@router.get('/trending/{count}', response_model = List[schemas.PostResponse])
def retrieve_trending_hashtag_posts(count: int, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Retrieves all posts associated with the top {count} hashtags
    Inputs: count: int
    Outputs: List[schemas: PostResponse]
    """
    top_tags = db_hashtag.get_top_hashtags(database, count)
    return db_post.get_hashtag_posts(database, top_tags)


@router.get('/most-liked/{count}', response_model = List[schemas.PostResponse])
def retrieve_most_liked_posts(count: int, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Retrieves the top {count} most liked posts (unordered - need to sort on front end)
    Inputs: count: int
    Outputs: List[schemas: PostResponse]
    """
    return db_post.get_top_liked_posts(database, count)


@router.get('/most-recent/{count}', response_model = List[schemas.PostResponse])
def retrieve_most_recent_posts(count: int, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Retrieves the top {count} most recent posts
    Inputs: count: int
    Outputs: List[schemas: PostResponse]
    """
    return db_post.get_most_recent_posts(database, count)


@router.get('/most-commented/{count}', response_model = List[schemas.PostResponse])
def retrieve_most_commented_posts(count: int, database: Session = Depends(get_database), current_user: schemas.UserAuth = Depends(get_current_user)):
    """
    Retrieves the top {count} most commented posts (unordered - need to sort on front end)
    Inputs: count: int
    Outputs: List[schemas: PostResponse]
    """
    return db_post.get_top_commented_posts(database, count)
