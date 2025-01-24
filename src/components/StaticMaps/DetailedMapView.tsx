import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { DroughtIndicator, DROUGHT_SEVERITY_LEVELS } from '../../types/drought';
import { useDroughtData } from '../../hooks/useDroughtData';

const DetailedMapView: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<DroughtIndicator>('CDI');
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  const { data, loading, error } = useDroughtData({
    indicator: selectedIndicator,
    year: selectedYear,
    month: selectedMonth,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Detailed Map View</h2>
          <p className="text-sm text-gray-600">
            Comprehensive view of drought conditions across Uganda
          </p>
        </div>
        <Download className="h-5 w-5 text-[#4A8BD0] cursor-pointer" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded">
              {loading ? (
                <div className="flex items-center justify-center">Loading...</div>
              ) : error ? (
                <div className="flex items-center justify-center text-red-500">
                  Error loading detailed map
                </div>
              ) : (
                <div className="flex items-center justify-center text-gray-400">
                  Detailed Map View
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium mb-3">Indicators</h3>
            <div className="space-y-2">
              {['CDI', 'PDI', 'TDI'].map((indicator) => (
                <button
                  key={indicator}
                  className={`w-full text-left px-3 py-2 rounded ${
                    selectedIndicator === indicator
                      ? 'bg-[#4A8BD0] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedIndicator(indicator as DroughtIndicator)}
                >
                  {indicator}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium mb-3">Severity Type</h3>
            <div className="space-y-2">
              {DROUGHT_SEVERITY_LEVELS.map((level) => (
                <div
                  key={level.range}
                  className="flex items-center space-x-2 p-2 rounded"
                  style={{ backgroundColor: level.color }}
                >
                  <span className="text-sm">{level.label}</span>
                  <span className="text-xs text-gray-600">({level.range})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMapView;