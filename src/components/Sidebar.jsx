import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiBarChart2, FiTrendingUp, FiCpu, FiBell, 
  FiDatabase, FiFileText, FiActivity, FiSettings, FiBook,
  FiX
} from 'react-icons/fi';
import { MdDashboard, MdAutoGraph } from 'react-icons/md';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', icon: FiHome, label: 'Home', color: 'text-blue-400' },
    { path: '/dashboard', icon: MdDashboard, label: 'Dashboard', color: 'text-green-400' },
    { path: '/prediction', icon: MdAutoGraph, label: 'Prediction Maker', color: 'text-purple-400' },
    { path: '/analytics', icon: FiBarChart2, label: 'Analytics', color: 'text-yellow-400' },
    { path: '/models', icon: FiCpu, label: 'Model Comparison', color: 'text-red-400' },
    { path: '/alerts', icon: FiBell, label: 'Alerts', color: 'text-orange-400' },
    { path: '/historical', icon: FiDatabase, label: 'Historical Data', color: 'text-cyan-400' },
    { path: '/reports', icon: FiFileText, label: 'Reports', color: 'text-indigo-400' },
    { path: '/performance', icon: FiActivity, label: 'System Performance', color: 'text-pink-400' },
    { path: '/settings', icon: FiSettings, label: 'Settings', color: 'text-gray-400' },
    { path: '/docs', icon: FiBook, label: 'Documentation', color: 'text-emerald-400' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">99.2%</div>
              <div className="text-sm text-blue-100">Model Accuracy</div>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-400">Last Updated</div>
              <div className="text-sm text-gray-300">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;