from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_post
from fastapi.exceptions import HTTPException
from typing import List

router = APIRouter()

content_path_types = ['internal', 'external']


@router.post('/', response_model = schemas.PostResponse)
def create_post(request: schemas.PostRequest, database: Session = Depends(get_database)):
    """
    Creates a new post in the EgoPeek database, linked to user. Optional photo/video url links.
    Inputs: {'user_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str}
    Outputs: {'user_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str, 'timestamp': str, 'username': str}
    """
    if request.content_path_type and request.content_path_type not in content_path_types:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail = "Path type must be 'internal' or 'external'.")
    return db_post.create_post(database, request)


@router.get('/all', response_model = List[schemas.PostResponse])
def retrieve_all_db_posts(database: Session = Depends(get_database)):
    """
    Retrieves all posts in the EgoPeek database.
    Inputs: None
    Outputs: {'user_id': int, 'post_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str, 'timestamp': datetime, 'user': class, 'comments': list(class)}
    """
    return db_post.get_all_posts(database)


@router.get('/all/{user_id}', response_model = List[schemas.PostResponse])
def retrieve_all_user_posts(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all posts from the EgoPeek database made by a specific user.
    Inputs: 'user_id': str
    Outputs: {'user_id': int, 'post_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str, 'timestamp': datetime, 'user': class, 'comments': list(class)}
    """
    return db_post.get_all_user_posts(database, user_id)


@router.get('/{post_id}', response_model = schemas.PostResponse)
def retrieve_post(post_id, database: Session = Depends(get_database)):
    """
    Retrieves from the EgoPeek database given a specific post given a post id.
    Inputs: 'post_id': str
    Outputs: {'user_id': int, 'post_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str, 'timestamp': datetime, 'user': class, 'comments': class}
    """
    return db_post.get_post(database, post_id)


@router.put('/{post_id}')
def update_post(post_id: str, request: schemas.PostRequest, database: Session = Depends(get_database)):
    """
    Updates a post in the EgoPeek database.
    Inputs: 'post_id': str, {'user_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str}
    Outputs: {'success': bool, 'message': str}
    """
    return db_post.update_post(database, post_id, request)


@router.delete('/{user_id}/{post_id}')
def delete_post(user_id, post_id, database: Session = Depends(get_database)):
    """
    Deletes a post from the EgoPeek database.
    """
    return db_post.delete_post(database, int(user_id), int(post_id))
