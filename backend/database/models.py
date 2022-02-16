from .db import Base
from sqlalchemy import Column, Integer, String

class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(15))
    email = Column(String(25))
    password = Column(String(15))
