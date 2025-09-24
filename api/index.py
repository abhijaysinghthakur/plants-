# Vercel serverless function entry point
import sys
import os

# Add the Back End directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'Back End')
sys.path.insert(0, backend_path)

# Import the Flask app
from app import app

# Export the app for Vercel
app = app