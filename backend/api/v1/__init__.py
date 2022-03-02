from fastapi import APIRouter

from backend.api.v1 import user

api_router = APIRouter()
api_router.include_router(user.router, prefix='/users',tags=["user"])