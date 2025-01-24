import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import Sidebar from './Sidebar';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <DashboardNav />
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;