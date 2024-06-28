# app/__init__.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def create_app():
    # Create the FastAPI app instance
    app = FastAPI()

    # # Include any global app-level configurations here
    configure_app(app)
    
    # # Import and include route definitions here
    from app.routes import router as routes_router
    app.include_router(routes_router)
    print(app)
    # from .routes import router
    # app.include_router(router)

    return app

def configure_app(app):
    # Configure FastAPI app settings
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
