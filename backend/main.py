import uvicorn
from fastapi import FastAPI, Request
from backend.api.v1 import user_router, post_router, comment_router, tag_router, friend_router
from backend.auth import auth_router
from backend.core import settings
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from backend.database import models, engine
from fastapi.middleware.cors import CORSMiddleware


# initialize database engine
models.Base.metadata.create_all(engine)

# build routers
backend = FastAPI(title=settings.PROJECT_NAME)
backend.include_router(user_router, prefix=settings.API_V1_STR)
backend.include_router(auth_router, prefix=settings.API_V1_STR)
backend.include_router(post_router, prefix=settings.API_V1_STR)
backend.include_router(comment_router, prefix=settings.API_V1_STR)
backend.include_router(tag_router, prefix=settings.API_V1_STR)
backend.include_router(friend_router, prefix=settings.API_V1_STR)

# handle CORS error for local development across ports
backend.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

# template for front end static file
templates = Jinja2Templates(directory="FrontEnd/build")

# mount index for front end
backend.mount("/static", StaticFiles(directory="FrontEnd/build/static", html = True), name="static")

# serve front end from root
@backend.get("/{rest_of_path:path}", response_class = HTMLResponse)
async def serve_frontend(request: Request, rest_of_path: str):
    return templates.TemplateResponse("index.html", {"request": request})

# run server
if __name__ == "__main__":
    uvicorn.run(backend, host='0.0.0.0', port=settings.PORT)