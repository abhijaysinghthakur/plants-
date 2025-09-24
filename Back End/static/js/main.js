// Plant Disease Prediction App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const removeImage = document.getElementById('removeImage');
    const predictForm = document.getElementById('predictForm');
    const predictBtn = document.getElementById('predictBtn');
    const loading = document.getElementById('loading');
    const resultsSection = document.getElementById('resultsSection');

    // File upload handling
    if (uploadArea && fileInput) {
        setupFileUpload(uploadArea, fileInput, imagePreview, previewImage);
    }

    // Remove image functionality
    if (removeImage) {
        removeImage.addEventListener('click', function() {
            clearImagePreview(fileInput, imagePreview);
        });
    }

    // Form submission
    if (predictForm) {
        predictForm.addEventListener('submit', function(e) {
            handleFormSubmission(e, predictBtn, loading, resultsSection);
        });
    }

    // Initialize tooltips and other UI enhancements
    initializeUIEnhancements();
}

function setupFileUpload(uploadArea, fileInput, imagePreview, previewImage) {
    // Click to upload
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileSelection(file, imagePreview, previewImage);
        }
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (isValidImageFile(file)) {
                fileInput.files = files;
                handleFileSelection(file, imagePreview, previewImage);
            } else {
                showMessage('Please select a valid image file (JPG, PNG, GIF)', 'error');
            }
        }
    });
}

function handleFileSelection(file, imagePreview, previewImage) {
    if (!isValidImageFile(file)) {
        showMessage('Please select a valid image file (JPG, PNG, GIF)', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showMessage('File size must be less than 10MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        previewImage.src = e.target.result;
        imagePreview.style.display = 'block';
        imagePreview.classList.add('fade-in');
        
        // Enable predict button
        const predictBtn = document.getElementById('predictBtn');
        if (predictBtn) {
            predictBtn.disabled = false;
        }
    };
    reader.readAsDataURL(file);
}

function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
}

function clearImagePreview(fileInput, imagePreview) {
    fileInput.value = '';
    imagePreview.style.display = 'none';
    
    // Disable predict button
    const predictBtn = document.getElementById('predictBtn');
    if (predictBtn) {
        predictBtn.disabled = true;
    }
    
    // Hide results
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'none';
    }
}

function handleFormSubmission(e, predictBtn, loading, resultsSection) {
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        e.preventDefault();
        showMessage('Please select an image first', 'warning');
        return;
    }

    // Show loading state
    if (predictBtn) {
        predictBtn.disabled = true;
        predictBtn.textContent = 'Analyzing...';
    }
    
    if (loading) {
        loading.style.display = 'block';
    }
    
    if (resultsSection) {
        resultsSection.style.display = 'none';
    }

    // Progress simulation
    simulateProgress();
}

function simulateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            progressBar.style.width = progress + '%';
            
            if (progress >= 90) {
                clearInterval(interval);
            }
        }, 200);
    }
}

function showResults(prediction, confidence, imageUrl) {
    const resultsSection = document.getElementById('resultsSection');
    const loading = document.getElementById('loading');
    const predictBtn = document.getElementById('predictBtn');
    
    // Hide loading
    if (loading) {
        loading.style.display = 'none';
    }
    
    // Reset predict button
    if (predictBtn) {
        predictBtn.disabled = false;
        predictBtn.textContent = 'Analyze Plant Health';
    }
    
    // Show results
    if (resultsSection) {
        updateResultsContent(prediction, confidence, imageUrl);
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Complete progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '100%';
    }
}

function updateResultsContent(prediction, confidence, imageUrl) {
    // Update disease name
    const diseaseNameEl = document.getElementById('diseaseName');
    if (diseaseNameEl) {
        diseaseNameEl.textContent = formatDiseaseName(prediction);
    }
    
    // Update confidence score
    const confidenceEl = document.getElementById('confidenceScore');
    if (confidenceEl && confidence) {
        confidenceEl.textContent = `Confidence: ${confidence}%`;
    }
    
    // Update disease information
    updateDiseaseInfo(prediction);
}

function formatDiseaseName(prediction) {
    if (!prediction) return 'Unknown';
    
    // Clean up the prediction name
    return prediction
        .replace(/___/g, ' - ')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

function updateDiseaseInfo(prediction) {
    const diseaseInfo = getDiseaseInformation(prediction);
    
    // Update description
    const descriptionEl = document.getElementById('diseaseDescription');
    if (descriptionEl) {
        descriptionEl.textContent = diseaseInfo.description;
    }
    
    // Update symptoms
    const symptomsEl = document.getElementById('diseaseSymptoms');
    if (symptomsEl) {
        symptomsEl.innerHTML = diseaseInfo.symptoms.map(symptom => `<li>${symptom}</li>`).join('');
    }
    
    // Update treatment
    const treatmentEl = document.getElementById('diseaseTreatment');
    if (treatmentEl) {
        treatmentEl.innerHTML = diseaseInfo.treatment.map(treatment => `<li>${treatment}</li>`).join('');
    }
    
    // Update prevention
    const preventionEl = document.getElementById('diseasePrevention');
    if (preventionEl) {
        preventionEl.innerHTML = diseaseInfo.prevention.map(prevention => `<li>${prevention}</li>`).join('');
    }
}

function getDiseaseInformation(prediction) {
    const diseaseDB = {
        'Apple___Apple_scab': {
            description: 'Apple scab is a fungal disease that affects apple trees, causing dark, scaly lesions on leaves and fruit.',
            symptoms: [
                'Dark, olive-green spots on leaves',
                'Scaly, corky lesions on fruit',
                'Premature leaf drop',
                'Reduced fruit quality'
            ],
            treatment: [
                'Apply fungicides during spring',
                'Remove infected leaves and fruit',
                'Prune for better air circulation',
                'Use resistant apple varieties'
            ],
            prevention: [
                'Plant resistant varieties',
                'Ensure good air circulation',
                'Avoid overhead watering',
                'Clean up fallen leaves'
            ]
        },
        'Tomato___Early_blight': {
            description: 'Early blight is a fungal disease that affects tomato plants, causing dark spots with concentric rings.',
            symptoms: [
                'Dark spots with concentric rings on leaves',
                'Yellow halos around spots',
                'Lower leaves affected first',
                'Stem cankers may develop'
            ],
            treatment: [
                'Apply copper-based fungicides',
                'Remove affected plant parts',
                'Improve air circulation',
                'Water at soil level'
            ],
            prevention: [
                'Rotate crops annually',
                'Mulch around plants',
                'Avoid overhead watering',
                'Space plants properly'
            ]
        }
        // Add more disease information as needed
    };
    
    return diseaseDB[prediction] || {
        description: 'Information about this condition is being updated. Please consult with a plant pathologist for detailed guidance.',
        symptoms: ['Consult expert for detailed symptoms'],
        treatment: ['Seek professional agricultural advice'],
        prevention: ['Follow general plant health practices']
    };
}

function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('messageContainer') ||
                           createMessageContainer();
    
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    messageContainer.appendChild(messageEl);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 5000);
}

function createMessageContainer() {
    const container = document.createElement('div');
    container.id = 'messageContainer';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.zIndex = '1000';
    container.style.maxWidth = '400px';
    
    document.body.appendChild(container);
    return container;
}

function initializeUIEnhancements() {
    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard support for file upload
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.setAttribute('tabindex', '0');
        uploadArea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('fileInput').click();
            }
        });
    }
    
    // Initialize intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });
        
        document.querySelectorAll('.card, .results-section').forEach(el => {
            observer.observe(el);
        });
    }
}

// Export functions for use in HTML
window.PlantDiseaseApp = {
    showResults,
    showMessage,
    clearImagePreview
};