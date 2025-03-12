import React, { useRef } from "react";
import { getIndex } from "../utils/drought_levels";
import { FiDownload, FiMoreVertical, FiInfo } from "react-icons/fi";
import { useSideberStore } from "../store/useSideberStore";
import TimeSeriesChart from "../components/TimeSeriesChart";
import DashboardSlider from "../components/ui/DashboardSlider";
import html2canvas from "html2canvas";
import LegendData from "../components/ui/LegendData";
import { Menu } from "@headlessui/react";
import dynamic from "next/dynamic";

const UgandaMap = dynamic(() => import("../components/map/UgandaMap"), {
  loading: () => <p>Loading Map...</p>,
  ssr: false,
});

const MapView = () => {
  const { indicator, timerange, month, district, filterBylegend, setDistrict } =
    useSideberStore((state) => state);

  const chartContainerRef = useRef(null);
  const mapRef = useRef(null);

  const handleDownloadMap = () => {
    if (mapRef.current) {
      html2canvas(mapRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "map.png";
        link.click();
      });
    }
  };

  const handleDownloadChartPNG = () => {
    if (chartContainerRef.current) {
      html2canvas(chartContainerRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "time_series.png";
        link.click();
      });
    }
  };

  const handleDownloadChartCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,Date,Value\n2023-01,100\n2023-02,120";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "chart_data.csv";
    link.click();
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full p-6 space-y-6">
      {/* Indicator Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {getIndex(indicator)}
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-auto mb-4">
        {/* Map Section */}
        <div ref={mapRef} className="relative w-full bg-white rounded-sm shadow-lg p-4">
          <div className="absolute top-4 right-4 z-[1000]">
            <button
              className="p-2 bg-white border hover:bg-gray-100 rounded-2xl transition-colors shadow-lg"
              onClick={handleDownloadMap}
            >
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>

          <UgandaMap
            indicator={indicator}
            timerange={timerange}
            month={month}
            district={district}
            zoom={7.4}
            minZoom={7.4}
            setDistrict={setDistrict}
          />
        </div>

        
        <div ref={chartContainerRef} className="relative w-full bg-white rounded-sm shadow-md p-4 flex flex-col">
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-lg font-semibold text-gray-800 text-center flex-grow truncate">
              {district ? district : "Select a District"}
            </h2>
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <FiMoreVertical size={24} />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDownloadChartPNG}
                      className={`w-full text-left px-1 text-sm ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      📸 Download PNG
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDownloadChartCSV}
                      className={`w-full text-left px-1 text-sm ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      📊 Download CSV
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          {/* Time Series Chart */}
          <div className="flex-1 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <TimeSeriesChart
              indicator={indicator}
              timerange={timerange}
              month={month}
              district={district}
              chart_id={"Dasboard_time_series"}
              filterBylegend={filterBylegend}
            />
          </div>

          {/* Legend */}
          <div className="pt-4">
            <LegendData />
          </div>

          
          <div className="mt-2 text-center">
            <div className="flex items-center justify-center mt-1 text-gray-600 text-sm">
              <FiInfo size={16} className="mr-1" />
              <span className="font-light italic text-sm">
                Click the legend to filter with severity.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Selector Slider */}
      <div className="relative z-50 lg:z-10 mt-8">
        <DashboardSlider />
      </div>
    </div>
  );
};

export default MapView;
