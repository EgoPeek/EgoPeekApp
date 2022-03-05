from .db import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(15))
    email = Column(String(254))
    password = Column(String(15))
    posts = relationship('DbPost', back_populates='user')


class DbPost(Base):
    __tablename__ = 'post'
    post_id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(500))
    video_url = Column(String(500))
    content_path_type = Column(String(8))
    message = Column(String(1000))
    timestamp = Column(DateTime)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship('DbUser', back_populates='posts')