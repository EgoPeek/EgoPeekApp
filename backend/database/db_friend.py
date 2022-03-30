"""
db_friend.py
    - contains functions for database operations relating to the friend table
    - functions from here are called by friend-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbFriend, DbUser, DbProfile
from backend.schemas import schema
from backend.database.db_user import get_username_by_id
from backend.database.db_profile import get_user_avatar


def create_friend_request(db: Session, request: schema.FriendRequest):
    # add entry for sender
    new_friend_sender = DbFriend(
        user_id = request.user_id,
        friend_id = request.friend_id,
        message = request.message,
        friend_status = 'invite_sent'
    )
    db.add(new_friend_sender)

    # add entry for receiver
    new_friend_receiver = DbFriend(
        user_id = request.friend_id,
        friend_id = request.user_id,
        message = request.message,
        friend_status = 'invite_rec'
    )
    db.add(new_friend_receiver)

    # commit changes
    db.commit()
    db.refresh(new_friend_receiver)
    db.refresh(new_friend_sender)
    
    return new_friend_sender


def update_friend_request(db: Session, request: schema.FriendRequest):
    result1 = db.query(DbFriend).filter(DbFriend.user_id == request.user_id, DbFriend.friend_id == request.friend_id)
    result1.update({
        DbFriend.message: request.message,
        DbFriend.friend_status: request.answer
    })
    result2 = db.query(DbFriend).filter(DbFriend.user_id == request.friend_id, DbFriend.friend_id == request.user_id)
    result2.update({
        DbFriend.message: request.message,
        DbFriend.friend_status: request.answer
    })
    db.commit()
    return {'success': True, 'message': f'Friend status updated to: {request.answer} for User {request.user_id} and User {request.friend_id}'}


def get_all_db_friends(db: Session):
    return db.query(DbFriend).all()


def get_all_user_friends(db: Session, user_id: int):
    return db.query(DbFriend).filter(DbFriend.user_id == user_id).all()


def get_friend_list(db: Session, user_id: int):
    result = db.query(DbFriend).filter(DbFriend.user_id == user_id).all()
    friends = [friend.friend_id for friend in result]
    friend_data = db.query(DbUser).filter(DbUser.id.in_(friends)).all()
    return friend_data


def get_friend_list_status(db: Session, user_id: int):
    response = []
    find_friends = db.query(DbFriend).filter(DbFriend.user_id == user_id).all()
    for friend in find_friends:
        if friend.friend_status != 'declined':
            response.append({'user_id': friend.friend_id,
                            'username': get_username_by_id(db, friend.friend_id),
                            'avatar_path': get_user_avatar(db, friend.friend_id).avatar_path,
                            'friend_status': friend.friend_status})
    return response


def find_user(db: Session, username):
    return db.query(DbUser).filter(DbUser.username == username).first()


def delete_friends(db: Session, user_id: int, friend_id: int):
    result1 = db.query(DbFriend).filter(DbFriend.user_id == user_id, DbFriend.friend_id == friend_id).first()
    db.delete(result1)
    result2 = db.query(DbFriend).filter(DbFriend.user_id == friend_id, DbFriend.friend_id == user_id).first()
    db.delete(result2)
    db.commit()
    return {'success': True, 'message': f'User {user_id} and User {friend_id} are no longer friends.'}