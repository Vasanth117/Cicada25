import React, { useState } from 'react';
import { FiFileText, FiDownload, FiCalendar, FiMail, FiPrinter } from 'react-icons/fi';
import Card from '../components/Card';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [format, setFormat] = useState('pdf');
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { id: 'daily', name: 'Daily Summary', description: 'Daily energy consumption and forecasting summary' },
    { id: 'weekly', name: 'Weekly Analysis', description: 'Weekly patterns and performance metrics' },
    { id: 'monthly', name: 'Monthly Report', description: 'Comprehensive monthly energy analysis' },
    { id: 'performance', name: 'Model Performance', description: 'AI model accuracy and performance metrics' },
    { id: 'alerts', name: 'Alert Summary', description: 'System alerts and incident reports' }
  ];

  const generateReport = async () => {
    setGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerating(false);
    
    // Simulate download
    const filename = `energy_report_${reportType}_${dateRange.start}_to_${dateRange.end}.${format}`;
    alert(`Report "${filename}" would be downloaded in a real application`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Report Generation</h1>
        <p className="text-gray-400">Generate comprehensive energy analysis reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Select Report Type</h3>
            <div className="space-y-3">
              {reportTypes.map((type) => (
                <label key={type.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={reportType === type.id}
                    onChange={(e) => setReportType(e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-white font-medium">{type.name}</div>
                    <div className="text-sm text-gray-400">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Date Range */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <FiCalendar className="w-5 h-5 text-blue-400" />
              <span>Date Range</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* Format Options */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Output Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['pdf', 'excel', 'csv'].map((fmt) => (
                <label key={fmt} className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="format"
                    value={fmt}
                    checked={format === fmt}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <span className="text-white font-medium uppercase">{fmt}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Report Preview & Actions */}
        <div className="space-y-6">
          {/* Generate Report */}
          <Card className="text-center">
            <FiFileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-4">Generate Report</h3>
            <button
              onClick={generateReport}
              disabled={generating}
              className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FiDownload className="w-5 h-5" />
                  <span>Generate & Download</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-400">
              Report will be generated in {format.toUpperCase()} format
            </p>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>Email Report</span>
              </button>
              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <FiPrinter className="w-4 h-4" />
                <span>Print Report</span>
              </button>
            </div>
          </Card>

          {/* Report Summary */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Report Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-white">{reportTypes.find(t => t.id === reportType)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Period:</span>
                <span className="text-white">{Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24))} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Format:</span>
                <span className="text-white uppercase">{format}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-6">Recent Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Report Name</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Generated</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Format</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Weekly Analysis - Week 45', type: 'Weekly', date: '2024-11-08', format: 'PDF' },
                { name: 'Daily Summary - Nov 7', type: 'Daily', date: '2024-11-07', format: 'Excel' },
                { name: 'Model Performance - October', type: 'Performance', date: '2024-11-01', format: 'PDF' },
                { name: 'Monthly Report - October', type: 'Monthly', date: '2024-10-31', format: 'PDF' }
              ].map((report, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{report.name}</td>
                  <td className="py-3 px-4 text-gray-300">{report.type}</td>
                  <td className="py-3 px-4 text-gray-300">{new Date(report.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      {report.format}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiDownload className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 transition-colors">
                        <FiMail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;