"""
db_like.py
    - contains functions for database operations relating to the like table
    - functions from here are called by like-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbLike, DbPost, DbComment
from backend.schemas import schema


def create_like(db: Session, request: schema.LikeRequest):
    if request.post_id:
        new_like = DbLike(
            user_id = request.user_id,
            post_id = request.post_id
        )
        return_val = f'Post ID: {request.post_id}'

    else:
        new_like = DbLike(
            user_id = request.user_id,
            comment_id = request.comment_id
        )
        return_val = f'Comment ID: {request.comment_id}' 

    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return {'success': True, 'message': f'User ID: {request.user_id} ({request.username}) liked {return_val}.'}


def increment_like_count(db: Session, post_id: int, comment_id: int):
    if post_id: 
        post_data = db.query(DbPost).filter(DbPost.post_id == post_id)
        if post_data.first().like_count:
            new_count = post_data.first().like_count + 1
        else:
            new_count = 1
        post_data.update({
            DbPost.like_count: new_count
        })
        return_message = f'Like count for Post ID: {post_id} increased to a total of {new_count}.'
    
    else:
        comment_data = db.query(DbComment).filter(DbComment.comment_id == comment_id)
        if comment_data.first().like_count:
            new_count = comment_data.first().like_count + 1
        else:
            new_count = 1
        comment_data.update({
            DbComment.like_count: new_count
        })
        return_message = f'Like count for comment ID: {comment_id} increased to a total of {new_count}.'
    db.commit()
    return {'success': True, 'message': {return_message}}
        


def get_db_likes(db: Session):
    return db.query(DbLike).all()


def get_user_likes(db: Session, user_id: int):
    return db.query(DbLike).filter(DbLike.user_id == user_id).all()


def get_post_likes(db: Session, post_id: int):
    return db.query(DbLike).filter(DbLike.post_id == post_id).all()


def get_comment_likes(db: Session, comment_id: int):
    return db.query(DbLike).filter(DbLike.comment_id == comment_id).all()


def delete_like(db: Session, request: schema.LikeRequest):
    if request.post_id:
        result = db.query(DbLike).filter(DbLike.post_id == request.post_id, DbLike.user_id == request.user_id).first()
        return_message = f'User ID {request.user_id} no longer like post ID {request.post_id}'
    else:
        result = db.query(DbLike).filter(DbLike.comment_id == request.comment_id, DbLike.user_id == request.user_id).first()
        return_message = f'User ID {request.user_id} no longer like comment ID {request.comment_id}'
    db.delete(result)
    db.commit()
    return {'success': True, 'message': {return_message}}



def decrement_like_count(db: Session, post_id: int, comment_id: int):
    if post_id:
        post_data = db.query(DbPost).filter(DbPost.post_id == post_id)
        new_count = post_data.first().like_count - 1
        post_data.update({
            DbPost.like_count: new_count
        })
        return_message = f'Like count for Post ID: {post_id} decreased to a total of {new_count}.'
    
    else:
        comment_data = db.query(DbComment).filter(DbComment.comment_id == comment_id)
        new_count = comment_data.first().like_count - 1
        comment_data.update({
            DbComment.like_count: new_count
        })
        return_message = f'Like count for comment ID: {comment_id} decreased to a total of {new_count}.'
    
    db.commit()
    return {'success': True, 'message': {return_message}}