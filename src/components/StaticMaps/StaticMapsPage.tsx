import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { DroughtIndicator, DroughtSeverityLevel, DROUGHT_SEVERITY_LEVELS } from '../../types/drought';

const StaticMapsPage: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<DroughtIndicator>('CDI');
  const [yearRange, setYearRange] = useState({ start: 2005, end: 2025 });
  const [selectedYear, setSelectedYear] = useState<number>(2005);
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(
    { length: yearRange.end - yearRange.start + 1 },
    (_, i) => yearRange.start + i
  );

  const handleDownloadMap = (year: number, month: string) => {
    // TODO: Implement map download functionality
    console.log(`Downloading map for ${month} ${year}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Static Maps</h1>
          <div className="flex space-x-4">
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value as DroughtIndicator)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
            >
              <option value="CDI">CDI</option>
              <option value="PDI">PDI</option>
              <option value="TDI">TDI</option>
            </select>
            <button
              onClick={() => handleDownloadMap(selectedYear, selectedMonth)}
              className="flex items-center space-x-2 bg-[#4A8BD0] text-white px-4 py-2 rounded-md hover:bg-[#3870a8] transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download All Maps</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {years.slice(0, 3).map((year) => (
            <div key={year} className="space-y-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-[#4A8BD0] text-white">
                  <h3 className="text-lg font-semibold">{year}</h3>
                </div>
                <div className="p-4">
                  {months.slice(0, 3).map((month) => (
                    <div key={`${year}-${month}`} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{month}</span>
                        <button
                          onClick={() => handleDownloadMap(year, month)}
                          className="text-[#4A8BD0] hover:text-[#3870a8]"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg">
                        {/* Placeholder for map */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          Map Preview
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Severity Types</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-2">
              {DROUGHT_SEVERITY_LEVELS.map((level) => (
                <div
                  key={level.range}
                  className="flex items-center space-x-2 p-2 rounded"
                  style={{ backgroundColor: level.color }}
                >
                  <span className="text-sm font-medium">{level.label}</span>
                  <span className="text-sm text-gray-600">({level.range})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticMapsPage;