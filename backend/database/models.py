
from .db import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(15))
    email = Column(String(254))
    password = Column(String(256))
    posts = relationship('DbPost', back_populates='user')
    likes = relationship('DbLike', back_populates='user')
    comments = relationship('DbComment', back_populates='user')
    friends = relationship('DbFriend', back_populates='user')


class DbPost(Base):
    __tablename__ = 'post'
    post_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    image_url = Column(String(500))
    video_url = Column(String(500))
    content_path_type = Column(String(8))   # 'external' or 'internal'
    message = Column(String(1000))
    timestamp = Column(DateTime)
    like_count = Column(Integer)
    liked_by = relationship('DbLike', back_populates='post_liked_by')
    user = relationship('DbUser', back_populates='posts')
    comments = relationship('DbComment', back_populates='post')


class DbComment(Base):
    __tablename__ = 'comment'
    comment_id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.post_id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    message = Column(String(1000))
    timestamp = Column(DateTime)
    like_count = Column(Integer)
    user = relationship('DbUser', back_populates='comments')
    liked_by = relationship('DbLike', back_populates='comment_liked_by')
    post = relationship("DbPost", back_populates="comments")


class DbFriend(Base):
    __tablename__ = 'friend'
    request_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    friend_id = Column(Integer)
    message = Column(String(500))
    friend_status = Column(String(15))  # 'pending', 'declined', 'accepted'
    user = relationship('DbUser', back_populates='friends')


class DbLike(Base):
    __tablename__ = 'like'
    like_id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.post_id'))
    comment_id = Column(Integer, ForeignKey('comment.comment_id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship('DbUser', back_populates='likes')
    post_liked_by = relationship('DbPost', back_populates='liked_by')
    comment_liked_by = relationship('DbComment', back_populates='liked_by')