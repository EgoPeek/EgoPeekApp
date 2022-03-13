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
    links = relationship('DbLink', back_populates='user')
    games = relationship('DbGame', back_populates='user')
    profile = relationship('DbProfile', back_populates='user')


class DbPost(Base):
    __tablename__ = 'post'
    post_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    profile_id = Column(Integer, ForeignKey('profile.profile_id'))
    image_url = Column(String(500))
    video_url = Column(String(500))
    content_path_type = Column(String(8))   # 'external' or 'internal'
    message = Column(String(1000))
    timestamp = Column(DateTime)
    like_count = Column(Integer)
    liked_by = relationship('DbLike', back_populates='post_liked_by')
    user = relationship('DbUser', back_populates='posts')
    comments = relationship('DbComment', back_populates='post')
    profile = relationship('DbProfile', back_populates='posts')


class DbComment(Base):
    __tablename__ = 'comment'
    comment_id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.post_id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    profile_id = Column(Integer, ForeignKey('profile.profile_id'))
    message = Column(String(1000))
    timestamp = Column(DateTime)
    like_count = Column(Integer)
    user = relationship('DbUser', back_populates='comments')
    liked_by = relationship('DbLike', back_populates='comment_liked_by')
    post = relationship("DbPost", back_populates="comments")
    profile = relationship('DbProfile', back_populates='comments')


class DbFriend(Base):
    __tablename__ = 'friend'
    request_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    profile_id = Column(Integer, ForeignKey('profile.profile_id'))
    friend_id = Column(Integer)
    message = Column(String(500))
    friend_status = Column(String(15))  # 'pending', 'declined', 'accepted'
    user = relationship('DbUser', back_populates='friends')
    profile = relationship('DbProfile', back_populates='friends')


class DbLike(Base):
    __tablename__ = 'like'
    like_id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.post_id'))
    comment_id = Column(Integer, ForeignKey('comment.comment_id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    profile_id = Column(Integer, ForeignKey('profile.profile_id'))
    post_liked_by = relationship('DbPost', back_populates='liked_by')
    comment_liked_by = relationship('DbComment', back_populates='liked_by')
    user = relationship('DbUser', back_populates='likes')
    profile = relationship('DbProfile', back_populates='likes')


class DbLink(Base):
    __tablename__ = 'link'
    link_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    profile_id = Column(Integer, ForeignKey('profile.profile_id'))
    link_url = Column(String(500))
    link_username = Column(String(50))
    link_platform = Column(String(25))
    user = relationship('DbUser', back_populates='links')
    profile = relationship('DbProfile', back_populates='social_links')


class DbGame(Base):
    __tablename__ = 'game'
    game_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    profile_id = Column(Integer, ForeignKey('profile.profile_id'))
    game_title = Column(String(100))
    game_platform = Column(String(50))
    game_username = Column(String(50))
    main_character = Column(String(50))
    current_rank = Column(String(50))
    highest_rank = Column(String(50))
    hours_played = Column(Integer)
    user = relationship('DbUser', back_populates='games')
    profile = relationship('DbProfile', back_populates='games')


class DbProfile(Base):
    __tablename__ = 'profile'
    profile_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    avatar_path = Column(String(100))
    bio = Column(String(1000))
    quote = Column(String(250))
    user = relationship('DbUser', back_populates='profile')
    games = relationship('DbGame', back_populates='profile')
    social_links = relationship('DbLink', back_populates='profile')
    friends = relationship('DbFriend', back_populates='profile')
    posts = relationship('DbPost', back_populates='profile')
    comments = relationship('DbComment', back_populates='profile')
    likes = relationship('DbLike', back_populates='profile')