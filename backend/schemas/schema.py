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
class Hashtag(BaseModel):
    hashtag_id: int
    hashtag_label: str
    class Config():
        orm_mode = True

# for PostResponse
class HashtagGroup(BaseModel):
    group_id: Optional[int]
    hashtags: Optional[List[Hashtag]]
    class Config():
        orm_mode = True

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
class CommentProfile(BaseModel):
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
    game_platform: Optional[str]
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

# for CommentResponse
class commentTag(BaseModel):
    hashtag_id: int
    hashtag_label: str
    class Config():
        orm_mode = True

# for PostResponse
class Comment(BaseModel):
    message: str
    user: User
    timestamp: datetime
    like_count: Optional[int]
    liked_by: List[CommentLike]
    hashtag_group: Optional[HashtagGroup]
    class Config():
        orm_mode = True

# for PostResponse
class PostLike(BaseModel):
    user: User
    class Config():
        orm_mode = True

# for PostResponse
class postTag(BaseModel):
    hashtag_id: int
    hashtag_label: str
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

# for ProfileResponse
class UserProfile(BaseModel):
    id: int
    username: str
    email: str
    links: Optional[List[Link]]
    games: Optional[List[Game]]
    friends: Optional[List[Friend]]
    posts: Optional[List[Post]]
    comments: Optional[List[Comment]]
    likes: Optional[List[UserLikes]]
    class Config():
        orm_mode = True

# for FriendListResponse
class Avatar(BaseModel):
    avatar_path: Optional[str]
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
    hashtags: Optional[List[str]]

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
    hashtag_group: Optional[HashtagGroup]
    class Config():
        orm_mode = True

class CommentRequest(BaseModel):
    user_id: int
    message: str
    post_id: int
    hashtags: Optional[List[str]]

class CommentResponse(BaseModel):
    comment_id: int
    post_id: int
    user: User
    message: str
    timestamp: datetime
    like_count: Optional[int]
    liked_by: List[CommentLike]
    hashtag_group: Optional[HashtagGroup]
    class Config():
        orm_mode = True

class HashtagRequest(BaseModel):
    hashtag_label: str
    post_id: Optional[int]
    comment_id: Optional[int]
    user_id: Optional[int]
    profile_id: Optional[int]

class HashtagResponse(BaseModel):
    hashtag_id: int
    hashtag_label: str
    hashtag_counter: int
    post_used_hashtag: Optional[List[Post]]
    comment_used_hashtag: Optional[List[Comment]]
    user: Optional[User]
    class Config():
        orm_mode = True

class FriendRequest(BaseModel):
    user_id: int
    friend_id: int
    answer: Optional[str]   # only for responding to a request 'friends' or 'declined'

class FriendResponse(BaseModel):
    request_id: int
    user_id: int
    friend_id: int
    friend_status: str
    class Config():
        orm_mode = True

class FriendListResponse(BaseModel):
    id: int
    username: str
    profile: Optional[List[Avatar]]
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
    game_platform: Optional[str]
    game_username: Optional[str]
    main_character: Optional[str]
    current_rank: Optional[str]
    highest_rank: Optional[str]
    hours_played: Optional[int]

class GameResponse(BaseModel):
    user: User
    game_id: int
    game_title: str
    game_platform: Optional[str]
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
    interests: Optional[List[str]]

class ProfileResponse(BaseModel):
    user: UserProfile
    profile_id: int
    avatar_path: Optional[str]
    bio: Optional[str]
    quote: Optional[str]
    interest_hashtags: Optional[HashtagGroup]
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

class UserAuth(BaseModel):
    id: int
    username: str
    email: str

class HashtagGroupResponse(BaseModel):
    group_id: int
    post_id: Optional[int]
    comment_id: Optional[int]
    profile_id: Optional[int]
    hashtags: List[Hashtag]
    class Config():
        orm_mode = True

class AvatarResponse(BaseModel):
    user: User
    avatar_path: Optional[str]
    class Config():
        orm_mode = True

class FriendStatusResponse(BaseModel):
    user_id: int
    username: str
    avatar_path: Optional[str]
    friend_status: str