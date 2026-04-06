import React, { useState } from 'react';
import { FiBell, FiAlertTriangle, FiAlertCircle, FiInfo, FiSettings, FiPlus } from 'react-icons/fi';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'High Demand Alert',
      message: 'Predicted demand will exceed 1800 MW at 3:00 PM today',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      acknowledged: false,
      category: 'demand'
    },
    {
      id: 2,
      title: 'Temperature Spike',
      message: 'Temperature forecast shows 38°C, expect increased AC usage',
      severity: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      acknowledged: true,
      category: 'weather'
    },
    {
      id: 3,
      title: 'Model Accuracy Drop',
      message: 'XGBoost model accuracy dropped to 94.2% in last 24 hours',
      severity: 'low',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      acknowledged: false,
      category: 'system'
    },
    {
      id: 4,
      title: 'Grid Capacity Warning',
      message: 'Current utilization at 85%, approaching capacity limits',
      severity: 'critical',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      acknowledged: false,
      category: 'grid'
    }
  ]);

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const severityConfig = {
    critical: { color: 'text-red-400', bg: 'bg-red-500', icon: FiAlertTriangle },
    high: { color: 'text-orange-400', bg: 'bg-orange-500', icon: FiAlertCircle },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500', icon: FiBell },
    low: { color: 'text-blue-400', bg: 'bg-blue-500', icon: FiInfo }
  };

  const acknowledgeAlert = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const categoryMatch = filterCategory === 'all' || alert.category === filterCategory;
    return severityMatch && categoryMatch;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Alert Management</h1>
          <p className="text-gray-400">Monitor system alerts and configure notification settings</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowConfigModal(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <FiSettings className="w-4 h-4" />
            <span>Configure</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>New Alert</span>
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(severityConfig).map(([severity, config]) => {
          const count = alerts.filter(a => a.severity === severity).length;
          return (
            <Card key={severity} className="text-center">
              <div className={`${config.bg} bg-opacity-20 p-3 rounded-xl mx-auto mb-4 w-fit`}>
                <config.icon className={`w-6 h-6 ${config.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{count}</div>
              <div className="text-gray-400 capitalize">{severity} Alerts</div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Severity</label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="demand">Demand</option>
                <option value="weather">Weather</option>
                <option value="system">System</option>
                <option value="grid">Grid</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const config = severityConfig[alert.severity];
          return (
            <Card key={alert.id} className={`${alert.acknowledged ? 'opacity-60' : ''} hover:scale-[1.01] transition-transform`}>
              <div className="flex items-start space-x-4">
                <div className={`${config.bg} bg-opacity-20 p-2 rounded-lg flex-shrink-0`}>
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} bg-opacity-20 ${config.color}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-400">{getTimeAgo(alert.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{alert.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">Category: {alert.category}</span>
                      {alert.acknowledged && (
                        <span className="text-sm text-green-400">✓ Acknowledged</span>
                      )}
                    </div>
                    
                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="btn-secondary text-sm"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Alert Configuration"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Notification Settings</h4>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                <span className="text-gray-300">Email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                <span className="text-gray-300">SMS notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                <span className="text-gray-300">Push notifications</span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Alert Thresholds</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">High Demand Threshold (MW)</label>
                <input
                  type="number"
                  defaultValue="1800"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Temperature Alert (°C)</label>
                <input
                  type="number"
                  defaultValue="35"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Model Accuracy Threshold (%)</label>
                <input
                  type="number"
                  defaultValue="95"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfigModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowConfigModal(false)}
              className="btn-primary"
            >
              Save Settings
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Alerts;