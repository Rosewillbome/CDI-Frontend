import React from 'react';
import { Search } from 'lucide-react';

const MiddleSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-8">
            How is drought affecting your District?
          </h2>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Enter district"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;