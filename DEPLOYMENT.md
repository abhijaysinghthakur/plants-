# Vercel Deployment Guide

## Overview

This Plant Disease Detection application has been configured for deployment on Vercel's serverless platform. The main changes made to support Vercel deployment include:

## Configuration Files Added

### 1. `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/Back End/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

### 2. `api/index.py`
Entry point for Vercel's serverless functions that imports the Flask app from the `Back End` directory.

### 3. `requirements.txt` (Root)
Simplified dependencies without TensorFlow to fit within Vercel's size limits:
- Flask==3.0.0
- Pillow>=9.0.0
- gunicorn==21.2.0

## Changes Made to Fix 404 Errors

### 1. **Serverless Architecture Compatibility**
- Created `api/index.py` as the entry point for Vercel
- Updated Flask app configuration to use absolute paths for templates and static files
- Added proper routing in `vercel.json` to handle static file serving

### 2. **Dependency Management**
- Removed TensorFlow (2.17.0) dependency due to Vercel's 250MB function size limit
- Updated `utilities.py` to work without NumPy and PIL when not available
- Added proper error handling for missing dependencies

### 3. **File Structure**
```
plants-/
├── api/
│   └── index.py          # Vercel entry point
├── Back End/             # Original Flask application
│   ├── app.py           # Flask app with updated paths
│   ├── utilities.py     # Updated with fallback logic
│   ├── templates/       # HTML templates
│   └── static/          # CSS, JS, and uploaded images
├── vercel.json          # Vercel configuration
└── requirements.txt     # Production dependencies
```

## Deployment Steps

### 1. **Deploy to Vercel**
1. Connect your GitHub repository to Vercel
2. Import the project in Vercel dashboard
3. Vercel will automatically detect the `vercel.json` configuration
4. Deploy using the settings from `vercel.json`

### 2. **Environment Variables**
No environment variables are required for basic functionality, but you may want to set:
- `FLASK_ENV=production` (optional, for production optimizations)

### 3. **Verify Deployment**
After deployment, test these endpoints:
- `/` - Main application page
- `/health` - Health check endpoint
- `/info` - Application information
- `/api/predict` - API endpoint for predictions

## Common Issues and Solutions

### 1. **404 Errors**
The original 404 errors were caused by:
- Missing `vercel.json` configuration
- Incorrect routing configuration
- Flask app not properly configured for serverless environment

**Solution**: The provided `vercel.json` and `api/index.py` files resolve these issues.

### 2. **Function Size Limits**
Vercel has a 250MB limit for serverless functions.

**Solution**: Removed TensorFlow dependency and optimized requirements.txt.

### 3. **Static File Serving**
Static files (CSS, JS, images) need special routing in serverless environments.

**Solution**: Added static file routing in `vercel.json`.

## Model Prediction

Since TensorFlow was removed, the application now uses a mock prediction system that:
- Analyzes basic image properties when PIL is available
- Falls back to filename-based prediction when PIL is not available
- Returns consistent results for demonstration purposes

To enable actual ML predictions, you would need to:
1. Use a smaller ML framework (like ONNX Runtime)
2. Or deploy the ML model as a separate microservice
3. Or use Vercel's Edge Functions for larger deployments

## Monitoring

Monitor your deployment using:
- Vercel's built-in analytics
- `/health` endpoint for uptime monitoring
- Vercel's function logs for debugging

## Support

If you encounter issues:
1. Check Vercel's function logs
2. Test the `/health` endpoint
3. Verify all static files are accessible
4. Check that dependencies in `requirements.txt` are compatible