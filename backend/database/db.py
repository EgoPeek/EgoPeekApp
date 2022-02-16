from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# global variables
DB_NAME = 'EgoPeekDB'
USER = 'admin'
PASSWORD ='EgoPeek4550'
ENDPOINT = 'ego-peek-db.cjt7d0e8tkzl.us-west-1.rds.amazonaws.com'
PORT = 3306
DATABASE_URL = f'mysql+mysqldb://{USER}:{PASSWORD}@{ENDPOINT}:{PORT}/{DB_NAME}'

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