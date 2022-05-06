"""
db_user.py
    - contains functions for database operations relating to the user table
    - functions from here are called by user-related CRUD endpoints
"""

from pymysql import NULL
from backend import schemas
from sqlalchemy.orm.session import Session
from .models import DbUser, DbProfile
from .hash import Hash
from fastapi import HTTPException, status


def create_user(db: Session, request: schemas.UserRequest):
    # add new user to DB
    new_user = DbUser(
        username = request.username,
        email = request.email,
        password = Hash.encrypt(request.password),
        reset = NULL
     )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # create an empty profile for new user and add to DB
    new_profile = DbProfile(user_id = new_user.id)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    
    return new_user


def get_email_by_userID(db:Session, user_id: str):
    return db.query(DbUser.email).filter(DbUser.id == user_id).first()[0]


def get_all_user_data(db: Session):
    return db.query(DbUser).all()


def update_user_reset_token(db: Session, username: str, token: str):
    user = db.query(DbUser).filter(DbUser.username == username)
    user.update({
        DbUser.reset: token
    })
    db.commit()
    return {'success': True, 'message': f'Updated reset token for {username}'}


def get_user_data(db: Session, username: str):
    return db.query(DbUser).filter(DbUser.username == username).first()


def get_user_by_username(db: Session, username: str):
    user = db.query(DbUser).filter(DbUser.username == username).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
            detail = f'User with username {username} not found')
    return user


def get_username_by_id(db: Session, user_id: int):
    return db.query(DbUser.username).filter(DbUser.id == user_id).first()[0]


def update_user_data(db: Session, username: str, request: schemas.UserRequest):
    user = db.query(DbUser).filter(DbUser.username == username)
    user.update({
        DbUser.username: request.username,
        DbUser.email: request.email,
        DbUser.password: Hash.encrypt(request.password)
    })
    db.commit()
    return{'success': True, 'message': f'Updated user: {username}'}


def update_user_reset_token(db: Session, username: str, token: str):
    user = db.query(DbUser).filter(DbUser.username == username)
    user.update({
        DbUser.reset: token
    })
    db.commit()
    return {'success': True, 'message': f'Updated reset token for {username}'}


def update_user_password(db: Session, username: str, new_password: str):
    user = db.query(DbUser).filter(DbUser.username == username)
    user.update({
        DbUser.password: Hash.encrypt(new_password)
    })
    db.commit()
    return{'success': True, 'message': f'Updated password for user: {username}'}


def delete_user_data(db: Session, user_id: int):
    user = db.query(DbUser).filter(DbUser.id == user_id).first()
    profile = db.query(DbProfile).filter(DbProfile.user_id == user_id).first()
    db.delete(user)
    db.commit()
    db.delete(profile)
    db.commit()
    return{'success': True, 'message': f'Deleted user id: {user_id}'}


def check_duplicates(db: Session, username: str, email: str):
    if db.query(DbUser).filter(DbUser.username == username).first() or db.query(DbUser).filter(DbUser.email == email).first():
        return True
    return False


def check_reset_token(db: Session, username: str, reset_string: str):
    return db.query(DbUser.reset).filter(DbUser.username == username).first()[0] == reset_string