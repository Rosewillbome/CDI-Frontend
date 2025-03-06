import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import leafletImage from "leaflet-image";
import { DROUGHT_SEVERITY_LEVELS, getIndex } from "../utils/drought_levels";
import { FiDownload, FiInfo } from "react-icons/fi";
import { useSideberStore } from "../store/useSideberStore";
import TimeSeriesChart from "../components/TimeSeriesChart";
import DashboardSlider from "../components/ui/DashboardSlider";
import KeyNote from "../components/ui/KeyNote";
import UgandaMap from "../components/map/UgandaMap";
// Define available years and months (the slider will cover 2001-2025)

const MapView = () => {
  // Set default to June 2024 and default raster type to "PDI"
  let { indicator, timerange, month, district } = useSideberStore(
    (state) => state
  );

  // Refs to store the map container and Leaflet instances

  // Handler for downloading the map as an image
  const handleDownloadMap = () => {
    // if (!mapInstance.current) return;

    // // Use leaflet-image to capture the map as a canvas
    // leafletImage(mapInstance.current, (err, canvas) => {
    //   if (err) {
    //     console.error("Error capturing map:", err);
    //     return;
    //   }

    //   // Convert the canvas to a data URL
    //   const image = canvas.toDataURL("image/png");

    //   // Create a temporary link element to trigger the download
    //   const link = document.createElement("a");
    //   link.href = image;
    //   link.download = `map_${selectedRasterType}_${months[selectedMonth]}_${selectedYear}.png`;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // });
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* Combined Drought Index (CDI) */}
            {getIndex(indicator)}
          </h1>
        </div>
        {/* <h2 className="text-xl text-gray-600 font-medium">
          {selectedDistrict || ""}
        </h2> */}
      </div>

      {/* Main Content Container */}
      <div className="flex h-[60vh] mb-4 gap-6">
        {/* Map Section */}
        <div className="w-[40%] bg-white rounded-xl shadow-lg p-4 relative">
          {/* Legend at the bottom-right corner */}
          <div className="absolute bottom-4 right-4 z-[1000] bg-white shadow-lg p-2 text-sm rounded-lg">
            <h3 className="font-semibold mb-2">Legend</h3>
            <div className="space-y-1">
              {DROUGHT_SEVERITY_LEVELS.map((level) => (
                <div
                  key={level.range}
                  className="flex items-center space-x-2 p-1"
                  style={{ backgroundColor: level.color }}
                >
                  <span className="text-xs">{level.label}</span>
                  <span className="text-[10px] text-gray-600">
                    ({level.range})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button at the bottom-left corner */}
          <div className="absolute bottom-4 left-4 z-[1000]">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors tooltip"
              data-tooltip="Download Map"
              onClick={handleDownloadMap}
            >
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>

          {/* Leaflet map container */}
          <UgandaMap indicator={indicator} timerange={timerange} month={month} district={district} zoom={6.2} minZoom={6.2} />
        </div>

        {/* Chart Section */}
        <div className="w-[65%] bg-white rounded-xl shadow-lg p-4 relative">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors tooltip"
              data-tooltip="Download Chart"
            >
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            {/* <span className="text-gray-400 font-medium">Time series</span> */}
            <TimeSeriesChart
              indicator={indicator}
              timerange={timerange}
              month={month}
              district={district}
              chart_id={"Dasboard_time_series"}
            />
          </div>
        </div>
      </div>

      {/* Time Selector Section */}

      <DashboardSlider />

      {/* Key Note Section */}
      <KeyNote />
    </div>
  );
};

export default MapView;
