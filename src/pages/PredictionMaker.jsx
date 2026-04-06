import React, { useState } from 'react';
import { FiCalendar, FiClock, FiThermometer, FiDroplet, FiSun, FiMoon } from 'react-icons/fi';
import { MdAutoGraph } from 'react-icons/md';
import Card from '../components/Card';
import { energyAPI } from '../services/api';

const PredictionMaker = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hour: new Date().getHours(),
    temperature: 22,
    humidity: 60,
    windSpeed: 10,
    cloudCover: 30,
    isHoliday: false,
    isWeekend: false
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const result = await energyAPI.predict({
        date: formData.date,
        time: formData.hour,
        temperature: formData.temperature,
        humidity: formData.humidity,
        windSpeed: formData.windSpeed,
        cloudCover: formData.cloudCover,
        isWeekend: formData.isWeekend,
        isHoliday: formData.isHoliday
      });
      setPrediction(result.prediction);
      setConfidence(result.confidence / 100);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (conf) => {
    if (conf >= 0.9) return 'text-green-400';
    if (conf >= 0.8) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceLabel = (conf) => {
    if (conf >= 0.9) return 'High Confidence';
    if (conf >= 0.8) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-xl">
            <MdAutoGraph className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Energy Demand Prediction</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Use our advanced AI models to predict energy demand for any date, time, and weather conditions.
          Get instant predictions with confidence intervals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date & Time */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <FiCalendar className="w-5 h-5 text-blue-400" />
              <span>Date & Time Selection</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Hour (0-23)
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={formData.hour}
                    onChange={(e) => handleInputChange('hour', parseInt(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Weather Conditions */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <FiThermometer className="w-5 h-5 text-yellow-400" />
              <span>Weather Conditions</span>
            </h3>
            
            <div className="space-y-6">
              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    Temperature (°C)
                  </label>
                  <span className="text-white font-medium">{formData.temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="45"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-10°C</span>
                  <span>45°C</span>
                </div>
              </div>

              {/* Humidity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center space-x-2">
                    <FiDroplet className="w-4 h-4" />
                    <span>Humidity (%)</span>
                  </label>
                  <span className="text-white font-medium">{formData.humidity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Wind Speed */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    Wind Speed (km/h)
                  </label>
                  <span className="text-white font-medium">{formData.windSpeed} km/h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.windSpeed}
                  onChange={(e) => handleInputChange('windSpeed', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Cloud Cover */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    Cloud Cover (%)
                  </label>
                  <span className="text-white font-medium">{formData.cloudCover}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.cloudCover}
                  onChange={(e) => handleInputChange('cloudCover', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </Card>

          {/* Special Conditions */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Special Conditions</h3>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isHoliday}
                  onChange={(e) => handleInputChange('isHoliday', e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-300">Public Holiday</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isWeekend}
                  onChange={(e) => handleInputChange('isWeekend', e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-300">Weekend</span>
              </label>
            </div>
          </Card>
        </div>

        {/* Prediction Results */}
        <div className="space-y-6">
          {/* Predict Button */}
          <Card className="text-center">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Predicting...</span>
                </>
              ) : (
                <>
                  <MdAutoGraph className="w-5 h-5" />
                  <span>Generate Prediction</span>
                </>
              )}
            </button>
            
            <p className="text-sm text-gray-400">
              Click to generate an AI-powered energy demand prediction
            </p>
          </Card>

          {/* Results */}
          {prediction !== null && (
            <Card gradient className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6">Prediction Results</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {prediction.toLocaleString()} MW
                  </div>
                  <div className="text-gray-400">Predicted Demand</div>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <div className={`text-2xl font-bold mb-2 ${getConfidenceColor(confidence)}`}>
                    {Math.round(confidence * 100)}%
                  </div>
                  <div className="text-gray-400 mb-4">{getConfidenceLabel(confidence)}</div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        confidence >= 0.9 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        confidence >= 0.8 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Presets */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Presets</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setFormData(prev => ({ ...prev, temperature: 35, humidity: 80, hour: 14 }))}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FiSun className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Hot Summer Day</div>
                    <div className="text-sm text-gray-400">35°C, 80% humidity, 2 PM</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setFormData(prev => ({ ...prev, temperature: -5, humidity: 40, hour: 19 }))}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FiMoon className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Cold Winter Evening</div>
                    <div className="text-sm text-gray-400">-5°C, 40% humidity, 7 PM</div>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PredictionMaker;