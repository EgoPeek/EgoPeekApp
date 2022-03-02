from fastapi import APIRouter

from backend.api.v1 import user

user_router = APIRouter()
user_router.include_router(user.router, prefix='/users',tags=["user"])