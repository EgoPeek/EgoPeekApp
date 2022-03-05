from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database, models, engine
from sqlalchemy.orm.session import Session
from backend.database import db_post
from fastapi.exceptions import HTTPException
from typing import List

router = APIRouter()

models.Base.metadata.create_all(engine)

content_path_types = ['internal', 'external']


@router.post('/', response_model = schemas.PostResponse)
def create_post(request: schemas.PostRequest, database: Session = Depends(get_database)):
    """
    Creates a new post in the EgoPeek database, linked to user. Optional photo/video url links.
    Inputs: {user_id: int, image_url: str, video_url: str, content_path_type: str, message: str}
    Outputs: {user_id: int, image_url: str, video_url: str, content_path_type: str, message: str, timestamp: str, username: str}
    """
    if request.content_path_type and request.content_path_type not in content_path_types:
        raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail = "Path type must be 'internal' or 'external'.")
    return db_post.create_post(database, request)


@router.get('/all', response_model=List[schemas.PostResponse])
def get_all_posts(database: Session = Depends(get_database)):
    """
    Retrieves all posts in the EgoPeek database
    """
    return db_post.get_all_posts(database)


@router.delete('/{user_id}/{post_id}')
def delete_post(user_id, post_id, database: Session = Depends(get_database)):
    """
    Deletes a post from the EgoPeek database.
    """
    return db_post.delete_post(database, int(user_id), int(post_id))
