from fastapi import APIRouter

from backend.socket import socket

socket_router = APIRouter()
socket_router.include_router(socket.router, prefix='/chat', tags=["socket"])