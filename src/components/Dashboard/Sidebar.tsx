import React from 'react';
import { Calendar, Map } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Indicators
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#4A8BD0] focus:ring focus:ring-[#4A8BD0] focus:ring-opacity-50">
            <option>CDI</option>
            <option>PDI</option>
            <option>TDI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Year
          </label>
          <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span>2025</span>
            <Calendar className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Month
          </label>
          <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span>January</span>
            <Calendar className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by District
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#4A8BD0] focus:ring focus:ring-[#4A8BD0] focus:ring-opacity-50">
            <option>Acholi</option>
            {/* Add more districts */}
          </select>
        </div>

        <button className="w-full bg-[#4A8BD0] text-white px-4 py-2 rounded-md hover:bg-[#3870a8] transition-colors">
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;