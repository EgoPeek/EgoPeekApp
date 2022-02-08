from fastapi import APIRouter
from backend import schemas

router = APIRouter()


@router.get("")
def read_index():
    """
    Retrieve index
    """
    return {"Hello": "World"}