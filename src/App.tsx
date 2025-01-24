import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Home/HomePage';
import MethodologyPage from './components/Methodology/MethodologyPage';
import DashboardPage from './components/Dashboard/DashboardPage';
// import MapView from './components/Dashboard/MapView';
// import TableView from './components/Dashboard/TableView';
// import TimeSeries from './components/Dashboard/TimeSeries';
// import DetailedView from './components/Dashboard/DetailedView';
import CompareDistrictsPage from './components/CompareDistricts/CompareDistrictsPage';
import StaticMapsPage from './components/StaticMaps/StaticMapsPage';
// import MainMapView from './components/StaticMaps/MainMapView';
// import DetailedMapView from './components/StaticMaps/DetailedMapView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/compare-districts" element={<CompareDistrictsPage />} />
          <Route path="/static-maps" element={<StaticMapsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
