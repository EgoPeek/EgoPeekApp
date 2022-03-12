from sqlalchemy.orm import Session
from .models import DbLink
from backend.schemas import schema


def create_link(db: Session, request: schema.LinkRequest):
    new_link = DbLink(
        user_id = request.user_id,
        link_platform = request.link_platform,
        link_username = request.link_username,
        link_url = request.link_url
    )
    db.add(new_link)
    db.commit()
    db.refresh(new_link)
    return new_link


def get_all_db_links(db: Session):
    return db.query(DbLink).all()


def get_all_user_links(db: Session, user_id: int):
    return db.query(DbLink).filter(DbLink.user_id == user_id).all()


def get_link(db: Session, link_id: int):
    return db.query(DbLink).filter(DbLink.link_id == link_id).first()


def update_link(db: Session, link_id: int, request: schema.LinkRequest):
    result = db.query(DbLink).filter(DbLink.link_id == link_id)
    result.update({
        DbLink.link_platform: request.link_platform,
        DbLink.link_username: request.link_username,
        DbLink.link_url: request.link_url
    })
    db.commit()
    return {'success': True, 'message': f'Updated link ID: {link_id}'}


def delete_link(db: Session, link_id: int):
    result = db.query(DbLink).filter(DbLink.link_id == link_id).first()
    db.delete(result)
    db.commit()
    return {'success': True, 'message': f'Deleted link ID: {link_id}'}