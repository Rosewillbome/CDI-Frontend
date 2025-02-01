import React from 'react';

const TimeSeries = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Time Series</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Intersectoral Severity</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
              {/* Replace with actual chart implementation */}
              <div className="flex items-center justify-center text-gray-500">
                Time Series Chart Placeholder
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">TDI Trend</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
              {/* Replace with actual chart implementation */}
              <div className="flex items-center justify-center text-gray-500">
                TDI Chart Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeries;