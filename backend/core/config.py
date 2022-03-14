"""
config.py
    - contains configuration settings for backend server base url string, project name, and port
"""

from pydantic import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Ego Peek"
    PORT: int = 5000

settings = Settings()