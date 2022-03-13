from fastapi import APIRouter, Depends, status
from backend import schemas
from backend.database import get_database
from sqlalchemy.orm.session import Session
from backend.database import db_game
from typing import List

router = APIRouter()


@router.post('/', response_model = schemas.GameResponse)
def create_game(request: schemas.GameRequest, database: Session = Depends(get_database)):
    """
    Creates a favorite game entry for display on the given user's profile.
    Inputs: schema: GameRequest
    Outputs: schema: GameResponse
    """
    return db_game.create_game(database, request)


@router.get('/all', response_model = List[schemas.GameResponse])
def retrieve_all_db_games(database: Session = Depends(get_database)):
    """
    Retrieves all game data stored in the database.
    Inputs: None
    Outputs: List[schema: GameResponse]
    """
    return db_game.get_all_db_games(database)


@router.get('/users/{user_id}', response_model = List[schemas.GameResponse])
def retrieve_all_user_games(user_id, database: Session = Depends(get_database)):
    """
    Retrieves all game data for a user.
    Inputs: user_id: int
    Outputs: List[schemas: gameResponse]
    """
    return db_game.get_all_user_games(database, user_id)


@router.get('/{game_id}', response_model = schemas.GameResponse)
def retrieve_game(game_id, database: Session = Depends(get_database)):
    """
    Retrieves data stored for the given game ID.
    Inputs: game_id: int
    Outputs: schema: GameResponse
    """
    return db_game.get_game(database, game_id)


@router.put('/{game_id}')
def update_game(game_id, request: schemas.GameRequest, database: Session = Depends(get_database)):
    """
    Updates the database entry associated with the given game_id.
    Inputs: game_id: int, schema: GameRequest
    Outputs: {'success': bool, 'message': str}
    """
    return db_game.update_game(database, game_id, request)


@router.delete('/{game_id}')
def delete_game(game_id, database: Session = Depends(get_database)):
    """
    Deletes the given game entry from the EgoPeek database.
    Inputs: game_id: int
    Outputs: {'success': bool, 'messsage': str}
    """
    return db_game.delete_game(database, game_id)