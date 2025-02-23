"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Info, Download, Calendar, Filter, ArrowUpRight } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const UgandaMap = ({ district }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // Initialize the Leaflet map (runs only once after mounting)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return; // Ensure map is not already initialized

    // Define base layers
    const baseMaps = {
      OpenStreetMap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
        }
      ),
      OpenTopoMap: L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenTopoMap contributors",
        }
      ),
      "Esri World Imagery": L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "© Esri" }
      ),
    };

    // Create the map instance, setting the initial base layer
    mapInstance.current = L.map(mapRef.current, {
      center: [1.3733, 32.2903], // Center on Uganda
      zoom: 7, // Adjust zoom level to focus on Uganda
      layers: [baseMaps["OpenStreetMap"]], // Default base layer
    });

    // Add a world layer with de-emphasized style
    const worldLayer = L.tileLayer.wms("http://188.166.39.65:8080/geoserver/wms", {
      layers: "cdi:world", // Assuming you have a world layer in your GeoServer
      format: "image/png",
      transparent: true,
      opacity: 0.3, // Reduce opacity to de-emphasize
      attribution: "GeoServer",
    }).addTo(mapInstance.current);
  }, []); // Run only once on mount

  return (
    <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 mb-6">
      <div
        ref={mapRef}
        className="w-full h-full rounded-xl"
      />
    </div>
  );
};

const TimeSeriesChart = ({ district, onFullView }) => {
  return (
    <div className="mb-6 relative">
      <h3 className="text-lg font-semibold mb-4">Time Series Analysis</h3>
      <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
        Time Series Chart for {district}
      </div>
      <button
        onClick={onFullView}
        className="absolute top-2 right-2 px-3 py-1.5 bg-[#308DE0] text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1 shadow-md"
      >
        Full View <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

const TDIChart = ({ district, onFullView }) => {
  return (
    <div className="mb-6 relative">
      <h3 className="text-lg font-semibold mb-4">
        Temperature Drought Index (TDI)
      </h3>
      <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
        TDI Analysis for {district}
      </div>
      <button
        onClick={onFullView}
        className="absolute top-2 right-2 px-3 py-1.5 bg-[#308DE0] text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1 shadow-md"
      >
        Full View <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

const PDIChart = ({ district, onFullView }) => {
  return (
    <div className="mb-6 relative">
      <h3 className="text-lg font-semibold mb-4">
        Precipitation Drought Index (TDI)
      </h3>
      <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
        PDI Analysis for {district}
      </div>
      <button
        onClick={onFullView}
        className="absolute top-2 right-2 px-3 py-1.5 bg-[#308DE0] text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1 shadow-md"
      >
        Full View <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

const FullScreenView = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center">
      <div className="bg-white w-11/12 lg:w-3/4 h-5/6 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 flex justify-between items-center bg-[#308DE0] text-white">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      {fullViewContent && (
        <FullScreenView title="Full View" onClose={handleFullViewClose}>
          {fullViewContent}
        </FullScreenView>
      )}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg r font-semibold text-[#308DE0]">
            Compare this District with another
          </h2>
          <Info size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
          </select>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
          >
            <option value="All">All</option>
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
        <PDIChart
          district={district}
          onFullView={() =>
            setFullViewContent(
              <div className="h-full flex items-center justify-center bg-gray-100">
                Full Screen PDI Chart for {district}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedIndicator, setSelectedIndicator] = useState(
    "Combined Drought Index (CDI)"
  );
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [leftDistrict, setLeftDistrict] = useState("Acholi District");
  const [rightDistrict, setRightDistrict] = useState("Tamawambo District");

  const handleDownloadAllPdf = () => {
    console.log("Downloading all maps as PDF");
  };

  const handleMapDownload = (district) => {
    console.log(`Downloading map for ${district}`);
  };

  const handleClearFilters = () => {
    setSelectedIndicator("Combined Drought Index (CDI)");
    setSelectedYear("2025");
    setSelectedMonth("January");
    setLeftDistrict("Acholi District");
    setRightDistrict("Tamawambo District");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Border */}
      <div className="border-t-2 border-[#308DE0]"></div>

      <div className="p-8">
        {/* Control Panel */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex justify-center w-full">
              <h1 className="text-3xl font-bold text-black text-center">
                {selectedIndicator}
              </h1>
            </div>
          </div>

          <div className=" p-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleDownloadAllPdf}
                className="px-4 py-2 bg-[#308DE0] text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors ml-auto"
              >
                <Download size={18} />
                Download Comparison
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-[#e03030]">
            Comparing: {leftDistrict} vs {rightDistrict}
          </h2>
        </div>

        {/* Comparison Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
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