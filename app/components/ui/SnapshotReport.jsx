'use client'
import React, { useRef } from "react";
import SnapshotTable from "../SnapshotTable";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

function SnapshotReport() {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    // Sample data - replace with actual data Wekesa mwalimu 
    const severeDistrictsCount = 5;
    const extendedSevereDistrictsCount = 3;
    const recoveringDistrictsCount = 2;
    const currentMonthYear = "FEBRUARY, 2025";
    const previousMonthYear = "JANUARY, 2025";
    
    // Sample table data - replace with real data
    const severeDistrictsData = [
        { district: "Kotido", currentCDI: 0.85, previousCDI: 0.82, deviation: "+0.15", classification: "Extreme" },
        { district: "Kaabong", currentCDI: 0.78, previousCDI: 0.75, deviation: "+0.12", classification: "Severe" }
    ];
    
    const extendedDistrictsData = [
        { district: "Moroto", currentCDI: 0.82, previousCDI: 0.80, deviation: "+0.18", classification: "Extreme" }
    ];
    
    const recoveringDistrictsData = [
        { district: "Nakasongola", currentCDI: 0.45, previousCDI: 0.60, deviation: "-0.05", classification: "Moderate" }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Download button */}
            <div className="flex justify-end p-4 sticky top-0 bg-gray-50 z-10 shadow-sm">
                <button 
                    onClick={() => reactToPrintFn()} 
                    className="bg-[#308DE0] px-6 py-3 text-white rounded-md hover:text-[#308DE0] hover:bg-white transition-all duration-300 cursor-pointer font-medium shadow-md"
                >
                    Download Report
                </button>
            </div>

            {/* Report content */}
            <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg" ref={contentRef}>
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b pb-6">
                    <div>
                        <Image
                            src="/fao.png"
                            alt="FAO Logo"
                            width={200}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold text-gray-800">UGANDA NATIONAL DROUGHT MONITORING TOOL REPORT</h1>
                        <h2 className="text-lg font-semibold text-gray-600">{currentMonthYear}</h2>
                    </div>
                </div>

                {/* Overview section */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">DROUGHT BULLETIN</h2>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Overview</h3>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700">
                            The drought continues to affect various districts in Uganda. A total of <span className="font-bold text-red-600">{severeDistrictsCount}</span> districts have locations that are classified under Severe and Extreme Drought conditions and may require immediate humanitarian assistance in the coming days or month.
                        </p>
                    </div>

                    {/* CDI Map container */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-8">
                        <div className="bg-gray-100 px-4 py-2 border-b">
                            <h4 className="font-bold text-gray-700">CDI Extreme/Severe Overview Map</h4>
                        </div>
                        <div className="p-4 flex justify-center bg-gray-50">
                            {/* Replace with actual Image component */}
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                                [CDI Map Visualization]
                            </div>
                        </div>
                    </div>

                    {/* Severe districts table */}
                    <div className="mb-8">
                        <h4 className="font-medium text-gray-700 mb-2">These districts are:</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <SnapshotTable 
                                currentData={severeDistrictsData} 
                                headers={[
                                    "District", 
                                    `${currentMonthYear} CDI`, 
                                    `${previousMonthYear} CDI`, 
                                    "Deviation from Long Term Mean", 
                                    "Current Drought Classification"
                                ]}
                            />
                        </div>
                    </div>

                    {/* Extended severe districts */}
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700">
                            Additionally, <span className="font-bold text-orange-600">{extendedSevereDistrictsCount}</span> districts have experienced severe and extreme drought conditions for an extended period.
                        </p>
                    </div>
                    
                    <div className="mb-8">
                        <h4 className="font-medium text-gray-700 mb-2">These districts are:</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <SnapshotTable 
                                currentData={extendedDistrictsData} 
                                headers={[
                                    "District", 
                                    `${currentMonthYear} CDI`, 
                                    `${previousMonthYear} CDI`, 
                                    "Deviation from Long Term Mean", 
                                    "Current Drought Classification"
                                ]}
                            />
                        </div>
                    </div>

                    {/* Recovering districts */}
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700">
                            Finally, <span className="font-bold text-green-600">{recoveringDistrictsCount}</span> districts are showing signs of recovery. Ongoing interventions should be maintained or expanded to ensure full restoration of livelihoods.
                        </p>
                    </div>
                    
                    <div className="mb-8">
                        <h4 className="font-medium text-gray-700 mb-2">These districts are:</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <SnapshotTable 
                                currentData={recoveringDistrictsData} 
                                headers={[
                                    "District", 
                                    `${currentMonthYear} CDI`, 
                                    `${previousMonthYear} CDI`, 
                                    "Deviation from Long Term Mean", 
                                    "Current Drought Classification"
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Combined Drought Index section */}
                <div className="page-break" style={{ pageBreakBefore: 'always' }}></div>
                <section className="mb-10">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Combined Drought Index {currentMonthYear}</h3>
                    <p className="text-gray-600 mb-4">Consider the map below that details the drought conditions across the different districts in Uganda for {currentMonthYear}</p>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 flex justify-center bg-gray-50">
                            {/* Replace  */}
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                                [Combined Drought Index Map]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rainfall Performance section */}
                <div className="page-break" style={{ pageBreakBefore: 'always' }}></div>
                <section className="mb-10">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Rainfall Performance {currentMonthYear}</h3>
                    <p className="text-gray-600 mb-4">This data is derived from Modified CHIRPS dataset received for {currentMonthYear}.</p>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 flex justify-center bg-gray-50">
                            {/* Replace */}
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                                [Rainfall Performance Map]
                            </div>
                        </div>
                    </div>
                </section>

                {/* NDVI Anomaly Performance section */}
                <div className="page-break" style={{ pageBreakBefore: 'always' }}></div>
                <section className="mb-10">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">NDVI Anomaly Performance</h3>
                    <p className="text-gray-600 mb-4">During this period the vegetation greenness across the districts is shown below. The data is derived from Modified MODIS data.</p>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 flex justify-center bg-gray-50">
                            {/* Replace with Map David */}
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                                [NDVI Anomaly Map]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <section className="mt-8 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                        <strong className="font-semibold">NB</strong>: This is an automated report generated using the combined drought index approach. For further information on the methodology, <a href="#" className="text-blue-600 hover:underline">download the technical documentation</a>.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">For more information contact us:</h4>
                        <ul className="space-y-1 text-gray-600">
                            <li><strong>Name:</strong> Drought Monitoring Team</li>
                            <li><strong>Email:</strong> drought-info@uganda.gov</li>
                            <li><strong>Telephone:</strong> +256 XXX XXX XXX</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SnapshotReport;