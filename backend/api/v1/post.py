"""
post.py
    - Contains CRUD endpoints for backend operations related to the post database table.
    - Takes in REST api calls from the front end and returns requested post data for use in the front end application.
    - Allows file upload for locally stored video and images related to user posts.
"""

from fastapi import APIRouter, Depends, status, UploadFile, File
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_post
from fastapi.exceptions import HTTPException
from typing import List
import random
import string
import shutil

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


@router.post('/images')
def upload_image(image: UploadFile = File(...)):
    """
    Uploads an image to the EgoPeek file directory for posting directly to the app instead of by url.
    Inputs: file
    Outputs: {'relative_image_path': str}
    """
    letters = string.ascii_letters
    random_string = ''.join(random.choice(letters) for i in range(10))
    unique_file_ending = f'_{random_string}.'
    unique_filename = unique_file_ending.join(image.filename.rsplit('.', 1))
    file_path = f'backend/user_images/{unique_filename}'
    static_path = f'/user_images/{unique_filename}'

    with open(file_path, "w+b") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return{'relative_image_path': static_path}


@router.post('/videos')
def upload_video(video: UploadFile = File(...)):
    """
    Uploads a video to the EgoPeek file directory for posting directly to the app instead of by url.
    Inputs: file
    Outputs: {'relative_video_path': str}
    """
    letters = string.ascii_letters
    random_string = ''.join(random.choice(letters) for i in range(10))
    unique_file_ending = f'_{random_string}.'
    unique_filename = unique_file_ending.join(video.filename.rsplit('.', 1))
    file_path = f'backend/user_videos/{unique_filename}'
    static_path = f'/user_images/{unique_filename}'

    with open(file_path, "w+b") as buffer:
        shutil.copyfileobj(video.file, buffer)

    return{'relative_video_path': static_path}


@router.get('/all', response_model = List[schemas.PostResponse])
def retrieve_all_db_posts(database: Session = Depends(get_database)):
    """
    Retrieves all posts in the EgoPeek database.
    Inputs: None
    Outputs: {'user_id': int, 'post_id': int, 'image_url': str, 'video_url': str, 'content_path_type': str, 'message': str, 'timestamp': datetime, 'user': class, 'comments': list(class)}
    """
    return db_post.get_all_posts(database)


@router.get('/feed/{user_id}', response_model = List[schemas.PostResponse])
def retrieve_user_feed(user_id, database: Session = Depends(get_database)):
    """
    Retrieves a feed comprising of a user's posts, their friend's posts, and their interests, ordered chronologically.
    Inputs: user_id: int
    Outputs: List[schema: PostResponse]
    """
    return db_post.get_user_feed(database, user_id)


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
def update_post(post_id, request: schemas.PostRequest, database: Session = Depends(get_database)):
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
