from flask import Flask, request, jsonify
import json
import random
from datetime import datetime

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Mock model performance data
MODELS = {
    'RandomForest': {'mae': 1250.5, 'r2': 0.945, 'accuracy': 94.2},
    'LinearRegression': {'mae': 1890.3, 'r2': 0.876, 'accuracy': 87.8},
    'XGBoost': {'mae': 1180.2, 'r2': 0.958, 'accuracy': 96.1}
}

BEST_MODEL = 'XGBoost'

def generate_prediction(data):
    """Generate realistic energy prediction based on inputs"""
    base_demand = 30000
    
    # Time of day effect
    hour = data.get('time', 12)
    if 6 <= hour <= 9 or 17 <= hour <= 21:  # Peak hours
        time_factor = 1.3
    elif 22 <= hour <= 5:  # Night hours
        time_factor = 0.7
    else:
        time_factor = 1.0
    
    # Temperature effect
    temp = data.get('temperature', 20)
    if temp > 30 or temp < 5:  # Extreme temperatures
        temp_factor = 1.4
    elif temp > 25 or temp < 10:
        temp_factor = 1.2
    else:
        temp_factor = 1.0
    
    # Weekend effect
    weekend_factor = 0.85 if data.get('isWeekend', False) else 1.0
    
    # Holiday effect
    holiday_factor = 0.75 if data.get('isHoliday', False) else 1.0
    
    # Calculate prediction
    prediction = base_demand * time_factor * temp_factor * weekend_factor * holiday_factor
    
    # Add some randomness
    prediction += random.uniform(-2000, 2000)
    
    # Ensure reasonable bounds
    prediction = max(15000, min(50000, prediction))
    
    return int(prediction)

@app.route('/api/train', methods=['POST'])
def train_models():
    """Simulate model training"""
    return jsonify({
        'status': 'success',
        'models': MODELS,
        'best_model': BEST_MODEL,
        'message': 'Models trained successfully with PJM dataset'
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Make energy demand prediction"""
    try:
        data = request.json
        prediction = generate_prediction(data)
        confidence = random.randint(88, 96)
        
        return jsonify({
            'prediction': prediction,
            'confidence': confidence,
            'model': BEST_MODEL,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/models', methods=['GET'])
def get_models():
    """Get model comparison data"""
    return jsonify({
        'models': MODELS,
        'best_model': BEST_MODEL
    })

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'message': 'Energy Prediction API is running'
    })

if __name__ == '__main__':
    print("Starting Energy Prediction API Server...")
    print("Server running on http://localhost:5000")
    print("Frontend can now connect to the API")
    app.run(debug=True, port=5000)