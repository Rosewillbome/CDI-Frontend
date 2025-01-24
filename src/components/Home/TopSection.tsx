import React from 'react';
import SaveReportButton from '../Shared/SaveReportButton';

const TopSection: React.FC = () => {
  return (
    <div 
      className="relative h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1672761619560-f13835a70830?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Drought Expanded, Intensified in Acholi District
            </h1>
          </div>
          {/* Use SaveReportButton component here */}
          <SaveReportButton />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
