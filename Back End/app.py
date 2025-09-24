# Plant Disease Prediction Flask Application

from utilities import makePrediction
import os
from flask import Flask, request, render_template, jsonify, flash, redirect, url_for
from werkzeug.utils import secure_filename
import uuid
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'plant_disease_prediction_secret_key_2024'

# Configuration
IMAGE_FOLDER = os.path.join(os.getcwd(), "static")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(filename):
    """Generate a unique filename to prevent conflicts."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = str(uuid.uuid4())[:8]
    file_extension = filename.rsplit('.', 1)[1].lower()
    return f"plant_{timestamp}_{unique_id}.{file_extension}"

@app.route("/", methods=["GET", "POST"])
def index():
    """Main page route."""
    return render_template("index.html", data="Hey there!!")

@app.route("/predict", methods=["POST", "GET"])
def predict():
    """Handle plant disease prediction."""
    if request.method == "POST":
        try:
            # Check if file was uploaded
            if 'img' not in request.files:
                flash('No file selected. Please choose an image to analyze.', 'error')
                return render_template("index.html", data="No file selected")
            
            img = request.files['img']
            
            # Check if file is empty
            if img.filename == '':
                flash('No file selected. Please choose an image to analyze.', 'error')
                return render_template("index.html", data="No file selected")
                
            # Validate file type
            if not allowed_file(img.filename):
                flash('Invalid file type. Please upload a JPG, PNG, or GIF image.', 'error')
                return render_template("index.html", data="Invalid file type")
            
            # Generate unique filename and save
            unique_filename = generate_unique_filename(img.filename)
            img_loc = os.path.join(IMAGE_FOLDER, unique_filename)
            
            # Ensure static directory exists
            os.makedirs(IMAGE_FOLDER, exist_ok=True)
            
            # Save the uploaded image
            img.save(img_loc)
            
            # Make prediction
            prediction = makePrediction(img_loc)
            
            # Clean up the prediction result for better display
            formatted_prediction = format_prediction(prediction)
            
            # Return results
            flash('Analysis completed successfully!', 'success')
            return render_template("index.html", 
                                 data=formatted_prediction, 
                                 image_loc=unique_filename,
                                 original_prediction=prediction)
            
        except Exception as e:
            # Log the error (in production, use proper logging)
            print(f"Error during prediction: {str(e)}")
            flash('An error occurred during analysis. Please try again with a different image.', 'error')
            return render_template("index.html", data="Analysis failed")
    
    # GET request - redirect to main page
    return redirect(url_for('index'))

@app.route("/api/predict", methods=["POST"])
def api_predict():
    """API endpoint for prediction (for AJAX requests)."""
    try:
        if 'img' not in request.files:
            return jsonify({'error': 'No file uploaded', 'success': False}), 400
        
        img = request.files['img']
        
        if img.filename == '':
            return jsonify({'error': 'No file selected', 'success': False}), 400
            
        if not allowed_file(img.filename):
            return jsonify({'error': 'Invalid file type', 'success': False}), 400
        
        # Process image
        unique_filename = generate_unique_filename(img.filename)
        img_loc = os.path.join(IMAGE_FOLDER, unique_filename)
        
        os.makedirs(IMAGE_FOLDER, exist_ok=True)
        img.save(img_loc)
        
        # Make prediction
        prediction = makePrediction(img_loc)
        formatted_prediction = format_prediction(prediction)
        
        return jsonify({
            'success': True,
            'prediction': formatted_prediction,
            'original_prediction': prediction,
            'image_url': unique_filename,
            'confidence': calculate_mock_confidence(prediction)  # Mock confidence for demo
        })
        
    except Exception as e:
        print(f"API Error: {str(e)}")
        return jsonify({'error': 'Analysis failed', 'success': False}), 500

@app.route("/health")
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route("/info")
def app_info():
    """Application information endpoint."""
    return jsonify({
        'name': 'Plant Disease Prediction API',
        'version': '2.0.0',
        'description': 'AI-powered plant disease detection and diagnosis',
        'supported_formats': list(ALLOWED_EXTENSIONS),
        'max_file_size': '16MB'
    })

def format_prediction(prediction):
    """Format the prediction result for better display."""
    if not prediction:
        return "Unknown condition"
    
    # Replace underscores and format the text
    formatted = prediction.replace('___', ' - ').replace('_', ' ')
    
    # Capitalize words properly
    words = formatted.split()
    formatted_words = []
    for word in words:
        if word.lower() in ['and', 'or', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'with']:
            formatted_words.append(word.lower())
        else:
            formatted_words.append(word.capitalize())
    
    return ' '.join(formatted_words)

def calculate_mock_confidence(prediction):
    """Calculate a mock confidence score for demonstration."""
    # This is a simple mock function - in reality, you would get this from your ML model
    if 'healthy' in prediction.lower():
        return round(85 + (hash(prediction) % 15), 1)  # 85-99% for healthy
    else:
        return round(70 + (hash(prediction) % 25), 1)  # 70-94% for diseases

@app.errorhandler(413)
def too_large(e):
    """Handle file too large error."""
    flash('File is too large. Please upload an image smaller than 16MB.', 'error')
    return render_template("index.html", data="File too large"), 413

@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors."""
    return render_template("index.html", data="Page not found"), 404

@app.errorhandler(500)
def internal_error(e):
    """Handle 500 errors."""
    flash('An internal error occurred. Please try again.', 'error')
    return render_template("index.html", data="Internal server error"), 500

if __name__ == "__main__":
    # Create static directory if it doesn't exist
    os.makedirs(IMAGE_FOLDER, exist_ok=True)
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=38000)
