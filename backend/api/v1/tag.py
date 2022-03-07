from fastapi import APIRouter, Depends, status

router = APIRouter()

# Include database model in models.py
# Include input and output classes in schema.py
# Include database functions in db_tag.py
# Write CRUD endpoints
#   - inputs/outputs use schema to filter where appropriate
#   - logic should happen in the db_tag.py file
#   - keep url strings as simple as possible


@router.post('/')
def create_tag():
    pass