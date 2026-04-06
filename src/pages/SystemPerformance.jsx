import React, { useState, useEffect } from 'react';
import { FiActivity, FiCpu, FiHardDrive, FiWifi, FiUsers, FiClock } from 'react-icons/fi';
import Card from '../components/Card';
import Chart from '../components/Chart';
import apiService from '../services/api';

const SystemPerformance = () => {
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    loadSystemHealth();
    const interval = setInterval(loadSystemHealth, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSystemHealth = async () => {
    try {
      const health = await apiService.getSystemHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error('Error loading system health:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePerformanceData = () => {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cpu: 20 + Math.random() * 30,
        memory: 60 + Math.random() * 20,
        responseTime: 100 + Math.random() * 100
      });
    }
    return data;
  };

  const performanceData = generatePerformanceData();

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.critical) return 'text-red-400';
    if (value >= thresholds.warning) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusBg = (value, thresholds) => {
    if (value >= thresholds.critical) return 'bg-red-500';
    if (value >= thresholds.warning) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Performance</h1>
          <p className="text-gray-400">Monitor system health and performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card gradient className="text-center">
          <div className="bg-green-500 bg-opacity-20 p-3 rounded-xl mx-auto mb-4 w-fit">
            <FiActivity className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">{systemHealth?.uptime}%</div>
          <div className="text-gray-400">System Uptime</div>
          <div className="text-sm text-green-400 mt-1">Excellent</div>
        </Card>

        <Card gradient className="text-center">
          <div className="bg-blue-500 bg-opacity-20 p-3 rounded-xl mx-auto mb-4 w-fit">
            <FiClock className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">{systemHealth?.responseTime}ms</div>
          <div className="text-gray-400">Avg Response Time</div>
          <div className="text-sm text-blue-400 mt-1">Good</div>
        </Card>

        <Card gradient className="text-center">
          <div className="bg-purple-500 bg-opacity-20 p-3 rounded-xl mx-auto mb-4 w-fit">
            <FiUsers className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">{systemHealth?.activeConnections.toLocaleString()}</div>
          <div className="text-gray-400">Active Connections</div>
          <div className="text-sm text-purple-400 mt-1">Normal</div>
        </Card>

        <Card gradient className="text-center">
          <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-xl mx-auto mb-4 w-fit">
            <FiWifi className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">{systemHealth?.requestsPerMinute.toLocaleString()}</div>
          <div className="text-gray-400">Requests/Min</div>
          <div className="text-sm text-yellow-400 mt-1">High Load</div>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold text-white mb-6">Resource Utilization</h3>
          <div className="space-y-6">
            {/* CPU Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FiCpu className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">CPU Usage</span>
                </div>
                <span className={`font-medium ${getStatusColor(systemHealth?.cpuUsage, { warning: 70, critical: 90 })}`}>
                  {systemHealth?.cpuUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${getStatusBg(systemHealth?.cpuUsage, { warning: 70, critical: 90 })}`}
                  style={{ width: `${systemHealth?.cpuUsage}%` }}
                ></div>
              </div>
            </div>

            {/* Memory Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FiActivity className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400">Memory Usage</span>
                </div>
                <span className={`font-medium ${getStatusColor(systemHealth?.memoryUsage, { warning: 80, critical: 95 })}`}>
                  {systemHealth?.memoryUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${getStatusBg(systemHealth?.memoryUsage, { warning: 80, critical: 95 })}`}
                  style={{ width: `${systemHealth?.memoryUsage}%` }}
                ></div>
              </div>
            </div>

            {/* Disk Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FiHardDrive className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-400">Disk Usage</span>
                </div>
                <span className={`font-medium ${getStatusColor(systemHealth?.diskUsage, { warning: 80, critical: 95 })}`}>
                  {systemHealth?.diskUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${getStatusBg(systemHealth?.diskUsage, { warning: 80, critical: 95 })}`}
                  style={{ width: `${systemHealth?.diskUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-white mb-6">Component Status</h3>
          <div className="space-y-4">
            {[
              { name: 'API Gateway', status: 'healthy', uptime: '99.9%' },
              { name: 'Database', status: 'healthy', uptime: '99.8%' },
              { name: 'ML Models', status: 'healthy', uptime: '99.7%' },
              { name: 'Cache Layer', status: 'warning', uptime: '98.5%' },
              { name: 'Message Queue', status: 'healthy', uptime: '99.9%' },
              { name: 'File Storage', status: 'healthy', uptime: '99.6%' }
            ].map((component, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    component.status === 'healthy' ? 'bg-green-400' : 
                    component.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-white font-medium">{component.name}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    component.status === 'healthy' ? 'text-green-400' : 
                    component.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                  </div>
                  <div className="text-xs text-gray-400">{component.uptime} uptime</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <h3 className="text-xl font-semibold text-white mb-6">CPU & Memory Usage (24h)</h3>
          <Chart
            type="line"
            data={performanceData}
            xKey="time"
            yKey="cpu"
            color="#3b82f6"
            height={300}
          />
        </Card>

        <Card className="chart-container">
          <h3 className="text-xl font-semibold text-white mb-6">Response Time Trends</h3>
          <Chart
            type="area"
            data={performanceData}
            xKey="time"
            yKey="responseTime"
            color="#10b981"
            height={300}
            gradient={true}
          />
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-6">Detailed Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">{systemHealth?.errorRate}%</div>
            <div className="text-gray-400">Error Rate</div>
            <div className="text-sm text-green-400 mt-1">Within SLA</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">2.4GB</div>
            <div className="text-gray-400">Memory Used</div>
            <div className="text-sm text-yellow-400 mt-1">Moderate</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">156GB</div>
            <div className="text-gray-400">Disk Used</div>
            <div className="text-sm text-green-400 mt-1">Normal</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">24.3MB/s</div>
            <div className="text-gray-400">Network I/O</div>
            <div className="text-sm text-blue-400 mt-1">Optimal</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemPerformance;