import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DataFetchingPage from './pages/DataFetchingPage';
import ConditionalRenderingPage from './pages/ConditionalRenderingPage';
import RouterDemoPage from './pages/RouterDemoPage';
import StateManagementPage from './pages/StateManagementPage';
import RestVsGraphqlPage from './pages/RestVsGraphqlPage';
import NextJsSsrPage from './pages/NextJsSsrPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/data-fetching" element={<DataFetchingPage />} />
          <Route path="/conditional-rendering" element={<ConditionalRenderingPage />} />
          <Route path="/react-router" element={<RouterDemoPage />} />
          <Route path="/state-management" element={<StateManagementPage />} />
          <Route path="/rest-vs-graphql" element={<RestVsGraphqlPage />} />
          <Route path="/ssr-nextjs" element={<NextJsSsrPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
