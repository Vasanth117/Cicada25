import React, { useState, useEffect } from 'react';
import { FiDatabase, FiDownload, FiCalendar, FiFilter } from 'react-icons/fi';
import Card from '../components/Card';
import Chart from '../components/Chart';
import apiService from '../services/api';

const HistoricalData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [viewMode, setViewMode] = useState('chart');

  useEffect(() => {
    loadHistoricalData();
  }, [dateRange]);

  const loadHistoricalData = async () => {
    setLoading(true);
    try {
      const historicalData = await apiService.getHistoricalData(dateRange.start, dateRange.end);
      setData(historicalData.slice(0, 100)); // Limit for demo
    } catch (error) {
      console.error('Error loading historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['Timestamp', 'Demand (MW)', 'Temperature (°C)'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.timestamp,
        row.demand,
        row.temperature.toFixed(1)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy_data_${dateRange.start}_to_${dateRange.end}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleDateString(),
    demand: item.demand,
    temperature: item.temperature
  }));

  const stats = {
    totalRecords: data.length,
    avgDemand: data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.demand, 0) / data.length) : 0,
    maxDemand: data.length > 0 ? Math.max(...data.map(item => item.demand)) : 0,
    minDemand: data.length > 0 ? Math.min(...data.map(item => item.demand)) : 0
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Historical Data</h1>
          <p className="text-gray-400">Browse and analyze historical energy consumption data</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadCSV}
            disabled={data.length === 0}
            className="btn-secondary flex items-center space-x-2"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center space-x-4">
            <FiFilter className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Chart View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <FiDatabase className="w-8 h-8 text-blue-400 mx-auto mb-4" />
          <div className="text-2xl font-bold text-white mb-2">{stats.totalRecords.toLocaleString()}</div>
          <div className="text-gray-400">Total Records</div>
        </Card>
        
        <Card className="text-center">
          <div className="text-2xl font-bold text-white mb-2">{stats.avgDemand.toLocaleString()} MW</div>
          <div className="text-gray-400">Average Demand</div>
        </Card>
        
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">{stats.maxDemand.toLocaleString()} MW</div>
          <div className="text-gray-400">Peak Demand</div>
        </Card>
        
        <Card className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-2">{stats.minDemand.toLocaleString()} MW</div>
          <div className="text-gray-400">Minimum Demand</div>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {viewMode === 'chart' ? (
            <Card className="chart-container">
              <h3 className="text-xl font-semibold text-white mb-6">Energy Demand Trends</h3>
              <Chart
                type="line"
                data={chartData.slice(0, 50)}
                xKey="time"
                yKey="demand"
                color="#3b82f6"
                height={400}
              />
            </Card>
          ) : (
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6">Historical Data Table</h3>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gray-800">
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Timestamp</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Demand (MW)</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Temperature (°C)</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Hour</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Day Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 50).map((row, index) => {
                      const date = new Date(row.timestamp);
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      return (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                          <td className="py-3 px-4 text-gray-300">
                            {date.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-white font-medium">
                            {row.demand.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {row.temperature.toFixed(1)}°
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {date.getHours()}:00
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              isWeekend ? 'bg-blue-500 bg-opacity-20 text-blue-400' : 'bg-gray-500 bg-opacity-20 text-gray-400'
                            }`}>
                              {isWeekend ? 'Weekend' : 'Weekday'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default HistoricalData;