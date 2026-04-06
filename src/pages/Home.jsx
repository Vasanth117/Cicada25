import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, FiZap, FiShield, FiClock, FiBarChart2, 
  FiArrowRight, FiCheckCircle, FiTarget, FiGlobe 
} from 'react-icons/fi';
import { MdElectricBolt, MdAutoGraph } from 'react-icons/md';
import Card from '../components/Card';

const Home = () => {
  const features = [
    {
      icon: MdAutoGraph,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models predict energy demand with 96.8% accuracy',
      color: 'text-blue-400'
    },
    {
      icon: FiClock,
      title: 'Real-Time Monitoring',
      description: 'Live dashboard with instant updates and 24-hour forecasting capabilities',
      color: 'text-green-400'
    },
    {
      icon: FiBarChart2,
      title: 'Advanced Analytics',
      description: 'Deep insights into consumption patterns, weather correlations, and trends',
      color: 'text-purple-400'
    },
    {
      icon: FiShield,
      title: 'Proactive Alerts',
      description: 'Early warning system for peak demand, outages, and system anomalies',
      color: 'text-red-400'
    }
  ];

  const metrics = [
    { label: 'Prediction Accuracy', value: '96.8%', change: '+2.3%', color: 'text-green-400' },
    { label: 'Cost Savings', value: '$2.4M', change: '+15%', color: 'text-blue-400' },
    { label: 'System Uptime', value: '99.9%', change: '+0.1%', color: 'text-purple-400' },
    { label: 'Response Time', value: '145ms', change: '-12ms', color: 'text-yellow-400' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 md:p-12">
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <MdElectricBolt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  EnergyForecast AI
                </h1>
                <p className="text-blue-100 text-lg">
                  Revolutionizing Energy Grid Management with Artificial Intelligence
                </p>
              </div>
            </div>
            
            <p className="text-white text-lg mb-8 max-w-2xl">
              Harness the power of machine learning to predict energy demand, optimize grid operations, 
              and reduce costs while ensuring reliable power supply for millions of customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/dashboard" 
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <span>View Dashboard</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/prediction" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <MdAutoGraph className="w-5 h-5" />
                <span>Make Prediction</span>
              </Link>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} gradient className="text-center">
            <div className={`text-3xl font-bold ${metric.color} mb-2`}>
              {metric.value}
            </div>
            <div className="text-gray-300 mb-2">{metric.label}</div>
            <div className="flex items-center justify-center space-x-1">
              <FiTrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">{metric.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Powerful Features for Smart Grid Management
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our comprehensive platform combines cutting-edge AI with intuitive interfaces 
            to deliver actionable insights for energy professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:scale-105 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className={`${feature.color} bg-gray-700 p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <Card gradient className="text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Transforming Energy Management Worldwide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <FiGlobe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Utility Companies</div>
            </div>
            <div>
              <FiZap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">2.5M</div>
              <div className="text-gray-400">MWh Optimized Daily</div>
            </div>
            <div>
              <FiTarget className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">$50M+</div>
              <div className="text-gray-400">Annual Savings</div>
            </div>
          </div>
          
          <div className="space-y-3 text-left max-w-2xl mx-auto">
            {[
              'Reduce operational costs by up to 15% through accurate demand forecasting',
              'Prevent blackouts with early warning systems and capacity planning',
              'Optimize renewable energy integration and grid stability',
              'Enable data-driven decision making for energy professionals'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your Energy Operations?
        </h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Join leading utility companies worldwide in leveraging AI for smarter, 
          more efficient energy management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary">
            Explore Dashboard
          </Link>
          <Link to="/docs" className="btn-secondary">
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;