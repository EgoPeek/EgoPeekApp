import uvicorn
from fastapi import FastAPI
from backend.api.v1 import api_router
from backend.core import settings
from fastapi.staticfiles import StaticFiles
from FrontEnd import build

backend = FastAPI(title=settings.PROJECT_NAME)
backend.include_router(api_router, prefix=settings.API_V1_STR)

# mount index.html for front end
backend.mount("/app", StaticFiles(directory="FrontEnd/build", html = True), name="build")

if __name__ == "__main__":
    uvicorn.run(backend, host='0.0.0.0', port=settings.PORT)