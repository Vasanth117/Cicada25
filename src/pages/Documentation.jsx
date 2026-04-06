import React, { useState } from 'react';
import { FiBook, FiCode, FiHelpCircle, FiDownload, FiExternalLink } from 'react-icons/fi';
import Card from '../components/Card';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: FiBook },
    { id: 'api', title: 'API Reference', icon: FiCode },
    { id: 'models', title: 'ML Models', icon: FiHelpCircle },
    { id: 'deployment', title: 'Deployment', icon: FiDownload }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-4">EnergyForecast AI Platform</h2>
              <p className="text-gray-300 mb-6">
                EnergyForecast AI is a comprehensive platform for predicting energy demand using advanced machine learning algorithms. 
                The system combines historical consumption data, weather patterns, and temporal features to provide accurate forecasts 
                for energy grid management.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Real-time energy demand forecasting with 96.8% accuracy</li>
                <li>• Weather-based prediction adjustments</li>
                <li>• Multiple ML model comparison (XGBoost, Random Forest, LSTM)</li>
                <li>• Interactive dashboard with live monitoring</li>
                <li>• Automated alert system for peak demand events</li>
                <li>• Historical data analysis and trend identification</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mb-3">Architecture</h3>
              <p className="text-gray-300">
                The platform follows a microservices architecture with React frontend, Python backend, 
                and machine learning pipeline for continuous model training and inference.
              </p>
            </Card>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-4">API Reference</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Authentication</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <code className="text-green-400">
                  Authorization: Bearer YOUR_API_TOKEN
                </code>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">Endpoints</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">GET</span>
                    <code className="text-blue-400">/api/forecast</code>
                  </div>
                  <p className="text-gray-300 mb-2">Get energy demand forecast for specified time range</p>
                  <div className="bg-gray-900 rounded p-3">
                    <pre className="text-sm text-gray-300">
{`{
  "start_date": "2024-11-08",
  "end_date": "2024-11-09",
  "hours": 24
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">POST</span>
                    <code className="text-blue-400">/api/predict</code>
                  </div>
                  <p className="text-gray-300 mb-2">Generate prediction for specific conditions</p>
                  <div className="bg-gray-900 rounded p-3">
                    <pre className="text-sm text-gray-300">
{`{
  "date": "2024-11-08",
  "hour": 14,
  "temperature": 25.5,
  "humidity": 60,
  "is_weekend": false
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">GET</span>
                    <code className="text-blue-400">/api/models/performance</code>
                  </div>
                  <p className="text-gray-300">Get performance metrics for all ML models</p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'models':
        return (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-4">Machine Learning Models</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Model Architecture</h3>
              <p className="text-gray-300 mb-6">
                The platform uses an ensemble of machine learning models to achieve high accuracy in energy demand forecasting.
              </p>
              
              <div className="space-y-6">
                <div className="border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">XGBoost (Primary Model)</h4>
                  <p className="text-gray-300 mb-3">
                    Gradient boosting algorithm optimized for time series forecasting with weather features.
                  </p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• MAPE: 3.2%</li>
                    <li>• RMSE: 45.8 MW</li>
                    <li>• R² Score: 0.94</li>
                    <li>• Training Time: ~15 minutes</li>
                  </ul>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">LSTM Neural Network</h4>
                  <p className="text-gray-300 mb-3">
                    Deep learning model for capturing long-term temporal dependencies in energy consumption patterns.
                  </p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• MAPE: 3.8%</li>
                    <li>• RMSE: 48.9 MW</li>
                    <li>• R² Score: 0.93</li>
                    <li>• Training Time: ~45 minutes</li>
                  </ul>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Random Forest</h4>
                  <p className="text-gray-300 mb-3">
                    Ensemble method providing robust predictions and feature importance analysis.
                  </p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• MAPE: 4.1%</li>
                    <li>• RMSE: 52.3 MW</li>
                    <li>• R² Score: 0.91</li>
                    <li>• Training Time: ~8 minutes</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Feature Engineering</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
{`Features Used:
• Temporal: hour, day_of_week, month, is_weekend, is_holiday
• Weather: temperature, humidity, wind_speed, cloud_cover
• Lagged: demand_lag_1h, demand_lag_24h, demand_lag_168h
• Rolling: demand_rolling_mean_24h, temp_rolling_mean_24h
• Seasonal: seasonal_decomposition_trend, seasonal_component`}
                </pre>
              </div>
            </Card>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-4">Deployment Guide</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
              <ul className="text-gray-300 space-y-1 mb-6">
                <li>• Node.js 16+ and npm</li>
                <li>• Python 3.8+ with pip</li>
                <li>• Docker (optional)</li>
                <li>• PostgreSQL database</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mb-3">Installation Steps</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">1. Clone Repository</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">
                      git clone https://github.com/your-org/energy-forecast-ai.git<br/>
                      cd energy-forecast-ai
                    </code>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">2. Install Frontend Dependencies</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">
                      npm install<br/>
                      npm start
                    </code>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">3. Setup Backend</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">
                      cd backend<br/>
                      pip install -r requirements.txt<br/>
                      python manage.py migrate<br/>
                      python manage.py runserver
                    </code>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">4. Environment Variables</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm">
{`DATABASE_URL=postgresql://user:pass@localhost:5432/energydb
WEATHER_API_KEY=your_weather_api_key
SECRET_KEY=your_secret_key
DEBUG=False`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Docker Deployment</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">
                  docker-compose up -d
                </code>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-gray-400">Complete guide to using the EnergyForecast AI platform</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="btn-secondary flex items-center space-x-2">
            <FiDownload className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <FiExternalLink className="w-4 h-4" />
            <span>GitHub</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Documentation;