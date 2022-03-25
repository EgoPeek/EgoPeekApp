"""
db_hashtag.py
    - contains functions for database operations relating to the tag table
    - functions from here are called by tag-related CRUD endpoints
"""

from backend.schemas import schema
from sqlalchemy.orm.session import Session
from .models import DbHashtag



def create_hashtag(db: Session, request: schema.HashtagRequest):
    new_hashtag = DbHashtag(
        hashtag_label = request.hashtag_label,
        post_id = request.post_id,
        comment_id = request.comment_id,
        #profile_id = request.profile_id,
        user_id = request.user_id,
        hashtag_counter = 1
        #hashtag_group = request.hashtag_group,
    )
    db.add(new_hashtag)
    db.commit()
    db.refresh(new_hashtag)
    return new_hashtag

# def increment_hashtag_counter(db: Session, userID: int, commentID: int):
#     # get all hashtags in the databse and store them in a list
#     all_tags = List[db.query(DbHashtag).all()]
#     #stores in a list all posts 
#     all_posts_captions = List[db.query(DbPost).all()]
#     if all_tags in all_posts_captions 

def get_hashtag(db: Session, tag_id: int):
    return db.query(DbHashtag).filter(DbHashtag.hashtag_id == tag_id).first()


def get_db_hashtags(db: Session):
    return db.query(DbHashtag).all()


def get_post_hashtags(db: Session, postID: int):
    return db.query(DbHashtag).filter(DbHashtag.post_id == postID).all()


def get_comment_hashtags(db: Session, commentID: int):
    return db.query(DbHashtag).filter(DbHashtag.comment_id == commentID).all()


def update_hashtag(db: Session, tag_id: int, request: schema.HashtagRequest):
    updateTag = db.query(DbHashtag).filter(DbHashtag.hashtag_id == tag_id)
    updateTag.update({
        DbHashtag.hashtag_label: request.hashtag_label
    })
    db.commit()
    return{'success': True, 'message': f'Updated hashtag with ID: {tag_id}'}


def delete_hashtag(db: Session, tag_id: int):
    object_hashtag = db.query(DbHashtag).filter(DbHashtag.hashtag_id == tag_id).first()
    db.delete(object_hashtag)
    db.commit()
    return {'success': True, 'message': f'Deleted hashtag with ID: {tag_id}'}


def check_duplicates(db: Session, tagName: str):

    result = db.query(DbHashtag).all()
    tags = [tag.hashtag_label.lower() for tag in result]
    if tagName.lower() in tags:
        return True
    return False