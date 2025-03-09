import React, { useRef } from "react";
import { getIndex } from "../utils/drought_levels";
import { FiDownload, FiInfo } from "react-icons/fi";
import { useSideberStore } from "../store/useSideberStore";
import TimeSeriesChart from "../components/TimeSeriesChart";
import DashboardSlider from "../components/ui/DashboardSlider";
// import UgandaMap from "../components/map/UgandaMap";
import html2canvas from "html2canvas"; // Import html2canvas for capturing the chart as an image
import LegendData from "../components/ui/LegendData";
import dynamic from "next/dynamic";
const UgandaMap = dynamic(() => import("../components/map/UgandaMap"), {
  loading: () => <p>Loading Map...</p>,
  ssr: false,
});

const MapView = () => {
  let { indicator, timerange, month, district, filterBylegend } =
    useSideberStore((state) => state);

  const chartRef = useRef(null); // Ref to capture the chart element

  const handleDownloadMap = () => {
    // Your download logic here
  };

  const handleDownloadChart = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "chart.png";
        link.click();
      });
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {getIndex(indicator)}
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex h-[70vh] mb-4 gap-6">
        {/* Map Section */}
        <div className="w-[55%] bg-white rounded-xl shadow-lg p-4 relative">
          {/* Download Button at the bottom-left corner */}
          <div className="absolute bottom-4 left-4 z-[1000]">
            <button
              className="p-2 bg-white border   hover:bg-gray-100 rounded-2xl transition-colors tooltip"
              data-tooltip="Download Map"
              onClick={handleDownloadMap}
            >
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>

          {/* Leaflet map container */}
          <UgandaMap
            indicator={indicator}
            timerange={timerange}
            month={month}
            district={district}
            zoom={6.9}
            minZoom={6.9}
          />
        </div>

        {/* Chart Section */}
        <div className="w-[45%] relative flex flex-col items-center">
          {/* District Name Title */}
          <div className="text-lg font-semibold text-gray-800 leading-tight pb-1">
            {district ? district : "Select a District"}
          </div>

          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <div ref={chartRef}>
              <TimeSeriesChart
                indicator={indicator}
                timerange={timerange}
                month={month}
                district={district}
                chart_id={"Dasboard_time_series"}
                filterBylegend={filterBylegend}
              />
            </div>
          </div>

          {/* Download Button at the bottom-left corner */}
          <div className="absolute bottom-4 left-4 z-[1000]">
            <button
              className="p-2 bg-white border hover:bg-gray-100 rounded-2xl transition-colors tooltip"
              data-tooltip="Download Chart"
              onClick={handleDownloadChart}
            >
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Time Selector Section */}
      <DashboardSlider />

      {/* Key Note Section  */}
      <LegendData />
    </div>
  );
};

export default MapView;
