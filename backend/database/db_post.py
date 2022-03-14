from backend import schemas
from sqlalchemy.orm.session import Session
from .models import DbPost, DbFriend
from datetime import datetime
from fastapi.exceptions import HTTPException
from fastapi import status


def create_post(db: Session, request: schemas.PostRequest):
    new_post = DbPost(
        image_url = request.image_url,
        video_url = request.video_url,
        content_path_type = request.content_path_type,
        message = request.message,
        timestamp = datetime.now(),
        user_id = request.user_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(DbPost).all()


def get_user_feed(db: Session, user_id: int):
    # build list of friend ids for requested user
    users = [row[0] for row in db.query(DbFriend.friend_id).filter(DbFriend.user_id == user_id).all()]
    
    # add user to list of ids to retrieve
    users.append(user_id)
    
    # return all posts in the users list
    return db.query(DbPost).filter(DbPost.user_id.in_(users)).order_by(DbPost.timestamp).all()


def get_all_user_posts(db: Session, user_id: int):
    return db.query(DbPost).filter(DbPost.user_id == user_id).all()


def get_post(db: Session, post_id: int):
    return db.query(DbPost).filter(DbPost.post_id == post_id).first()


def update_post(db: Session, post_id: int, request: schemas.PostRequest):
    result = db.query(DbPost).filter(DbPost.post_id == post_id)
    result.update({
            DbPost.image_url: request.image_url,
            DbPost.video_url: request.video_url,
            DbPost.content_path_type: request.content_path_type,
            DbPost.message: request.message,
            DbPost.timestamp: datetime.now()
        })
    db.commit()
    return {'success': True, 'message': 'Updated post ID: {post_id}'}


def delete_post(db: Session, user_id: int, post_id: int):
    result = db.query(DbPost).filter(DbPost.post_id == post_id).first()
    db.delete(result)
    db.commit()
    return {'success': True, 'message': 'Deleted post ID: {post_id}'}