"""
config.py
    - contains configuration settings for backend server base url string, project name, and port
"""

from pydantic import BaseSettings
from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from backend import env 

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Ego Peek"
    PORT: int = 5000

settings = Settings()

email_config = ConnectionConfig(
    MAIL_USERNAME=env.MAIL_USERNAME,
    MAIL_PASSWORD=env.MAIL_PASSWORD,
    MAIL_FROM=env.MAIL_FROM,
    MAIL_PORT=env.MAIL_PORT,
    MAIL_SERVER=env.MAIL_SERVER,
    MAIL_FROM_NAME=env.MAIL_FROM_NAME,
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    TEMPLATE_FOLDER='./backend/auth/templates'
)