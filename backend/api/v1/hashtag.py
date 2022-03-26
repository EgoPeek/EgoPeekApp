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
    post_id and comment_id are optional as hashtag can come from either or both. Counter of hashtag is optional as well
    Inputs: {'hashtag_label' : str, 'post_id' : int, 'comment_id' : int, 'user_id' : int, 'hashtag_counter' : int}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str, 'hashtag_counter' : int, 'post_used_hashtag' : [List[Post]], 'comment_used_hashtag' : [List[Comment]], 'user' : User 
    '''
    if db_hashtag.check_duplicates(database, request.hashtag_label):
        raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "hashtag already exists in the databse and cannot be duplicated.")
    response.status_code = status.HTTP_201_CREATED
    return db_hashtag.create_new_hashtag(database, request)


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


@router.get('/all', response_model = List[schema.HashtagResponse])
def retrieve_all_db_hashtags(database: Session = Depends(get_database)):
    """
    Retrieves all tags in the EgoPeek database.
    Inputs: {None}
    Outputs: {'hashtag_id' : int, 'hashtag_label' : str, 'hashtag_counter' : int}
    """
    return db_hashtag.get_db_hashtags(database)


@router.get('/all/{post_id}', response_model = List[schema.HashtagResponse])
def retrieve_post_hashtags(post_id, database: Session = Depends(get_database)):
    """
    Retrieves all tags used in a specific post from the EgoPeek database.
    Inputs: 'post_id' : int
    Outputs: {'post_id' : int, 'hashtag_id' : int, 'hashtag_label' : str}
    """
    return db_hashtag.get_post_hashtags(database, post_id)


@router.get('/all/{comment_id}', response_model = List[schema.HashtagResponse])
def retrieve_comment_hashtags(comment_id, database: Session = Depends(get_database)):
    """
    Retrieves all tags used in a specific comment from the EgoPeek database.
    Inputs: 'comment_id' : int
    Outputs: {'comment_id' : int, 'hashtag_id' : int, 'hashtag_label' : str}
    """
    return db_hashtag.get_comment_hashtags(database, comment_id)


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