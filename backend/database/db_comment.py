from sqlalchemy.orm import Session
from .models import DbComment
from backend.schemas import schema
from datetime import datetime


def create_comment(db: Session, request: schema.CommentRequest):
    new_comment = DbComment(
        message = request.message,
        user_id = request.user_id,
        post_id = request.post_id,
        timestamp = datetime.now()
    )
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
    comment = db.query(DbComment).filter(DbComment.comment_id == comment_id)
    comment.update({
        DbComment.message: request.message,
        DbComment.timestamp: datetime.now()
    })
    db.commit()
    return {'success': True, 'message': f'Updated comment ID: {comment_id}'}


def delete_comment(db: Session, comment_id: int):
    comment = db.query(DbComment).filter(DbComment.comment_id == comment_id).first()
    db.delete(comment)
    db.commit()
    return {'success': True, 'message': f'Deleted comment ID: {comment_id}'}

