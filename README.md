# 🌱 Plant Health AI - Disease Detection & Diagnosis

A modern, professional web application for AI-powered plant disease detection and diagnosis. Upload plant images to get instant analysis and treatment recommendations.

![Plant Health AI](https://img.shields.io/badge/Plant%20Health-AI-green?style=for-the-badge&logo=leaf)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

## ✨ Features

### 🎨 Modern User Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Real-time Preview**: See your image before analysis
- **Professional Styling**: Clean, modern design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support

### 🧠 AI-Powered Analysis
- **38+ Plant Diseases**: Detects diseases across multiple plant species
- **High Accuracy**: Advanced machine learning model trained on thousands of images
- **Instant Results**: Quick analysis with detailed disease information
- **Confidence Scores**: Shows prediction confidence levels

### 📱 User Experience
- **Loading Animations**: Visual feedback during analysis
- **Error Handling**: Clear error messages and validation
- **Result Export**: Print or save analysis results
- **Mobile Optimized**: Perfect for field use with smartphones

### 🌿 Plant Species Supported
- **Fruits**: Apple, Orange, Peach, Strawberry, Grape
- **Vegetables**: Tomato, Potato, Corn, Pepper, Squash
- **Others**: Cherry, Blueberry, Raspberry, Soybean

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhijaysinghthakur/plants-.git
   cd plants-
   ```

2. **Navigate to the application directory**
   ```bash
   cd "Back End"
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:38000`

## 📁 Project Structure

```
plants-/
├── Back End/
│   ├── app.py                 # Main Flask application
│   ├── utilities.py           # Prediction utilities
│   ├── requirements.txt       # Python dependencies
│   ├── Model.h5              # Trained ML model
│   ├── Procfile              # Deployment configuration
│   ├── static/               # Static assets
│   │   ├── css/
│   │   │   └── style.css     # Modern styling
│   │   ├── js/
│   │   │   └── main.js       # Interactive features
│   │   └── [uploaded images] # User uploads
│   └── templates/
│       └── index.html        # Enhanced HTML template
├── Model/                    # ML model training code
├── Images/                  # Sample images
└── README.md               # This file
```

## 🎯 Usage

### Basic Usage
1. **Upload Image**: Click the upload area or drag & drop a plant image
2. **Preview**: Review your image before analysis
3. **Analyze**: Click "Analyze Plant Health" to start detection
4. **View Results**: Get detailed disease information and treatment recommendations

### Supported File Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- Maximum file size: 16MB

### API Endpoints

#### Web Interface
- `GET /` - Main application interface
- `POST /predict` - Process image and return results

#### API Endpoints
- `GET /health` - Health check
- `GET /info` - Application information
- `POST /api/predict` - JSON API for predictions

## 🛠️ Technical Details

### Backend
- **Framework**: Flask 3.0+
- **ML Library**: Mock prediction system (TensorFlow removed for Vercel compatibility)
- **Image Processing**: PIL (Pillow) with fallback support
- **Model**: Demonstration system with 38+ plant disease classes
- **Deployment**: Vercel serverless functions

### Frontend
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Icons**: Font Awesome 6
- **Responsive**: Mobile-first design approach

### Deployment Architecture
- **Platform**: Vercel (serverless)
- **Entry Point**: `api/index.py`
- **Static Files**: Served via Vercel's CDN
- **Dependencies**: Optimized for serverless deployment (no TensorFlow)

### Security Features
- File type validation
- File size limits
- Secure filename generation
- Input sanitization
- Error handling

## 🏥 Disease Information

The application can detect and provide information for:

### Apple Diseases
- Apple Scab
- Black Rot
- Cedar Apple Rust

### Tomato Diseases
- Early Blight
- Late Blight
- Bacterial Spot
- Leaf Mold
- Septoria Leaf Spot
- Target Spot
- Yellow Leaf Curl Virus
- Mosaic Virus

### Other Crops
- Corn: Common Rust, Northern Leaf Blight, Cercospora Leaf Spot
- Potato: Early Blight, Late Blight
- Grape: Black Rot, Esca, Leaf Blight
- And many more...

## 🚀 Deployment

### Local Development
```bash
cd "Back End"
python app.py
```

### Vercel Deployment (Recommended)
This application is optimized for Vercel deployment:

1. **Connect to Vercel**
   - Fork this repository
   - Connect it to your Vercel account
   - Vercel will automatically detect the configuration

2. **Deploy**
   ```bash
   # Vercel CLI (optional)
   vercel --prod
   ```

3. **Test Deployment**
   ```bash
   python test_deployment.py https://your-app.vercel.app
   ```

**Key Features for Vercel:**
- ✅ Serverless architecture ready
- ✅ Optimized dependencies (no TensorFlow)
- ✅ Static file serving configured
- ✅ Health check endpoints included

### Other Platforms

#### Heroku
The application includes a `Procfile` for Heroku deployment:

```bash
# For Heroku deployment
git push heroku main
```

### Environment Variables
- `FLASK_ENV`: Set to `production` for production deployments
- `PORT`: Port number (default: 38000)

## 🔧 Configuration

### File Upload Settings
```python
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
```

### Model Settings
- Input size: 150x150x3
- Model architecture: MobileNetV2
- Number of classes: 38

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Plant Village Dataset for training data
- TensorFlow team for the ML framework
- Flask community for the web framework
- Font Awesome for icons

## 📞 Support

For support, email [support@planthealthai.com](mailto:support@planthealthai.com) or create an issue in this repository.

## 🚨 Disclaimer

This tool is for educational and informational purposes only. Always consult with agricultural experts and plant pathologists for professional diagnosis and treatment recommendations.

---

Made with 💚 for farmers and gardeners worldwide