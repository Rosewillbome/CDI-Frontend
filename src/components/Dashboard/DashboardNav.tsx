import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardNav: React.FC = () => {
  const navItems = [
    { path: 'map-view', label: 'Map View' },
    { path: 'table-view', label: 'Table View' },
    { path: 'time-series', label: 'Time Series' },
    { path: 'detailed-view', label: 'Detail View' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex space-x-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-6 py-4 text-sm font-medium ${
                isActive
                  ? 'bg-[#4A8BD0] text-white'
                  : 'text-gray-500 hover:text-[#4A8BD0]'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default DashboardNav;