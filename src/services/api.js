import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const energyAPI = {
  // Train models
  trainModels: async () => {
    const response = await api.post('/train');
    return response.data;
  },

  // Make prediction
  predict: async (predictionData) => {
    const response = await api.post('/predict', predictionData);
    return response.data;
  },

  // Get model comparison
  getModels: async () => {
    const response = await api.get('/models');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;