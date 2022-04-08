"""
socket.py
Backend implementation for web sockets served for the global chat room at /api/v1/chat.
Contains a SocketConnection class to manage the web socket connection, and the endpoint logic to serve that connection.
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List
from datetime import datetime
import json
from backend.database import db_profile
from backend.database import get_database
from sqlalchemy.orm.session import Session

router = APIRouter()


class SocketConnection:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def chat_connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def chat_disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_private_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_public_message(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
            

socket_manager = SocketConnection()


@router.websocket("/{client_id}")
async def chat_socket(websocket: WebSocket, client_id: int,  database: Session = Depends(get_database)):
    await socket_manager.chat_connect(websocket)
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    try:
        while True:
            data = await websocket.receive_text()
            await socket_manager.send_private_message(f"You wrote: {data}", websocket)
            data = json.loads(data)
            avatar = db_profile.get_user_avatar(database, client_id).avatar_path
            message = {"time":current_time,"clientId":client_id,"message":data,"avatar_path":avatar}
            await socket_manager.send_public_message(json.dumps(message))
            
    except WebSocketDisconnect:
        socket_manager.chat_disconnect(websocket)
        message = {"time":current_time,"User ID":client_id,"message":"Offline"}
        await socket_manager.send_public_message(json.dumps(message))