from fastapi import APIRouter

from backend.auth import authenticate

auth_router = APIRouter()
auth_router.include_router(authenticate.router,tags=["authentication"])