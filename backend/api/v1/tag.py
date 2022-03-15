"""
tag.py
    - Contains CRUD endpoints for backend operations related to the tag database table.
    - Takes in REST api calls from the front end and returns requested tag data for use in the front end application.
"""

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