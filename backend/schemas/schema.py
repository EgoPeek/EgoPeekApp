from pydantic import BaseModel, Json
from typing import Optional, List
from datetime import datetime

##################################################################
#           SUB-CLASSES FOR RELATIONSHIP OUTPUT ONLY             #
##################################################################

# for UserResponse
class Post(BaseModel):
    post_id: int
    message: Optional[str]
    timestamp: datetime
    class Config():
        orm_mode = True

# for UserResponse
class Friend(BaseModel):
    friend_id: int
    friend_status: str
    class Config():
        orm_mode = True

# for UserResponse
class Comment(BaseModel):
    comment_id: int
    message: Optional[str]
    timestamp: datetime
    class Config():
        orm_mode = True

# for UserResponse
class UserLikes(BaseModel):
    post_id: Optional[int]
    comment_id: Optional[int]
    class Config():
        orm_mode = True

# for UserResponse
class Link(BaseModel):
    link_id: int
    link_platform: str
    link_username: str
    link_url: str
    class Config():
        orm_mode = True

#for UserResponse
class Game(BaseModel):
    game_id: int
    game_title: str
    game_platform: str
    class Config():
        orm_mode = True

# for PostResponse
class User(BaseModel):
    id: int
    username: str
    class Config():
        orm_mode = True

# for PostResponse
class Comment(BaseModel):
    message: str
    user: User
    timestamp: datetime
    class Config():
        orm_mode = True

# for PostResponse
class PostLike(BaseModel):
    user: User
    class Config():
        orm_mode = True

# for CommentResponse
class CommentLike(BaseModel):
    user: User
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
    posts: List[Post]
    comments: List[Comment]
    friends: List[Friend]
    games: List[Game]
    likes: List[UserLikes]
    links: List[Link]
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

class PostResponse(BaseModel):
    post_id: int
    user: User
    image_url: Optional[str]
    video_url: Optional[str]
    content_path_type: Optional[str]
    message: Optional[str]
    timestamp: datetime
    comments: Optional[List[Comment]]
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