import React, { useState } from "react";
import { DROUGHT_SEVERITY_LEVELS } from "../../utils/drought_levels";
import { FiDownload, FiInfo } from "react-icons/fi";

const years = Array.from({ length: 25 }, (_, i) => 2001 + i);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MapView = () => {
  const [selectedYear, setSelectedYear] = useState(2010);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedYear(years[Math.floor(value / 12)]);
    setSelectedMonth(value % 12);
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          
          <h1 className="text-3xl font-bold text-gray-800">Combined Drought Index (CDI)</h1>
        </div>
        <h2 className="text-xl text-gray-600 font-medium">
          {selectedDistrict || "Acholi District"}
        </h2>
      </div>

      {/* Main Content Container */}
      <div className="flex h-[60vh] mb-4 gap-6">
        {/* Map Section */}
        <div className="w-[60%] bg-white rounded-xl shadow-lg p-4 relative">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors tooltip" 
                    data-tooltip="Download Map">
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <span className="text-gray-400 font-medium">Map placeholder</span>
          </div>
          
          {/*  Legend  */}
          <div className="absolute bottom-4 right-4 bg-white shadow-lg p-2 text-sm">
            <h3 className="font-semibold mb-2">Legend</h3>
            <div className="space-y-1">
              {DROUGHT_SEVERITY_LEVELS.map((level) => (
                <div
                  key={level.range}
                  className="flex items-center space-x-2 p-1"
                  style={{ backgroundColor: level.color }}
                >
                  <span className="text-xs ">{level.label}</span>
                  <span className="text-[10px] text-gray-600">({level.range})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Section  */}
        <div className="w-[40%] bg-white rounded-xl shadow-lg p-4 relative">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors tooltip" 
                    data-tooltip="Download Chart">
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <span className="text-gray-400 font-medium">Time series</span>
          </div>
        </div>
      </div>

      {/* Time Selector Section */}
      <div className=" ">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            {months[selectedMonth]} {selectedYear}
          </h3>
          <span className="text-sm text-gray-500">
            {2001} - {2025}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={(2025 - 2001) * 12 + 11}
          step={1}
          value={selectedYear * 12 + selectedMonth - 2001 * 12}
          onChange={handleSliderChange}
          className="w-full range-slider"
        />
      </div>

      {/* Key Note Section */}
      <div className="w-[60%] bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>Real-time drought monitoring using FAO Combined Drought Index (CDI)</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>Integrated analysis of precipitation, soil moisture, and vegetation health</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>Supports Uganda's climate resilience and sustainable resource management</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapView;