from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_link
from typing import List

router = APIRouter()


@router.post('/', response_model = schemas.LinkResponse)
def create_link(request: schemas.LinkRequest, database: Session = Depends(get_database)):
    """
    Creates a link to another social media site for given user.
    Inputs: schema: LinkRequest
    Outputs: schema: LinkResponse
    """
    return db_link.create_link(database, request)


@router.get('/all', response_model = List[schemas.LinkResponse])
def retrieve_all_db_links(database: Session = Depends(get_database)):
    """
    Retrieves all link data stored in the database.
    Inputs: None
    Outputs: List[schema: LinkResponse]
    """
    return db_link.get_all_db_links(database)


@router.get('/users/{user_id}', response_model = List[schemas.LinkResponse])
def retrieve_all_user_links(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all link data for a user.
    Inputs: user_id: int
    Outputs: List[schemas: LinkResponse]
    """
    return db_link.get_all_user_links(database, user_id)


@router.get('/{link_id}', response_model = schemas.LinkResponse)
def retrieve_link(link_id, database: Session = Depends(get_database)):
    """
    Retrieves the url associated with a given link_id.
    Inputs: link_id: int
    Outputs: schema: LinkResponse
    """
    return db_link.get_link(database, link_id)


@router.put('/{link_id}')
def update_link(link_id, request: schemas.LinkRequest, database: Session = Depends(get_database)):
    """
    Updates the url associated with the given link_id.
    Inputs: link_id: int, schema: LinkRequest
    Outputs: {'success': bool, 'message': str}
    """
    return db_link.update_link(database, link_id, request)


@router.delete('/{link_id}')
def delete_link(link_id, database: Session = Depends(get_database)):
    """
    Deletes the given link entry from the EgoPeek database.
    Inputs: link_id: int
    Outputs: {'success': bool, 'messsage': str}
    """
    return db_link.delete_link(database, link_id)