from fastapi import APIRouter

from backend.api.v1 import tag, user, post, comment

user_router = APIRouter()
user_router.include_router(user.router, prefix='/users',tags=['user'])

post_router = APIRouter()
post_router.include_router(post.router, prefix='/posts',tags=['post'])

comment_router = APIRouter()
comment_router.include_router(comment.router, prefix='/comments',tags=['comment'])

tag_router = APIRouter()
tag_router.include_router(tag.router, prefix='/tags',tags=['tags'])