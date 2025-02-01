'use client'
import Image from "next/image";
import { useState } from "react";
import { Info, Download, Calendar, ArrowUpRight } from 'lucide-react';
const UgandaMap = ({ district }) => {
  return (
    <div className="h-64 bg-gray-100 rounded-lg overflow-hidden mb-6">
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Uganda Map View - Highlighting {district}
      </div>
    </div>
  );
};

const TimeSeriesChart = ({ district, onFullView }) => {
  return (
    <div className="mb-6 relative">
      <h3 className="text-lg font-semibold mb-4">Time Series Analysis</h3>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        Time Series Chart for {district}
      </div>
      <button
        onClick={onFullView}
        className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-1"
      >
        Full View <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

const TDIChart  = ({ district, onFullView }) => {
  return (
    <div className="mb-6 relative">
      <h3 className="text-lg font-semibold mb-4">Temperature Drought Index (TDI)</h3>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        TDI Analysis for {district}
      </div>
      <button
        onClick={onFullView}
        className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-1"
      >
        Full View <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

const FullScreenView  = ({
  title,
  children,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center">
      <div className="bg-white w-11/12 lg:w-3/4 h-5/6 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 flex justify-between items-center bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            Close Full View
          </button>
        </div>
        <div className="p-6 h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};



const DistrictSection = ({
  district,
  setDistrict,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
  onMapDownload,
}) => {
  const [fullViewContent, setFullViewContent] = useState(null);

  const handleFullViewClose = () => setFullViewContent(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {fullViewContent && (
        <FullScreenView title="Full View" onClose={handleFullViewClose}>
          {fullViewContent}
        </FullScreenView>
      )}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-red-600">Compare this District with another</h2>
          <Info size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
          </select>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="Acholi District">Acholi District</option>
            <option value="Tamawambo District">Tamawambo District</option>
            <option value="Kampala District">Kampala District</option>
            <option value="Gulu District">Gulu District</option>
            <option value="Mbarara District">Mbarara District</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <UgandaMap district={district} />
        <div className="flex justify-end mb-4">
          <button
            onClick={onMapDownload}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            Download Map PDF
          </button>
        </div>
        <TimeSeriesChart
          district={district}
          onFullView={() =>
            setFullViewContent(
              <div className="h-full flex items-center justify-center bg-gray-100">
                Full Screen Time Series Chart for {district}
              </div>
            )
          }
        />
        <TDIChart
          district={district}
          onFullView={() =>
            setFullViewContent(
              <div className="h-full flex items-center justify-center bg-gray-100">
                Full Screen TDI Chart for {district}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};
export default function Home() {
  const [selectedIndicator, setSelectedIndicator] = useState('Combined Drought Index (CDI)');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [leftDistrict, setLeftDistrict] = useState('Acholi District');
  const [rightDistrict, setRightDistrict] = useState('Tamawambo District');

  const handleDownloadAllPdf = () => {
    console.log('Downloading all maps as PDF');
  };

  const handleMapDownload = (district) => {
    console.log(`Downloading map for ${district}`);
  };

  const handleClearFilters = () => {
    setSelectedIndicator('Combined Drought Index (CDI)');
    setSelectedYear('2025');
    setSelectedMonth('January');
    setLeftDistrict('Acholi District');
    setRightDistrict('Tamawambo District');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="lg:w-72 bg-[#4A8BD0] text-white">
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Compare Indicators</label>
            <select
              className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-white/30"
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
            >
              <option value="Combined Drought Index (CDI)">Combined Drought Index (CDI)</option>
              <option value="Temperature Drought Index (TDI)">Temperature Drought Index (TDI)</option>
              <option value="Precipitation Drought Index (PDI)">Precipitation Drought Index (PDI)</option>
            </select>
          </div>

          <button
            onClick={handleDownloadAllPdf}
            className="w-full px-4 py-3 bg-white text-[#4A8BD0] rounded-md hover:bg-white/90 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Download size={18} />
            Download All in PDF
          </button>

          <button
            onClick={handleClearFilters}
            className="w-full px-4 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white/10 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-[#4A8BD0]">{selectedIndicator}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DistrictSection
            district={leftDistrict}
            setDistrict={setLeftDistrict}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
            onMapDownload={() => handleMapDownload(leftDistrict)}
          />
          <DistrictSection
            district={rightDistrict}
            setDistrict={setRightDistrict}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
            onMapDownload={() => handleMapDownload(rightDistrict)}
          />
        </div>
      </div>
    </div>
  );
}
