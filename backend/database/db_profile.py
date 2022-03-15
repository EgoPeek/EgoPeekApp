"""
db_profile.py
    - contains functions for database operations relating to the profile table
    - functions from here are called by profile-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbProfile
from backend.schemas import schema


def create_profile(db: Session, request: schema.ProfileRequest):
    new_profile = DbProfile(
        user_id = request.user_id,
        avatar_path = request.avatar_path,
        bio = request.bio,
        quote = request.quote
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile


def get_all_db_profiles(db: Session):
    return db.query(DbProfile).all()


def get_user_profile(db: Session, user_id: int):
    return db.query(DbProfile).filter(DbProfile.user_id == user_id).first()


def update_profile(db: Session, user_id: int, request: schema.ProfileRequest):
    result = db.query(DbProfile).filter(DbProfile.user_id == user_id)
    result.update({
        DbProfile.avatar_path: request.avatar_path,
        DbProfile.bio: request.bio,
        DbProfile.quote: request.quote
    })
    db.commit()
    return {'success': True, 'message': f'Updated profile for user ID: {user_id}'}


def delete_profile(db: Session, user_id: int):
    result = db.query(DbProfile).filter(DbProfile.user_id == user_id).first()
    db.delete(result)
    db.commit()
    return {'success': True, 'message': f'Deleted profile for user ID: {user_id}'}