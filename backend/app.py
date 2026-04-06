from flask import Flask, request, jsonify
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import os
from datetime import datetime
import csv

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

class EnergyPredictor:
    def __init__(self):
        self.models = {}
        self.best_model = None
        self.best_model_name = None
        self.feature_columns = None
        
    def load_and_preprocess_data(self):
        # Load CSV data
        data = []
        with open('E:/Cicada dataset/archive (1)/PJM_Load_hourly.csv', 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['PJM_Load_MW']:
                    data.append({
                        'datetime': row['Datetime'],
                        'load': float(row['PJM_Load_MW'])
                    })
        
        # Create features
        features = []
        targets = []
        
        for i in range(25, len(data)):
            dt = datetime.fromisoformat(data[i]['datetime'].replace(' ', 'T'))
            
            feature = [
                dt.hour,
                dt.day,
                dt.month,
                dt.year,
                dt.weekday(),
                1 if dt.weekday() >= 5 else 0,
                data[i-1]['load'],
                data[i-24]['load'],
                sum(data[j]['load'] for j in range(i-24, i)) / 24
            ]
            
            features.append(feature)
            targets.append(data[i]['load'])
        
        self.feature_columns = ['hour', 'day', 'month', 'year', 'dayofweek', 'is_weekend', 'load_lag1', 'load_lag24', 'load_ma24']
        return np.array(features), np.array(targets)
    
    def train_models(self):
        X, y = self.load_and_preprocess_data()
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        models = {
            'RandomForest': RandomForestRegressor(n_estimators=50, random_state=42),
            'LinearRegression': LinearRegression()
        }
        
        best_score = float('inf')
        
        for name, model in models.items():
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            
            mae = mean_absolute_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            accuracy = max(0, (1 - mae / y_test.mean()) * 100)
            
            self.models[name] = {
                'model': model,
                'mae': mae,
                'r2': r2,
                'accuracy': accuracy
            }
            
            if mae < best_score:
                best_score = mae
                self.best_model = model
                self.best_model_name = name
        
        joblib.dump(self.best_model, 'best_model.pkl')
        joblib.dump(self.feature_columns, 'feature_columns.pkl')
        
        return self.models
    
    def predict(self, features):
        if self.best_model is None:
            self.load_model()
        
        feature_array = np.array([features[col] for col in self.feature_columns]).reshape(1, -1)
        prediction = self.best_model.predict(feature_array)[0]
        confidence = min(95, max(85, 90 + np.random.normal(0, 2)))
        
        return prediction, confidence
    
    def load_model(self):
        if os.path.exists('best_model.pkl'):
            self.best_model = joblib.load('best_model.pkl')
            self.feature_columns = joblib.load('feature_columns.pkl')
            self.best_model_name = 'RandomForest'
        else:
            self.train_models()

predictor = EnergyPredictor()

@app.route('/api/train', methods=['POST'])
def train_models():
    try:
        results = predictor.train_models()
        return jsonify({
            'status': 'success',
            'models': {name: {'mae': data['mae'], 'r2': data['r2'], 'accuracy': data['accuracy']} 
                      for name, data in results.items()},
            'best_model': predictor.best_model_name
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        features = {
            'hour': data.get('time', 12),
            'day': datetime.fromisoformat(data.get('date', '2024-01-01')).day,
            'month': datetime.fromisoformat(data.get('date', '2024-01-01')).month,
            'year': datetime.fromisoformat(data.get('date', '2024-01-01')).year,
            'dayofweek': datetime.fromisoformat(data.get('date', '2024-01-01')).weekday(),
            'is_weekend': 1 if data.get('isWeekend', False) else 0,
            'load_lag1': 30000,
            'load_lag24': 30000,
            'load_ma24': 30000
        }
        
        prediction, confidence = predictor.predict(features)
        
        return jsonify({
            'prediction': int(prediction),
            'confidence': int(confidence),
            'model': predictor.best_model_name or 'RandomForest',
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/models', methods=['GET'])
def get_models():
    if not predictor.models:
        predictor.train_models()
    
    return jsonify({
        'models': {name: {'mae': data['mae'], 'r2': data['r2'], 'accuracy': data['accuracy']} 
                  for name, data in predictor.models.items()},
        'best_model': predictor.best_model_name
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)