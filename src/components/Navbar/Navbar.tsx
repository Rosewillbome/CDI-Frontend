import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://www.fao.org/fileadmin/templates/family-farming-decade/images/FAO-IFAD-Logos/FAO-Logo-EN.svg" 
                alt="FAO Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-[#4A8BD0] hover:text-[#3870a8]">
              Home
            </Link>
            <Link to="/methodology" className="text-[#4A8BD0] hover:text-[#3870a8]">
              Methodology
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[#4A8BD0] hover:text-[#3870a8]">
                <span>Dashboard</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-2 py-2">
                <Link to="/dashboard/map-view" className="block px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white">
                  Map View
                </Link>
                <Link to="/dashboard/table-view" className="block px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white">
                  Table View
                </Link>
                <Link to="/dashboard/time-series" className="block px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white">
                  Time Series
                </Link>
                <Link to="/dashboard/detailed-view" className="block px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white">
                  Detailed View
                </Link>
              </div>
            </div>
            <Link to="/compare-districts" className="text-[#4A8BD0] hover:text-[#3870a8]">
              Compare Districts
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[#4A8BD0] hover:text-[#3870a8]">
                <span>Static Maps</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-2 py-2">
                <Link to="/static-maps/main-view" className="block px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white">
                  Main Map View
                </Link>
                <Link to="/static-maps/detailed-view" className="block px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white">
                  Detailed Map View
                </Link>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;