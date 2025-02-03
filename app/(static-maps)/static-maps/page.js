'use client'
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { DROUGHT_SEVERITY_LEVELS } from '../../utils/drought_levels';

function Page() {
    const [selectedIndicator, setSelectedIndicator] = useState('CDI');
    const [yearRange, setYearRange] = useState({ start: 2001, end: new Date().getFullYear() });
    const [selectedYear, setSelectedYear] = useState(2001);
    const [selectedMonth, setSelectedMonth] = useState('January');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from(
        { length: yearRange.end - yearRange.start + 1 },
        (_, i) => yearRange.start + i
    );

    const handleDownloadMap = (year, month) => {
        console.log(`Downloading map for ${month} ${year}`);
    };

    const handleYearRangeChange = (e) => {
        const { name, value } = e.target;
        setYearRange(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#4A8BD0] text-center w-full">{selectedIndicator} Maps</h1>
                    <div className="flex space-x-4">
                        <select
                            value={selectedIndicator}
                            onChange={(e) => setSelectedIndicator(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
                        >
                            <option value="CDI">CDI</option>
                            <option value="NDVI">NDVI Anomaly</option>
                            <option value="Rainfall">Rainfall</option>
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

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Filter Year Range</h2>
                    <div className="flex space-x-4">
                        <select
                            name="start"
                            value={yearRange.start}
                            onChange={handleYearRangeChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
                        >
                            {Array.from({ length: new Date().getFullYear() - 2001 + 1 }, (_, i) => 2001 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            name="end"
                            value={yearRange.end}
                            onChange={handleYearRangeChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
                        >
                            {Array.from({ length: new Date().getFullYear() - 2001 + 1 }, (_, i) => 2001 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Add scrolling for more years */}
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {years.map((year) => (
                            <div key={year} className="space-y-8">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-4 bg-[#4A8BD0] text-white">
                                        <h3 className="text-lg font-semibold">{year}</h3>
                                    </div>
                                    <div className="p-4">
                                        {/* Show all 12 months */}
                                        {months.map((month) => (
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
                                                <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[200px]">
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
                </div>
            </div>
        </div>
    );
}

export default Page;
