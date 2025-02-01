'use client'
import React from 'react';
import { Calendar } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#4A8BD0] border-r border-gray-200 p-4">
      <div className="space-y-6">
        {/* Filter by Indicators */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Filter by Indicators
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#3870a8] focus:ring focus:ring-[#3870a8] focus:ring-opacity-50">
            <option>CDI</option>
            <option>PDI</option>
            <option>TDI</option>
          </select>
        </div>

        {/* Time Filters Section */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Filter by Time
          </label>
          <div className="space-y-4">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Year
              </label>
              <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span>2025</span>
                <Calendar className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Month Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Month
              </label>
              <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span>January</span>
                <Calendar className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Filter by District
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#3870a8] focus:ring focus:ring-[#3870a8] focus:ring-opacity-50">
            <option>Acholi</option>
            {/* Add more districts */}
          </select>
        </div>

        {/* Clear All Filters Button */}
        <button className="w-full bg-[#3870a8] text-white px-4 py-2 rounded-md hover:bg-[#2d5a85] transition-colors">
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
