from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Depends, status
from sqlalchemy.orm import Session
from backend.database import get_database, db_user
from backend.env import TOKEN_SECRET
 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/login")
 
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60

 
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
  """
  Creates a JSON web token for oauth endpoint authentication.
  """
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, TOKEN_SECRET, algorithm = ALGORITHM)
  return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_database)):
  # build credential error response
  cred_error = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid credentials.",
    headers={"WWW-Authenticate": "Bearer"},
  )

  # decode token and validate token user against database
  try:
    payload = jwt.decode(token, TOKEN_SECRET, algorithms=[ALGORITHM])
    username: str = payload.get("username")
    if username is None:
      raise cred_error
  except JWTError:
    raise cred_error
  
  user = db_user.get_user_by_username(db, username)
  if user is None:
    raise cred_error
  return user