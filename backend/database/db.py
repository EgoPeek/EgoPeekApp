"""
db.py
    - pulls data from environment variables to create a connection to the EgoPeek database.
    - yields database session to any function that requires database operations.
"""

from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.env import DATABASE_URL


# initialize engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def get_database():
    """
    Initializes and returns a connection to the EgoPeek database.
    """
    database = SessionLocal()

    #return database
    try:
        yield database
    except Exception as e:
        print(f'Error: {e.__cause__}, {str(e)}')
    finally:
        database.close()