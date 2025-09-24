# Copilot Instructions for Plant Health AI

## Project Overview

This is a Plant Health AI application that provides disease detection and diagnosis for plants using machine learning. The application is built with Flask and deployed on Vercel as a serverless application.

### Key Technologies
- **Backend**: Flask 3.0+ with Python
- **Frontend**: HTML, CSS (modern grid/flexbox), Vanilla JavaScript
- **ML**: Demonstration prediction system (TensorFlow removed for Vercel compatibility)
- **Image Processing**: PIL (Pillow) with fallback support
- **Deployment**: Vercel serverless functions
- **Styling**: Font Awesome 6 icons, custom CSS with CSS variables

## Architecture

### Project Structure
```
plants-/
├── .copilot/                 # Copilot instructions
├── api/
│   └── index.py             # Vercel serverless entry point
├── Back End/                # Main Flask application
│   ├── app.py              # Flask app with routes
│   ├── utilities.py        # Prediction utilities with fallbacks
│   ├── static/             # CSS, JS, uploaded images
│   │   ├── css/style.css   # Modern responsive styling
│   │   └── js/main.js      # Interactive features
│   └── templates/
│       └── index.html      # Enhanced HTML template
├── Model/                  # ML model training code
├── Images/                 # Sample images
├── vercel.json            # Vercel deployment configuration
└── requirements.txt       # Production dependencies
```

### Deployment Architecture
- **Platform**: Vercel serverless
- **Entry Point**: `api/index.py` imports Flask app from `Back End/`
- **Static Files**: Served via Vercel's CDN with routing in `vercel.json`
- **Dependencies**: Optimized for serverless (no TensorFlow, <250MB limit)

## Development Guidelines

### Code Style & Patterns

#### Python (Flask Backend)
- Use Flask 3.0+ patterns and best practices
- Import utilities from `utilities.py` for predictions
- Handle file uploads with proper validation (ALLOWED_EXTENSIONS, file size limits)
- Generate unique filenames with timestamps and UUIDs
- Use absolute paths for templates and static files (Vercel compatibility)
- Include proper error handling and fallbacks for missing dependencies
- Follow existing logging patterns with Python's logging module
- Use secure_filename() for uploaded files

#### HTML/CSS/JavaScript
- Use semantic HTML5 elements
- Maintain responsive design with CSS Grid and Flexbox
- Use CSS custom properties (variables) for theming
- Follow mobile-first responsive design approach
- Use Font Awesome 6 icons consistently
- Write vanilla JavaScript (ES6+), avoid external JS frameworks
- Include proper accessibility attributes (alt text, ARIA labels)

#### File Upload Handling
- Support PNG, JPG, JPEG, GIF formats only
- Maximum file size: 16MB
- Generate unique filenames to prevent conflicts
- Validate file types on both client and server side
- Store uploads in the static directory

### Dependencies Management
- Keep requirements minimal for Vercel's 250MB limit
- Use fallback logic when optional dependencies aren't available
- Core dependencies: Flask==3.0.0, Pillow>=9.0.0, gunicorn==21.2.0
- Avoid TensorFlow in production (use mock prediction system)

### API Design
- Main routes: `/` (GET/POST), `/predict` (POST), `/health` (GET), `/info` (GET), `/api/predict` (POST)
- Return JSON for API endpoints with proper error handling
- Include meaningful error messages and status codes
- Support both form submissions and API calls

### Testing & Validation
- Use `test_deployment.py` for deployment validation
- Test endpoints: health, info, main page, static files, API
- Validate both local development and Vercel deployment
- Include proper timeout handling (30s for requests)

## Specific Implementation Notes

### Serverless Compatibility
- The app is configured for Vercel serverless deployment
- `api/index.py` serves as the entry point and imports from `Back End/app.py`
- Static file routing is handled in `vercel.json`
- Use absolute paths for template and static folders

### ML Model Integration
- Current implementation uses a mock prediction system
- `utilities.py` includes fallback logic for missing NumPy/PIL
- Returns demonstration results with plant disease classifications
- Handles 38+ plant disease classes

### Error Handling
- Graceful fallbacks when dependencies are missing
- Proper file upload validation and error messages
- User-friendly error messages in the UI
- Comprehensive logging for debugging

### Security Considerations
- File type validation (whitelist approach)
- File size limits (16MB max)
- Secure filename generation
- Input sanitization
- Proper Flask secret key management

## Development Workflow

### Local Development
1. Navigate to `Back End/` directory
2. Run `python app.py` 
3. Access at `http://localhost:38000`

### Deployment Testing
1. Use `python test_deployment.py <url>` to validate deployment
2. Test all endpoints: health, info, main page, static files, API
3. Verify Vercel configuration in `vercel.json`

### Adding New Features
- Follow existing patterns in `app.py` for new routes
- Update `utilities.py` for ML-related functionality
- Maintain responsive design in CSS
- Add proper error handling and validation
- Update documentation as needed

## Common Patterns to Follow

### Route Handlers
```python
@app.route("/endpoint", methods=["GET", "POST"])
def handler():
    if request.method == "POST":
        # Handle POST logic with proper validation
        # Return JSON for API calls or render template
    return render_template("template.html", data=data)
```

### File Upload Processing
```python
file = request.files['img']
if file and allowed_file(file.filename):
    filename = generate_unique_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
```

### Error Response Pattern
```python
return jsonify({
    'success': False,
    'error': 'User-friendly error message',
    'details': 'Technical details if needed'
}), 400
```

## Important Notes for Contributors

1. **Minimal Dependencies**: Keep the dependency footprint small for Vercel compatibility
2. **Fallback Logic**: Always include fallbacks for optional dependencies
3. **Responsive Design**: Maintain mobile-first design principles
4. **Security**: Validate all user inputs, especially file uploads
5. **Testing**: Use the provided test script for deployment validation
6. **Documentation**: Update relevant README sections when making changes

This application serves farmers and gardeners worldwide with AI-powered plant disease detection. Always consider the end-user experience and ensure the application remains accessible and reliable.