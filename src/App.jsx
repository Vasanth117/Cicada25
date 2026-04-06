import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PredictionMaker from './pages/PredictionMaker';
import Analytics from './pages/Analytics';
import ModelComparison from './pages/ModelComparison';
import Alerts from './pages/Alerts';
import HistoricalData from './pages/HistoricalData';
import Reports from './pages/Reports';
import SystemPerformance from './pages/SystemPerformance';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-64`}>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/prediction" element={<PredictionMaker />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/models" element={<ModelComparison />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/historical" element={<HistoricalData />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/performance" element={<SystemPerformance />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/docs" element={<Documentation />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;