from typing import Dict, Generator
import pytest
from fastapi.testclient import TestClient
from backend.main import backend


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(backend) as c:
        yield c