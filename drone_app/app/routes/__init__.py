# app/routes/__init__.py

# Import the router from the user module
from .connectRoute import router as user_router

# Create a new router that includes the user_router
router = user_router
