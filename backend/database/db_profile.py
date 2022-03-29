"""
db_profile.py
    - contains functions for database operations relating to the profile table
    - functions from here are called by profile-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbProfile, DbHashtag
from backend.schemas import schema
from backend.database import db_hashtag
import logging


def create_profile(db: Session, request: schema.ProfileRequest):
    interest_group_id = None

    # check if interestes need to be associated with profile
    if request.interests:
        # create a new hashtag group
        interest_group = db_hashtag.create_hashtag_group(db)
        interest_group_id = interest_group.group_id

        # iterate through the hashtags and add each tag to the database, associating them with the new hashtag group
        for tag in request.interests:
            db_hashtag.create_grouped_tag(db, interest_group_id, tag)
    
    # build new profile object
    new_profile = DbProfile(
        user_id = request.user_id,
        avatar_path = request.avatar_path,
        bio = request.bio,
        quote = request.quote,
        hashtag_group_id = interest_group_id)

    # add profile object to database
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile


def get_all_db_profiles(db: Session):
    return db.query(DbProfile).all()


def get_user_profile(db: Session, user_id: int):
    return db.query(DbProfile).filter(DbProfile.user_id == user_id).first()


def get_current_interests(db: Session, user_id: int):
    interest_group_id = db.query(DbProfile.hashtag_group_id).filter(DbProfile.user_id == user_id).first()[0]
    return [tag[0] for tag in db.query(DbHashtag.hashtag_label).filter(DbHashtag.hashtag_group_id == interest_group_id).all()]


def update_profile(db: Session, user_id: int, request: schema.ProfileRequest):
    # retrieve profile to update
    result = db.query(DbProfile).filter(DbProfile.user_id == user_id)

    # if there are no existing interests and none requested, maintain null vallue for interest group id
    updated_group_id = result[0].hashtag_group_id

    #if there are no current interests in the profile, but the update request has interests, create a new group
    if not result[0].hashtag_group_id and request.interests:
        interest_group = db_hashtag.create_hashtag_group(db)
        for interest in request.interests:
            db_hashtag.create_grouped_tag(db, interest_group.group_id, interest)
        updated_group_id = interest_group.group_id
    
    # if there are existing interests, update profile with new interest group
    elif result[0].hashtag_group_id and request.interests:
        db_hashtag.update_hashtag_group_tags(db, result[0].hashtag_group_id, request.interests)
        updated_group_id = result[0].hashtag_group_id

    # update profile
    result.update({
        DbProfile.avatar_path: request.avatar_path,
        DbProfile.bio: request.bio,
        DbProfile.quote: request.quote,
        DbProfile.hashtag_group_id: updated_group_id
    })
    db.commit()
    return {'success': True, 'message': f'Updated profile for user ID: {user_id}'}


def delete_profile(db: Session, user_id: int):
    result = db.query(DbProfile).filter(DbProfile.user_id == user_id).first()
    db.delete(result)
    db.commit()
    return {'success': True, 'message': f'Deleted profile for user ID: {user_id}'}