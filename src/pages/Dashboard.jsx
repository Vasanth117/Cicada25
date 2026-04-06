import React, { useState, useEffect } from 'react';
import { FiZap, FiTrendingUp, FiActivity, FiThermometer, FiRefreshCw } from 'react-icons/fi';
import Card from '../components/Card';
import Chart from '../components/Chart';
import apiService from '../services/api';

const Dashboard = () => {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [current, forecast] = await Promise.all([
        apiService.getCurrentDemand(),
        apiService.getForecast(24)
      ]);
      
      setCurrentData(current);
      setForecastData(forecast);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const kpiCards = [
    {
      title: 'Current Demand',
      value: currentData ? `${currentData.current.toLocaleString()} MW` : '---',
      change: '+2.3%',
      icon: FiZap,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Grid Capacity',
      value: currentData ? `${Math.round((currentData.current / currentData.capacity) * 100)}%` : '---',
      change: '+0.8%',
      icon: FiActivity,
      color: 'text-green-400',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Efficiency',
      value: currentData ? `${currentData.efficiency.toFixed(1)}%` : '---',
      change: '+1.2%',
      icon: FiTrendingUp,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg Temperature',
      value: forecastData.length > 0 ? `${Math.round(forecastData[0].temperature)}°C` : '---',
      change: '+3.1°C',
      icon: FiThermometer,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  const hourlyData = forecastData.slice(0, 12).map(item => ({
    hour: `${item.hour}:00`,
    demand: item.demand,
    forecast: item.forecast,
    temperature: item.temperature
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Energy Dashboard</h1>
          <p className="text-gray-400">Real-time grid monitoring and 24-hour demand forecasting</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} gradient className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-white mb-2">{kpi.value}</p>
                <div className="flex items-center space-x-1">
                  <FiTrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">{kpi.change}</span>
                </div>
              </div>
              <div className={`bg-gradient-to-r ${kpi.bgGradient} p-3 rounded-xl`}>
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 24-Hour Forecast */}
        <Card className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">24-Hour Demand Forecast</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Actual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-400">Forecast</span>
              </div>
            </div>
          </div>
          <Chart
            type="line"
            data={forecastData.slice(0, 24)}
            xKey="hour"
            yKey="demand"
            color="#3b82f6"
            height={300}
          />
        </Card>

        {/* Grid Capacity Meter */}
        <Card className="chart-container">
          <h3 className="text-xl font-semibold text-white mb-6">Grid Capacity Utilization</h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {currentData ? Math.round((currentData.current / currentData.capacity) * 100) : 0}%
              </div>
              <div className="text-gray-400">Current Utilization</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Current Load</span>
                  <span className="text-white">{currentData?.current.toLocaleString() || 0} MW</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: currentData ? `${(currentData.current / currentData.capacity) * 100}%` : '0%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Peak Forecast</span>
                  <span className="text-white">{Math.max(...forecastData.map(d => d.forecast)).toLocaleString()} MW</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-red-500 h-3 rounded-full"
                    style={{ width: `${(Math.max(...forecastData.map(d => d.forecast)) / (currentData?.capacity || 2000)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Hourly Breakdown Table */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-6">Hourly Breakdown (Next 12 Hours)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Demand (MW)</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Forecast (MW)</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Temperature (°C)</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Variance</th>
              </tr>
            </thead>
            <tbody>
              {hourlyData.map((row, index) => {
                const variance = ((row.forecast - row.demand) / row.demand * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{row.hour}</td>
                    <td className="py-3 px-4 text-gray-300">{row.demand.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-300">{row.forecast.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-300">{Math.round(row.temperature)}°</td>
                    <td className="py-3 px-4">
                      <span className={`${Math.abs(variance) < 2 ? 'text-green-400' : Math.abs(variance) < 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {variance > 0 ? '+' : ''}{variance}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;