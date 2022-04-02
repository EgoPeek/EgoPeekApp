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

router = APIRouter()


# Include database model in models.py
# Include input and output classes in schema.py
# Include database functions in db_tag.py
# Write CRUD endpoints
#   - inputs/outputs use schema to filter where appropriate
#   - logic should happen in the db_tag.py file
#   - keep url strings as simple as possible


@router.post('/', response_model = schema.HashtagResponse)
def create_new_hashtag(response: Response, request: schema.HashtagRequest, database: Session = Depends(get_database)):
    '''
    Creates a hashtag entry (if it does not already exist) and adds it to the hashtag database.
    Inputs: {'hashtag_label' : str}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str} 
    '''
    if db_hashtag.check_duplicates(database, request.hashtag_label):
        raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "hashtag already exists in the databse and cannot be duplicated.")
    response.status_code = status.HTTP_201_CREATED
    return db_hashtag.create_hashtag(database, request)


@router.get('/all/hashtag_groups', response_model = List[schema.HashtagGroupResponse])
def retrieve_all_db_hashtag_groups(database: Session = Depends(get_database)):
    """
    Retrieves all hashtag groups with their associated hashtags
    Inputs: None
    Outputs: List[schema: HashtagGroupResponse]
    """
    return db_hashtag.get_all_hashtag_groups(database)


@router.get('/{hashtag_id}', response_model = schema.HashtagResponse)
def retrieve_hashtag(hashtag_id, database: Session = Depends(get_database)):
    """
    Retrieves from the EgoPeek database given a specific tag id.
    Inputs: {'hashtag_id' : int}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str, 'hashtag_counter' : int}
    """
    return db_hashtag.get_hashtag(database, hashtag_id)


# @router.get('/all/hashtags', response_model = List[schema.HashtagResponse])
@router.get('/all/hashtags', response_model = List[schema.HashtagResponse])
def retrieve_all_db_hashtags(database: Session = Depends(get_database)):
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
def update_tag(hashtag_id, request: schema.HashtagRequest, database: Session = Depends(get_database)):
    """
    Updates a hashtag in the EgoPeek database.
    Inputs: {'hashtag_id' : int}
    Outputs: {'success' : bool, 'message' : str}
    """
    return db_hashtag.update_hashtag(database, hashtag_id, request)


@router.delete('/{hashtag_id}')
def delete_tag(hashtag_id, database: Session = Depends(get_database)):
    """
    Deletes a hashtag from the EgoPeek database.
    """
    return db_hashtag.delete_hashtag(database, int(hashtag_id))


#Endpoints
#The Hashtag Search API consists of the following nodes and edges:

# GET /ig_hashtag_search — to get a specific hashtag's node ID
# GET /{ig-hashtag-id} — to get data about a hashtag
# GET /{ig-hashtag-id}/top_media — to get the most popular photos and videos that have a specific hashtag
# GET /{ig-hashtag-id}/recent_media — to get the most recently published photos and videos that have a specific hashtag
# GET /{ig-user-id}/recently_searched_hashtags — to determine the unique hashtags an Instagram Business or Creator Account has searched for in the current week