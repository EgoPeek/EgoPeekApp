import uvicorn
from fastapi import FastAPI
from backend.api.v1 import api_router
from backend.core import settings

backend = FastAPI(title=settings.PROJECT_NAME)

backend.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run(backend, host='0.0.0.0', port=settings.PORT)