import React, { useRef, useState, useEffect } from "react";
import { getIndex } from "../utils/drought_levels";
import { FiDownload, FiMoreVertical, FiInfo } from "react-icons/fi"; // Import FiInfo
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
  const {
    indicator,
    timerange,
    month,
    district,
    filterBylegend,
    setDistrict,
    setTimerange,
  } = useSideberStore((state) => state);

  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const [hideElement, sethideElement] = useState(false);
  const chartContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (isMapLoaded && isChartLoaded) {
      setIsLoading(false);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isMapLoaded, isChartLoaded]);

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
    sethideElement(true);
    if (chartContainerRef.current) {
      html2canvas(chartContainerRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "time_series.png";
        link.click();
        sethideElement(false);
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
  const clearFilters = (e) => {
    e.preventDefault();
    setTimerange("");
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full p-6 space-y-6">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg font-semibold text-gray-900">
              Fetching Data, please wait...
            </p>
          </div>
        </div>
      )}

      {/* Indicator Title */}
      <div className="text-center mt-[-50px]">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {getIndex(indicator)}
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-auto mb-4">
        {/* Map Section */}
        <div ref={mapRef} className=" w-full bg-white rounded-sm shadow-lg p-4">
          {/* {!isLoading && (
            <div className="absolute top-4 right-4 z-[1000]">
              <button
                className="p-2 bg-white border hover:bg-gray-100 rounded-2xl transition-colors shadow-lg"
                onClick={handleDownloadMap}
              >
                <FiDownload className="text-blue-500" size={20} />
              </button>
            </div>
          )} */}

          <UgandaMap
            indicator={indicator}
            timerange={timerange}
            month={month}
            district={district}
            zoom={7.3}
            minZoom={7.3}
            setDistrict={setDistrict}
            onLoad={() => setIsMapLoaded(true)}
            imageCintainerId={"dash-img"}
            mapConatinerId={"dash-map"}
          />
        </div>

        {/* Chart Section */}
        <div
          ref={chartContainerRef}
          className="relative w-full bg-white rounded-sm shadow-md p-4 flex flex-col"
        >
          <div className="flex justify-between items-center pb-2">
            <div className="flex justify-center items-center space-x-2 flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 truncate ">
                {district ? district : "Select a District"}
              </h2>
              <div
                className={`group relative ${
                  hideElement ? `hide-element` : ""
                }`}
              >
                <FiInfo className="text-blue-500 cursor-pointer" size={18} />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <button
                    onClick={(e) => clearFilters(e)}
                    className="bg-blue-500 p-1 rounded-xl mr-1"
                  >
                    Clear Filters
                  </button>
                  to view a range of years in the time series.
                </div>
              </div>
            </div>
            {/* <Menu
              as="div"
              className={`relative ${hideElement ? `hide-element` : ""}`}
            >
              <Menu.Button className="p-2 rounded-lg text-blue-500 hover:bg-gray-100">
                <FiDownload size={24} />
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
            </Menu> */}
          </div>

          {/* Time Series Chart */}
          <div
            className={`flex-1 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full `}
          >
            <TimeSeriesChart
              indicator={indicator}
              timerange={timerange}
              month={month}
              district={district}
              chart_id={"Dasboard_time_series"}
              filterBylegend={filterBylegend}
              onLoad={() => setIsChartLoaded(true)}
            />
          </div>

          {/* Legend */}
          <div className="pt-4 w-full">
            <LegendData />
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
