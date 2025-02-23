'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { DROUGHT_SEVERITY_LEVELS } from '../../utils/drought_levels';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Page() {
    const [selectedIndicator, setSelectedIndicator] = useState('CDI');
    const currentYear = new Date().getFullYear();
    const [yearRange, setYearRange] = useState({ start: currentYear - 4, end: currentYear }); // Default: Last 5 years
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState('January');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate years array and sort it based on the year range
    const years = Array.from(
        { length: Math.abs(yearRange.end - yearRange.start) + 1 },
        (_, i) => (yearRange.start < yearRange.end ? yearRange.start + i : yearRange.start - i)
    );

    const handleDownloadMap = (year, month) => {
        console.log(`Downloading map for ${month} ${year}`);
    };

    const handleDownloadAllMaps = () => {
        console.log('Downloading all maps');
        // Implement the logic to download all maps
    };

    const handleYearRangeChange = (e) => {
        const { name, value } = e.target;
        setYearRange(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    const isSingleYear = yearRange.start === yearRange.end;
    const isMoreThanFiveYears = years.length > 5;
    const isLessThanFiveYears = years.length < 5 && !isSingleYear; // Exclude single year case
    const isValidYearRange = !isMoreThanFiveYears && !isLessThanFiveYears;

    // Function to initialize a Leaflet map
    const initializeMap = (containerId) => {
        const map = L.map(containerId, {
            center: [1.3733, 32.2903], // Center on Uganda
            zoom: 5.4,
        });

        // Add base map layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        return map;
    };

    // Use a ref to store map instances
    const mapRefs = useRef({});

    // Initialize maps for each preview section
    useEffect(() => {
        if (isValidYearRange) {
            years.forEach((year) => {
                months.forEach((month) => {
                    const containerId = `map-${year}-${month}`;
                    if (!mapRefs.current[containerId]) {
                        mapRefs.current[containerId] = initializeMap(containerId);
                    }
                });
            });
        }

        // Cleanup function to remove maps when component unmounts or year range becomes invalid
        return () => {
            Object.values(mapRefs.current).forEach((map) => {
                if (map) map.remove();
            });
            mapRefs.current = {}; // Reset the map refs
        };
    }, [years, months, isValidYearRange]); // Only re-run if years, months, or isValidYearRange changes

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
                            onClick={handleDownloadAllMaps}
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
                            {Array.from({ length: currentYear - 2001 + 1 }, (_, i) => 2001 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            name="end"
                            value={yearRange.end}
                            onChange={handleYearRangeChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
                        >
                            {Array.from({ length: currentYear - 2001 + 1 }, (_, i) => 2001 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {isMoreThanFiveYears ? (
                    <div className="text-center py-8">
                        <p className="text-lg font-semibold mb-4">You have selected more than five years. Please download all maps.</p>
                        <button
                            onClick={handleDownloadAllMaps}
                            className="flex items-center space-x-2 bg-[#4A8BD0] text-white px-4 py-2 rounded-md hover:bg-[#3870a8] transition-colors mx-auto"
                        >
                            <Download className="h-5 w-5" />
                            <span>Download All Maps</span>
                        </button>
                    </div>
                ) : isLessThanFiveYears ? (
                    <div className="text-center py-8">
                        <p className="text-lg font-semibold mb-4">You have selected less than five years. Please select a 5-year range or download all maps.</p>
                        <button
                            onClick={handleDownloadAllMaps}
                            className="flex items-center space-x-2 bg-[#4A8BD0] text-white px-4 py-2 rounded-md hover:bg-[#3870a8] transition-colors mx-auto"
                        >
                            <Download className="h-5 w-5" />
                            <span>Download All Maps</span>
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className={isSingleYear ? 'w-full' : 'grid grid-cols-5 gap-4'}>
                            {years.map((year) => (
                                <div key={year} className={isSingleYear ? 'w-full' : 'space-y-8'}>
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-4 bg-[#4A8BD0] text-white">
                                            <h3 className="text-lg font-semibold">{year}</h3>
                                        </div>
                                        <div className={`p-4 ${isSingleYear ? 'grid grid-cols-6 gap-6' : 'flex flex-col space-y-4'}`}>
                                            {months.map((month) => (
                                                <div key={`${year}-${month}`} className={isSingleYear ? 'col-span-1' : 'w-full'}>
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
                                                        {/* Map container */}
                                                        <div
                                                            id={`map-${year}-${month}`}
                                                            className="absolute inset-0 rounded-lg"
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;