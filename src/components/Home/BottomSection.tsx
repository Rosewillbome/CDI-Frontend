import React, { useState } from 'react';


const BottomSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('CDI');

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Advancing Drought Science and Preparedness Across the Nation
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          The Uganda National Drought Monitoring System is a statistical tool designed to assess and compare current hydro-meteorological conditions against the long-term average patterns observed during the same period.
        </p>
        <div className="bg-[#4A8BD0] p-6 rounded-lg">
          <h3 className="text-2xl text-white mb-4">Current Conditions</h3>
          <div className="flex space-x-4 mb-4">
            {['CDI', 'PDI', 'TDI'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? 'bg-white text-[#4A8BD0]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-white p-4 rounded">
            {/* Placeholder for the Uganda map */}
            <div className="h-96 bg-gray-200 rounded flex items-center justify-center">
              Uganda Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;