import React, { useState, useEffect } from 'react';
import { 
  FiBarChart3, FiTrendingUp, FiCalendar, FiThermometer, 
  FiClock, FiActivity, FiTarget, FiZap 
} from 'react-icons/fi';
import Card from '../components/Card';
import Chart from '../components/Chart';
import apiService from '../services/api';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('hourly');
  const [dateRange, setDateRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    hourly: [],
    weekly: [],
    correlation: [],
    insights: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [dateRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Generate comprehensive analytics data
      const hourlyPatterns = generateHourlyPatterns();
      const weeklyData = generateWeeklyData();
      const correlationData = generateCorrelationData();
      const insights = generateInsights();

      setAnalyticsData({
        hourly: hourlyPatterns,
        weekly: weeklyData,
        correlation: correlationData,
        insights: insights
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateHourlyPatterns = () => {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
      const baseDemand = 1000 + Math.sin(hour * Math.PI / 12) * 300;
      const weekdayDemand = baseDemand + (hour >= 8 && hour <= 18 ? 200 : 0);
      const weekendDemand = baseDemand * 0.85;
      
      data.push({
        hour: `${hour}:00`,
        weekday: Math.round(weekdayDemand + (Math.random() - 0.5) * 50),
        weekend: Math.round(weekendDemand + (Math.random() - 0.5) * 40),
        average: Math.round((weekdayDemand * 5 + weekendDemand * 2) / 7)
      });
    }
    return data;
  };

  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => {
      const isWeekend = index >= 5;
      const baseDemand = isWeekend ? 850 : 1200;
      return {
        day,
        demand: Math.round(baseDemand + (Math.random() - 0.5) * 100),
        peak: Math.round(baseDemand * 1.3 + (Math.random() - 0.5) * 150),
        efficiency: Math.round(92 + Math.random() * 6)
      };
    });
  };

  const generateCorrelationData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      const temp = -5 + Math.random() * 40;
      let demand = 1000;
      
      // Temperature correlation
      if (temp > 25) {
        demand += (temp - 25) * 25; // AC usage
      } else if (temp < 10) {
        demand += (10 - temp) * 20; // Heating
      }
      
      demand += (Math.random() - 0.5) * 200; // Random variation
      
      data.push({
        temperature: Math.round(temp * 10) / 10,
        demand: Math.round(demand)
      });
    }
    return data.sort((a, b) => a.temperature - b.temperature);
  };

  const generateInsights = () => {
    return [
      {
        title: 'Peak Demand Hours',
        value: '2:00 PM - 6:00 PM',
        change: '+12%',
        icon: FiClock,
        color: 'text-blue-400',
        description: 'Highest energy consumption during afternoon hours'
      },
      {
        title: 'Temperature Sensitivity',
        value: '25 MW/°C',
        change: '+3.2%',
        icon: FiThermometer,
        color: 'text-red-400',
        description: 'Demand increases significantly above 25°C'
      },
      {
        title: 'Weekend Reduction',
        value: '15%',
        change: '-2.1%',
        icon: FiCalendar,
        color: 'text-green-400',
        description: 'Lower consumption on weekends vs weekdays'
      },
      {
        title: 'Forecast Accuracy',
        value: '96.8%',
        change: '+1.4%',
        icon: FiTarget,
        color: 'text-purple-400',
        description: 'Model prediction accuracy over last 30 days'
      }
    ];
  };

  const tabs = [
    { id: 'hourly', label: 'Hourly Patterns', icon: FiClock },
    { id: 'weekly', label: 'Weekly Analysis', icon: FiCalendar },
    { id: 'correlation', label: 'Temperature Impact', icon: FiThermometer },
    { id: 'insights', label: 'Key Insights', icon: FiTarget }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hourly':
        return (
          <div className="space-y-6">
            <Card className="chart-container">
              <h3 className="text-xl font-semibold text-white mb-6">24-Hour Demand Patterns</h3>
              <div className="mb-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">Weekday</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Weekend</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">Average</span>
                </div>
              </div>
              <Chart
                type="line"
                data={analyticsData.hourly}
                xKey="hour"
                yKey="average"
                color="#8b5cf6"
                height={350}
              />
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <FiActivity className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">6:00 AM</div>
                <div className="text-gray-400">Minimum Demand</div>
              </Card>
              <Card className="text-center">
                <FiZap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">3:00 PM</div>
                <div className="text-gray-400">Peak Demand</div>
              </Card>
              <Card className="text-center">
                <FiTrendingUp className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">18%</div>
                <div className="text-gray-400">Daily Variation</div>
              </Card>
            </div>
          </div>
        );

      case 'weekly':
        return (
          <div className="space-y-6">
            <Card className="chart-container">
              <h3 className="text-xl font-semibold text-white mb-6">Weekly Demand Distribution</h3>
              <Chart
                type="bar"
                data={analyticsData.weekly}
                xKey="day"
                yKey="demand"
                color="#10b981"
                height={350}
              />
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="text-lg font-semibold text-white mb-4">Weekday vs Weekend</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Weekday</span>
                    <span className="text-white font-medium">1,185 MW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Weekend</span>
                    <span className="text-white font-medium">1,008 MW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Difference</span>
                    <span className="text-green-400 font-medium">-15%</span>
                  </div>
                </div>
              </Card>
              
              <Card>
                <h4 className="text-lg font-semibold text-white mb-4">Peak Hours by Day</h4>
                <div className="space-y-3">
                  {analyticsData.weekly.slice(0, 4).map((day, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white">{day.peak} MW</span>
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(day.peak / 1600) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );

      case 'correlation':
        return (
          <div className="space-y-6">
            <Card className="chart-container">
              <h3 className="text-xl font-semibold text-white mb-6">Temperature vs Energy Demand</h3>
              <Chart
                type="scatter"
                data={analyticsData.correlation}
                xKey="temperature"
                yKey="demand"
                color="#f59e0b"
                height={350}
              />
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <FiThermometer className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">25°C</div>
                <div className="text-gray-400">Optimal Temperature</div>
                <div className="text-sm text-gray-500 mt-2">Minimum energy usage</div>
              </Card>
              <Card className="text-center">
                <FiTrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">0.85</div>
                <div className="text-gray-400">Correlation Coefficient</div>
                <div className="text-sm text-gray-500 mt-2">Strong positive correlation</div>
              </Card>
              <Card className="text-center">
                <FiActivity className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">±200MW</div>
                <div className="text-gray-400">Temperature Impact</div>
                <div className="text-sm text-gray-500 mt-2">Per 10°C change</div>
              </Card>
            </div>
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyticsData.insights.map((insight, index) => (
                <Card key={index} gradient className="hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`${insight.color} bg-gray-700 p-3 rounded-xl`}>
                      <insight.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{insight.title}</h4>
                      <div className="text-2xl font-bold text-white mb-2">{insight.value}</div>
                      <p className="text-gray-400 text-sm mb-3">{insight.description}</p>
                      <div className="flex items-center space-x-1">
                        <FiTrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">{insight.change}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6">Actionable Recommendations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-30">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Optimize Peak Hour Operations</h4>
                    <p className="text-gray-400 text-sm">Consider load balancing strategies during 2-6 PM to reduce peak demand costs.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-green-500 bg-opacity-10 rounded-lg border border-green-500 border-opacity-30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Weather-Based Forecasting</h4>
                    <p className="text-gray-400 text-sm">Implement temperature-sensitive demand predictions for better accuracy above 25°C.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-purple-500 bg-opacity-10 rounded-lg border border-purple-500 border-opacity-30">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Weekend Efficiency</h4>
                    <p className="text-gray-400 text-sm">Leverage 15% lower weekend demand for maintenance and system optimization.</p>
                  </div>
                </div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Energy Analytics</h1>
          <p className="text-gray-400">Deep insights into consumption patterns and demand forecasting</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  );
};

export default Analytics;