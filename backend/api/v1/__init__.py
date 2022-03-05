from fastapi import APIRouter

from backend.api.v1 import user, post

user_router = APIRouter()
user_router.include_router(user.router, prefix='/users',tags=["user"])

post_router = APIRouter()
post_router.include_router(post.router, prefix='/posts',tags=["post"])