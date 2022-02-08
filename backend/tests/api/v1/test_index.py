from typing import Dict
from fastapi.testclient import TestClient
from backend.core import settings


def test_index(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/test")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}