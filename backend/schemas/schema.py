from pydantic import BaseModel, Json
from typing import Optional, List
from datetime import datetime

class UserRequest(BaseModel):
    username: str
    email: str
    password: str

# subclass for UserResponse
class Post(BaseModel):
    post_id: int
    message: Optional[str]
    timestamp: datetime
    class Config():
        orm_mode = True

# subclass for UserResponse
class Friend(BaseModel):
    friend_id: int
    friend_status: str
    class Config():
        orm_mode = True

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    posts: List[Post]
    friends: List[Friend]
    class Config():
        orm_mode = True

class LoginRequest(BaseModel):
    username: str
    password: str

class PostRequest(BaseModel):
    user_id: int
    image_url: Optional[str]
    video_url: Optional[str]
    content_path_type: Optional[str]   # 'internal' or 'external'
    message: Optional[str]

# Class User for PostResponse, to relate username to post
class User(BaseModel):
    username: str
    class Config():
        orm_mode = True

# Class Comment for PostResponse, to relate comment data to post
class Comment(BaseModel):
    message: str
    username: str
    timestamp: datetime
    class Config():
        orm_mode = True

class PostResponse(BaseModel):
    user_id: int
    post_id: int
    image_url: Optional[str]
    video_url: Optional[str]
    content_path_type: Optional[str]
    message: Optional[str]
    timestamp: datetime
    user: User
    comments: List[Comment]
    class Config():
        orm_mode = True

class CommentRequest(BaseModel):
    username: str
    message: str
    post_id: int

class CommentResponse(BaseModel):
    comment_id: int
    post_id: int
    username: str
    message: str
    timestamp: datetime
    class Config():
        orm_mode = True

class FriendRequest(BaseModel):
    user_id: int
    friend_id: int
    message: Optional[str]  
    answer: Optional[str]   # only for responding to a request 'friends' or 'declined'

class FriendResponse(BaseModel):
    request_id: int
    user_id: int
    friend_id: int
    message: Optional[str]
    friend_status: str
    class Config():
        orm_mode = True

