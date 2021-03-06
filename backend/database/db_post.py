"""
db_post.py
    - contains functions for database operations relating to the post table
    - functions from here are called by post-related CRUD endpoints
"""

from backend import schemas
from sqlalchemy.orm.session import Session
from .models import DbPost, DbFriend, DbProfile, DbHashtag, DbComment, DbLike
from datetime import datetime
from backend.database import db_hashtag
from sqlalchemy import func, or_
from typing import List
from collections import Counter


def create_post(db: Session, request: schemas.PostRequest):
    hashtag_group_id = None
    
    # check if hashtags need to be associated with the post
    if request.hashtags:
        # create a new hashtag group
        hashtag_group = db_hashtag.create_hashtag_group(db)
        hashtag_group_id = hashtag_group.group_id
        
        # iterate through the hashtags and add each tag to the database, associating them with the new hashtag group
        for tag in request.hashtags:
            db_hashtag.create_grouped_tag(db, hashtag_group_id, tag)

    # build post object
    new_post = DbPost(
        title = request.title,
        image_url = request.image_url,
        video_url = request.video_url,
        content_path_type = request.content_path_type,
        message = request.message,
        timestamp = datetime.now(),
        user_id = request.user_id,
        hashtag_group_id = hashtag_group_id)

    # add post object to database
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(DbPost).all()


def get_user_feed(db: Session, user_id: int):
    interests = []
    post_ids = []
    # build list of friend ids for requested user
    users = [row[0] for row in db.query(DbFriend.friend_id).filter(DbFriend.user_id == user_id, DbFriend.friend_status == 'friends').all()]

    # add user to list of ids to retrieve
    users.append(user_id)

    # build list of interests in lower case for requested user
    interest_group = db.query(DbProfile.hashtag_group_id).filter(DbProfile.user_id == user_id).first()[0]
    if interest_group:
        interests = [row[0].lower() for row in db.query(DbHashtag.hashtag_label).filter(DbHashtag.hashtag_group_id == interest_group).all()]
    
        # build a set (uniques only) of hashtag group ids that have matching tags to user interests
        group_ids = set([row[0] for row in db.query(DbHashtag.hashtag_group_id).filter(func.lower(DbHashtag.hashtag_label).in_(interests)).all()])
    
        # build list of posts that are associated with given hashtag ids
        post_ids = [row[0] for row in db.query(DbPost.post_id).filter(DbPost.hashtag_group_id.in_(group_ids)).all()]
    
    # return all posts in the users list and all posts in the posts list
    return db.query(DbPost).filter(or_(DbPost.user_id.in_(users), DbPost.post_id.in_(post_ids))).order_by(DbPost.timestamp.desc()).all()


def get_all_liked_posts(db: Session, user_id: int):
    posts = [row[0] for row in db.query(DbLike.post_id).filter(DbLike.user_id == user_id).all()]
    return db.query(DbPost).filter(DbPost.post_id.in_(posts)).order_by(DbPost.timestamp.desc()).all()


def get_all_user_posts(db: Session, user_id: int):
    return db.query(DbPost).filter(DbPost.user_id == user_id).order_by(DbPost.timestamp.desc()).all()


def get_post(db: Session, post_id: int):
    return db.query(DbPost).filter(DbPost.post_id == post_id).first()


def get_hashtag_posts(db: Session, hashtags: List[int]):
    # build set of unique group ids that match with the list of hashtags passed in
    group_ids = set([row[0] for row in db.query(DbHashtag.hashtag_group_id).filter(func.lower(DbHashtag.hashtag_label).in_(hashtags)).all()])

    # build list of posts that are associated with given hashtag ids
    post_ids = [row[0] for row in db.query(DbPost.post_id).filter(DbPost.hashtag_group_id.in_(group_ids)).all()]

    # return all posts associated with passed in hashtags
    return db.query(DbPost).filter(DbPost.post_id.in_(post_ids)).order_by(DbPost.timestamp.desc()).all()


def get_top_liked_posts(db: Session, count: int):
    liked_post_ids = [row[0] for row in db.query(DbLike.post_id).all()]

    top_liked_posts = Counter()
    for post in liked_post_ids:
        top_liked_posts[post] += 1
    
    top_posts = top_liked_posts.most_common()[:count]
    top_post_ids = [post[0] for post in top_posts]

    return db.query(DbPost).filter(DbPost.post_id.in_(top_post_ids)).all()


def get_top_commented_posts(db: Session, count: int):
    commented_post_ids = [row[0] for row in db.query(DbComment.post_id).all()]

    top_commented_posts = Counter()
    for post in commented_post_ids:
        top_commented_posts[post] += 1

    top_posts = top_commented_posts.most_common()[:count]
    top_post_ids = [post[0] for post in top_posts]

    return db.query(DbPost).filter(DbPost.post_id.in_(top_post_ids)).all()


def get_most_recent_posts(db: Session, count: int):
    return db.query(DbPost).order_by(DbPost.timestamp.desc()).all()[:count]


def update_post(db: Session, post_id: int, request: schemas.PostRequest):
    # retrieve post to update
    result = db.query(DbPost).filter(DbPost.post_id == post_id)
    
    # if there are no existing hashtags and none requested, maintain null value for hashtag group id
    updated_group_id = result[0].hashtag_group_id
    
    # if there are no current hashtags on the post, but the update request has hashtags, create a new group
    if not result[0].hashtag_group_id and request.hashtags:
        hashtag_group = db_hashtag.create_hashtag_group(db)
        for tag in request.hashtags:
            db_hashtag.create_grouped_tag(db, hashtag_group.group_id, tag)
        updated_group_id = hashtag_group.group_id
    
    # if there are existing hashtags, update post with new hashtag group
    elif result[0].hashtag_group_id and request.hashtags:
        db_hashtag.update_hashtag_group_tags(db, result[0].hashtag_group_id, request.hashtags)
        updated_group_id = result[0].hashtag_group_id

    # update post
    result.update({
            DbPost.title: request.title,
            DbPost.image_url: request.image_url,
            DbPost.video_url: request.video_url,
            DbPost.content_path_type: request.content_path_type,
            DbPost.message: request.message,
            DbPost.timestamp: datetime.now(),
            DbPost.hashtag_group_id: updated_group_id
        })
    db.commit()
    return {'success': True, 'message': f'Updated post ID: {post_id}'}


def delete_post(db: Session, user_id: int, post_id: int):
    # retrieve post, comments, and likes associated with post_id to delete
    post = db.query(DbPost).filter(DbPost.post_id == post_id).first()
    comments = db.query(DbComment).filter(DbComment.post_id == post_id).all()
    likes = db.query(DbLike).filter(DbLike.post_id == post_id).all()
    
    # delete likes associated with post_id
    try:
        for like in likes:
            db.delete(like)
            db.commit
    except Exception as e:
        return {'sucess': False, 'message': f'Failed to delete likes: {str(e)}'}

    # delete coments associated with post_id
    try:
        for comment in comments:
            db.delete(comment)
            db.commit()
    except Exception as e:
        return {'success': False, 'message': f'Failed to delete comments: {str(e)}'}

    # delete post
    try:
        db.delete(post)
        db.commit()
    except Exception as e:
        return {'success': False, 'message': f'Failed to delete post: {str(e)}'}

    return {'success': True, 'message': 'Deleted post ID: {post_id}'}