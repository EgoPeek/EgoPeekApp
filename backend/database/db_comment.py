"""
db_comment.py
    - contains functions for database operations relating to the comment table
    - functions from here are called by comment-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbComment
from backend.schemas import schema
from datetime import datetime
from backend.database import db_hashtag


def create_comment(db: Session, request: schema.CommentRequest):
    hashtag_group_id = None

    # check if hashtags need to be associated with the comment
    if request.hashtags:
        # create a new hashtag group
        hashtag_group = db_hashtag.create_hashtag_group(db)
        hashtag_group_id = hashtag_group.group_id

        # iterate through the hashtags and add each tag to the database, associating them with the new hashtag group
        for tag in request.hashtags:
            db_hashtag.create_grouped_tag(db, hashtag_group_id, tag)

    # build comment object        
    new_comment = DbComment(
        message = request.message,
        user_id = request.user_id,
        post_id = request.post_id,
        timestamp = datetime.now(),
        hashtag_group_id = hashtag_group_id)
    
    # add comment object to database
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def get_all_db_comments(db: Session):
    return db.query(DbComment).all()


def get_all_post_comments(db: Session, post_id: int):
    return db.query(DbComment).filter(DbComment.post_id == post_id).all()


def get_comment(db: Session, comment_id: int):
    return db.query(DbComment).filter(DbComment.comment_id == comment_id).first()


def update_comment(db: Session, comment_id: int, request: schema.CommentRequest):
    # retrieve comment to update
    comment = db.query(DbComment).filter(DbComment.comment_id == comment_id)

    # if there are no existing hashtags and none requested, maintain null value for hashtag group id
    updated_group_id = comment[0].hashtag_group_id

    # if there are no current hashtags on the comment, but the update request has hashtags, create a new group
    if not comment[0].hashtag_group_id and request.hashtags:
        hashtag_group = db_hashtag.create_hashtag_group(db)
        for tag in request.hashtags:
            db_hashtag.create_grouped_tag(db, hashtag_group.group_id, tag)
        updated_group_id = hashtag_group.group_id    
    
    # if there are existing hashtags, update post with new hashtag group
    elif comment[0].hashtag_group_id and request.hashtags:
        db_hashtag.update_hashtag_group_tags(db, comment[0].hashtag_group_id, request.hashtags)
        updated_group_id = comment[0].hashtag_group_id
    
    comment.update({
        DbComment.message: request.message,
        DbComment.timestamp: datetime.now(),
        DbComment.hashtag_group_id: updated_group_id
    })
    db.commit()
    return {'success': True, 'message': f'Updated comment ID: {comment_id}'}


def delete_comment(db: Session, comment_id: int):
    comment = db.query(DbComment).filter(DbComment.comment_id == comment_id).first()
    db.delete(comment)
    db.commit()
    return {'success': True, 'message': f'Deleted comment ID: {comment_id}'}