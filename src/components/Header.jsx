import React from 'react';
import { FiMenu, FiBell, FiUser, FiSettings, FiSearch } from 'react-icons/fi';
import { MdElectricBolt } from 'react-icons/md';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <MdElectricBolt className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EnergyForecast AI
              </h1>
              <p className="text-sm text-gray-400">Smart Grid Analytics</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search forecasts, alerts..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">System Online</span>
          </div>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <FiBell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <FiSettings className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3 bg-gray-700 rounded-lg px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Energy Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;