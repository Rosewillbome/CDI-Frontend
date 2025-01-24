import React from 'react';

const MapView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Map View</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
          {/* Replace with actual map implementation */}
          <div className="flex items-center justify-center text-gray-500">
            Uganda Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;