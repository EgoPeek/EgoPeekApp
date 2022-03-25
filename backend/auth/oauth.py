from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Depends, status
from sqlalchemy.orm import Session
from backend.database import get_database, db_user
from backend.env import TOKEN_SECRET
 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
 
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

 
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
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, TOKEN_SECRET, algorithms=[ALGORITHM])
    username: str = payload.get("username")
    if username is None:
      raise credentials_exception
  except JWTError:
    raise credentials_exception
  
  print(f'querying db')
  user = db_user.get_user_by_username(db, username=username)
  if user is None:
    raise credentials_exception
  return user