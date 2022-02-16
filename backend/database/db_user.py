from backend import schemas
from sqlalchemy.orm.session import Session
from .models import DbUser


def create_user(db: Session, request: schemas.UserBase):
    print('creating new user')
    new_user = DbUser(
        username = request.username,
        email = request.email,
        password = request.password # HASH THIS
     )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user