"""
db_game.py
    - contains functions for database operations relating to the game table
    - functions from here are called by game-related CRUD endpoints
"""

from sqlalchemy.orm import Session
from .models import DbGame
from backend.schemas import schema


def create_game(db: Session, request: schema.GameRequest):
    new_game = DbGame(
        user_id = request.user_id,
        game_title = request.game_title,
        game_platform = request.game_platform,
        game_username = request.game_username,
        main_character = request.main_character,
        current_rank = request.current_rank,
        highest_rank = request.highest_rank,
        hours_played = request.hours_played
    )
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game


def get_all_db_games(db: Session):
    return db.query(DbGame).all()


def get_all_user_games(db: Session, user_id: int):
    return db.query(DbGame).filter(DbGame.user_id == user_id).all()


def get_game(db: Session, game_id: int):
    return db.query(DbGame).filter(DbGame.game_id == game_id).first()


def update_game(db: Session, game_id: int, request: schema.GameRequest):
    result = db.query(DbGame).filter(DbGame.game_id == game_id)
    result.update({
        DbGame.game_title: request.game_title,
        DbGame.game_platform: request.game_platform,
        DbGame.game_username: request.game_username,
        DbGame.main_character: request.main_character,
        DbGame.current_rank: request.current_rank,
        DbGame.highest_rank: request.highest_rank,
        DbGame.hours_played: request.hours_played
    })
    db.commit()
    return {'success': True, 'message': f'Updated game ID: {game_id}'}


def delete_game(db: Session, game_id: int):
    result = db.query(DbGame).filter(DbGame.game_id == game_id).first()
    db.delete(result)
    db.commit()
    return {'success': True, 'message': f'Deleted game ID: {game_id}'}