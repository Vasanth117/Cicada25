import React, { useState, useEffect } from 'react';
import { FiCpu, FiTrendingUp, FiTarget, FiAward } from 'react-icons/fi';
import { MdAutoGraph } from 'react-icons/md';
import Card from '../components/Card';
import { energyAPI } from '../services/api';

const ModelComparison = () => {
  const [models, setModels] = useState({});
  const [bestModel, setBestModel] = useState('');
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const result = await energyAPI.getModels();
      setModels(result.models);
      setBestModel(result.best_model);
    } catch (error) {
      console.error('Error loading models:', error);
    } finally {
      setLoading(false);
    }
  };

  const trainModels = async () => {
    setTraining(true);
    try {
      const result = await energyAPI.trainModels();
      setModels(result.models);
      setBestModel(result.best_model);
    } catch (error) {
      console.error('Error training models:', error);
    } finally {
      setTraining(false);
    }
  };

  const getModelIcon = (modelName) => {
    switch (modelName) {
      case 'XGBoost': return <FiCpu className="w-6 h-6" />;
      case 'RandomForest': return <FiTrendingUp className="w-6 h-6" />;
      case 'LinearRegression': return <FiTarget className="w-6 h-6" />;
      default: return <MdAutoGraph className="w-6 h-6" />;
    }
  };

  const getModelColor = (modelName) => {
    switch (modelName) {
      case 'XGBoost': return 'from-purple-500 to-blue-600';
      case 'RandomForest': return 'from-green-500 to-teal-600';
      case 'LinearRegression': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-xl">
            <FiCpu className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Model Comparison</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Compare the performance of different machine learning models for energy demand prediction.
        </p>
      </div>

      {/* Train Models Button */}
      <div className="text-center mb-8">
        <button
          onClick={trainModels}
          disabled={training}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          {training ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Training Models...</span>
            </>
          ) : (
            <>
              <MdAutoGraph className="w-5 h-5" />
              <span>Train Models</span>
            </>
          )}
        </button>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(models).map(([modelName, metrics]) => (
          <Card key={modelName} className="relative overflow-hidden">
            {bestModel === modelName && (
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full">
                  <FiAward className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className={`bg-gradient-to-r ${getModelColor(modelName)} p-4 rounded-xl inline-block mb-4`}>
                {getModelIcon(modelName)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{modelName}</h3>
              {bestModel === modelName && (
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Best Model
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white font-bold">{metrics.accuracy.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(metrics.accuracy, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">R² Score</span>
                  <span className="text-white font-bold">{metrics.r2.toFixed(3)}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(metrics.r2 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">MAE</span>
                  <span className="text-white font-bold">{metrics.mae.toFixed(0)} MW</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      {Object.keys(models).length > 0 && (
        <Card gradient>
          <h3 className="text-xl font-bold text-white mb-6 text-center">Performance Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Object.values(models).reduce((max, model) => Math.max(max, model.accuracy), 0).toFixed(1)}%
              </div>
              <div className="text-gray-400">Best Accuracy</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Object.values(models).reduce((max, model) => Math.max(max, model.r2), 0).toFixed(3)}
              </div>
              <div className="text-gray-400">Best R² Score</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Object.values(models).reduce((min, model) => Math.min(min, model.mae), Infinity).toFixed(0)} MW
              </div>
              <div className="text-gray-400">Lowest MAE</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ModelComparison;