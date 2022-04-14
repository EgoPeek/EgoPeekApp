"""
hashtag.py
    - Contains CRUD endpoints for backend operations related to the tag database table.
    - Takes in REST api calls from the front end and returns requested tag data for use in the front end application.
"""

from fastapi import APIRouter, Depends, HTTPException, status, Response, Form
from backend.database import get_database
from sqlalchemy.orm import Session
from backend.database import db_hashtag
from backend.schemas import schema
from typing import List
from backend.auth.oauth import get_current_user

router = APIRouter()


@router.post('/', response_model = schema.HashtagResponse)
def create_new_hashtag(response: Response, request: schema.HashtagRequest, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    '''
    Creates a hashtag entry (if it does not already exist) and adds it to the hashtag database.
    Inputs: {'hashtag_label' : str}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str} 
    '''
    return db_hashtag.create_hashtag(database, request)


@router.get('/all/hashtag_groups', response_model = List[schema.HashtagGroupResponse])
def retrieve_all_db_hashtag_groups(database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Retrieves all hashtag groups with their associated hashtags
    Inputs: None
    Outputs: List[schema: HashtagGroupResponse]
    """
    return db_hashtag.get_all_hashtag_groups(database)


@router.get('/{hashtag_id}', response_model = schema.HashtagResponse)
def retrieve_hashtag(hashtag_id, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Retrieves from the EgoPeek database given a specific tag id.
    Inputs: {'hashtag_id' : int}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str, 'hashtag_counter' : int}
    """
    return db_hashtag.get_hashtag(database, hashtag_id)


@router.get('/all/hashtags', response_model = List[schema.HashtagResponse])
def retrieve_all_db_hashtags(database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Retrieves all tags in the EgoPeek database.
    Inputs: {None}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str}
    """
    return db_hashtag.get_db_hashtags(database)


@router.get('/top/{count}')
def retrieve_top_hashtags(count, database: Session = Depends(get_database)):
    """
    Retrieves most used tags in the EgoPeek database.
    Inputs: number of desired top tags to show
    Outputs: {'hashtag_label' : str}
    """
    return db_hashtag.get_top_hashtags(database, int(count))


@router.put('/{hashtag_id}')
def update_tag(hashtag_id, request: schema.HashtagRequest, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Updates a hashtag in the EgoPeek database.
    Inputs: {'hashtag_id' : int}
    Outputs: {'success' : bool, 'message' : str}
    """
    return db_hashtag.update_hashtag(database, hashtag_id, request)


@router.delete('/{hashtag_id}')
def delete_tag(hashtag_id, database: Session = Depends(get_database), current_user: schema.UserAuth = Depends(get_current_user)):
    """
    Deletes a hashtag from the EgoPeek database.
    """
    return db_hashtag.delete_hashtag(database, int(hashtag_id))