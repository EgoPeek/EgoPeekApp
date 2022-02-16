from fastapi import APIRouter, Depends
from backend import schemas
from backend.database import get_database, models, engine
from sqlalchemy.orm.session import Session
from backend.database.db_user import create_user

router = APIRouter()

models.Base.metadata.create_all(engine)


@router.get("/")
def read_index():
    """
    Retrieve index
    """
    return {"Hello": "World"}


@router.post('/users', response_model=schemas.UserDisplay)
def create_new_user(request: schemas.UserBase, database: Session = Depends(get_database)):
    """
    Creates a new user in the EgoPeek database.
    Inputs: string: username, string: email, string: password
    Outputs: string: username, string: email
    """
    return create_user(database, request)