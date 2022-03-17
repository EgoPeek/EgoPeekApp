"""
db_message.py
    - contains functions for database operations relating to the message, thread, and thread_member tables
    - functions from here are called by link-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbMessage, DbThread #, DbThreadMember
from backend.schemas import schema
from datetime import datetime
from sqlalchemy import or_


def create_thread(db: Session, request: schema.FirstMessageRequest):
    new_thread = DbThread(
        user1_id = request.sender_id,
        user2_id = request.receiver_id
    )
    db.add(new_thread)
    db.commit()
    db.refresh(new_thread)

    new_message = DbMessage(
        thread_id = new_thread.thread_id,
        sender_id = request.sender_id,
        body = request.body,
        sent_time = datetime.now(),
        message_status = 'sent'
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

def create_reply(db: Session, request: schema.ReplyRequest):
    new_message = DbMessage(
        thread_id = request.thread_id,
        sender_id = request.sender_id,
        body = request.body,
        sent_time = datetime.now(),
        message_status = 'sent'
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


def get_thread_id(db: Session, user_id: int, friend_id: int):
    thread = db.query(DbThread).filter(DbThread.user1_id == user_id, DbThread.user2_id == friend_id).first()
    if thread:
        return {'thread_id': thread.thread_id}
    else:
        thread = db.query(DbThread).filter(DbThread.user1_id == friend_id, DbThread.user2_id == user_id).first()
    if thread:
        return {'thread_id': thread.thread_id}
    return {'success': False, 'message': f'User {user_id} and User {friend_id} do not have an existing message thread.'}


def get_all_threads_db(db: Session):
    return db.query(DbThread).all()


def get_all_thread_messages(db: Session, thread_id: int):
    return db.query(DbThread).filter(DbThread.thread_id == thread_id).first()


def get_all_user_threads(db: Session, user_id: int):
    return db.query(DbThread).filter(or_(DbThread.user1_id == user_id, DbThread.user2_id == user_id)).all()


def get_thread(db: Session, thread_id: int, user_id: int):
    thread = db.query(DbThread).filter(DbThread.thread_id == thread_id).first()
    db.query(DbMessage).filter(DbMessage.thread_id == thread_id, DbMessage.sender_id != user_id).update({
        DbMessage.message_status: 'read',
        DbMessage.read_time: datetime.now()
    })
    db.commit()
    return thread


def get_unread_counts(db: Session, user_id: int):
    count_array = []
    result = db.query(DbThread).filter(or_(DbThread.user1_id == user_id, DbThread.user2_id == user_id)).all()
    threads = [thread.thread_id for thread in result]
    messages = db.query(DbMessage).filter(DbMessage.thread_id.in_(threads), DbMessage.sender_id != user_id, DbMessage.message_status == 'sent').all()
    print(len(messages))
    for thread in threads:
        count = 0
        for row in messages:
            if row.thread_id == thread:
                count += 1
        count_array.append({'thread_id': thread, 'count': count})
    return count_array


def update_message(db: Session, message_id: int, request: schema.ReplyRequest):
    result = db.query(DbMessage).filter(DbMessage.message_id == message_id)
    result.update({
        DbMessage.body: request.body
    })
    db.commit()
    return {'success': True, 'message': f'Updated message ID: {message_id}'}


def delete_message(db: Session, message_id: int):
    result = db.query(DbMessage).filter(DbMessage.message_id == message_id).first()
    db.delete(result)
    db.commit()
    return {'success': True, 'message': f'Deleted message ID: {message_id}'}