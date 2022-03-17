"""
schema.py
    - Contains request and response schema to model input and output for all CRUD endpoints.
    - Sub classes are used to further expand table relationships when they are included in main class schema.
    - Ensures proper input and output formatting, as well as taking database objects and converting them to JSON for output to front end.
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

##################################################################
#           SUB-CLASSES FOR RELATIONSHIP OUTPUT ONLY             #
##################################################################

# for ProfileResponse
class Post(BaseModel):
    post_id: int
    title: str
    message: Optional[str]
    timestamp: datetime
    class Config():
        orm_mode = True

# for ProfileResponse
class Friend(BaseModel):
    friend_id: int
    friend_status: str
    class Config():
        orm_mode = True

# for ProfileResponse
class Comment(BaseModel):
    comment_id: int
    message: Optional[str]
    timestamp: datetime
    class Config():
        orm_mode = True

# for ProfileResponse
class UserLikes(BaseModel):
    post_id: Optional[int]
    comment_id: Optional[int]
    class Config():
        orm_mode = True

# for ProfileResponse
class Link(BaseModel):
    link_id: int
    link_platform: str
    link_username: str
    link_url: Optional[str]
    class Config():
        orm_mode = True

#for ProfileResponse
class Game(BaseModel):
    game_id: int
    game_title: str
    game_platform: str
    game_username: Optional[str]
    main_character: Optional[str]
    current_rank: Optional[str]
    highest_rank: Optional[str]
    hours_played: Optional[int]
    class Config():
        orm_mode = True

# for PostResponse
class User(BaseModel):
    id: int
    username: str
    class Config():
        orm_mode = True

# for CommentResponse and PostResponse
class CommentLike(BaseModel):
    user: User
    class Config():
        orm_mode = True

# for PostResponse
class Comment(BaseModel):
    message: str
    user: User
    timestamp: datetime
    like_count: Optional[int]
    liked_by: List[CommentLike]
    class Config():
        orm_mode = True

# for PostResponse
class PostLike(BaseModel):
    user: User
    class Config():
        orm_mode = True

# for ProfileResponse
class ProfileUser(BaseModel):
    id: int
    username: str
    email: str
    class Config():
        orm_mode = True

# for ThreadResponse
class Message(BaseModel):
    message_id: int
    sender: User
    body: str
    sent_time: datetime
    message_status: str
    read_time: Optional[datetime]
    class Config():
        orm_mode = True


##################################################################
#          SCHEMA CLASSES FOR INPUT/OUTPUT FILTERING             #
##################################################################


class UserRequest(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    class Config():
        orm_mode = True

class LoginRequest(BaseModel):
    username: str
    password: str

class PostRequest(BaseModel):
    user_id: int
    title: str
    image_url: Optional[str]
    video_url: Optional[str]
    content_path_type: Optional[str]   # 'internal' or 'external'
    message: Optional[str]

class PostResponse(BaseModel):
    post_id: int
    user: User
    title: str
    image_url: Optional[str]
    video_url: Optional[str]
    content_path_type: Optional[str]
    message: Optional[str]
    timestamp: datetime
    comments: List[Comment]
    like_count: Optional[int]
    liked_by: List[PostLike]
    class Config():
        orm_mode = True

class CommentRequest(BaseModel):
    user_id: int
    message: str
    post_id: int

class CommentResponse(BaseModel):
    comment_id: int
    post_id: int
    user: User
    message: str
    timestamp: datetime
    like_count: Optional[int]
    liked_by: List[CommentLike]
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

class LikeRequest(BaseModel):
    post_id: Optional[int]
    comment_id: Optional[int]
    user_id: int
    username: str

class LikeResponse(BaseModel):
    user: User
    class Config():
        orm_mode = True

class LinkRequest(BaseModel):
    user_id: int
    link_platform: str
    link_username: str
    link_url: Optional[str]

class LinkResponse(BaseModel):
    user: User
    link_id: int
    link_platform: str
    link_username: str
    link_url: Optional[str]
    class Config():
        orm_mode = True

class GameRequest(BaseModel):
    user_id: int
    game_title: str
    game_platform: str
    game_username: Optional[str]
    main_character: Optional[str]
    current_rank: Optional[str]
    highest_rank: Optional[str]
    hours_played: Optional[int]

class GameResponse(BaseModel):
    user: User
    game_id: int
    game_title: str
    game_platform: str
    game_username: Optional[str]
    current_rank: Optional[str]
    highest_rank: Optional[str]
    hours_played: Optional[int]
    class Config():
        orm_mode = True

class ProfileRequest(BaseModel):
    user_id: int
    avatar_path: Optional[str]
    bio: Optional[str]
    quote: Optional[str]

class ProfileResponse(BaseModel):
    user: ProfileUser
    profile_id: int
    avatar_path: Optional[str]
    bio: Optional[str]
    quote: Optional[str]
    social_links: List[Link]
    games: List[Game]
    friends: List[Friend]
    posts: List[Post]
    comments: List[Comment]
    likes: List[UserLikes]
    class Config():
        orm_mode = True

class FirstMessageRequest(BaseModel):
    sender_id: int
    receiver_id: int
    body: str

class ReplyRequest(BaseModel):
    thread_id: int
    sender_id: int
    body: str

class MessageResponse(BaseModel):
    thread_id: int
    message_id: int
    sender_id: int
    body: str
    sent_time: datetime
    message_status: str
    read_time: Optional[datetime]
    class Config():
        orm_mode = True

class ThreadResponse(BaseModel):
    thread_id: int
    messages: List[Message]
    class Config():
        orm_mode = True