from backend import schemas
from sqlalchemy.orm.session import Session
from .models import DbPost
import datetime
from fastapi.exceptions import HTTPException
from fastapi import status


def create_post(db: Session, request: schemas.PostRequest):
    new_post = DbPost(
        image_url = request.image_url,
        video_url = request.video_url,
        content_path_type = request.content_path_type,
        message = request.message,
        timestamp = datetime.datetime.now(),
        user_id = request.user_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(DbPost).all()


def delete_post(db: Session, user_id: int, post_id: int):
    result = db.query(DbPost).filter(DbPost.post_id == post_id).first()
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f'Post ID: {post_id} not found.')
    if result.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                detail=f'User {user_id} did not create post ID: {post_id}.')
    db.delete(result)
    db.commit()
    return True