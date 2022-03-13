from fastapi import APIRouter

from backend.api.v1 import tag, user, post, comment, friend, like, link, game, profile


user_router = APIRouter()
user_router.include_router(user.router, prefix='/users',tags=['user'])

post_router = APIRouter()
post_router.include_router(post.router, prefix='/posts',tags=['post'])

comment_router = APIRouter()
comment_router.include_router(comment.router, prefix='/comments',tags=['comment'])

tag_router = APIRouter()
tag_router.include_router(tag.router, prefix='/tags',tags=['tag'])

friend_router = APIRouter()
friend_router.include_router(friend.router, prefix='/friends',tags=['friend'])

like_router = APIRouter()
like_router.include_router(like.router, prefix='/likes',tags=['like'])

link_router = APIRouter()
link_router.include_router(link.router, prefix='/links',tags=['link'])

game_router = APIRouter()
game_router.include_router(game.router, prefix='/games',tags=['game'])

profile_router = APIRouter()
profile_router.include_router(profile.router, prefix='/profiles',tags=['profile'])