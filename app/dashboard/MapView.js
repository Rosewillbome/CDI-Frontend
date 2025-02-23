import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import leafletImage from "leaflet-image";
import { DROUGHT_SEVERITY_LEVELS, getIndex } from "../utils/drought_levels";
import { FiDownload, FiInfo } from "react-icons/fi";
import { useSideberStore } from "../store/useSideberStore";

// Define available years and months (the slider will cover 2001-2025)
const years = Array.from({ length: 25 }, (_, i) => 2001 + i);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MapView = () => {
  // Set default to June 2024 and default raster type to "PDI"
  let { indicator, timerange, month, district } = useSideberStore(
    (state) => state
  );
  const [selectedYear, setSelectedYear] = useState(timerange);
  const [selectedMonth, setSelectedMonth] = useState(month); // 0-indexed (5 = June)
  const [selectedDistrict, setSelectedDistrict] = useState(district);
  const [selectedRasterType, setSelectedRasterType] = useState(indicator);

  // Refs to store the map container and Leaflet instances
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const rasterLayerRef = useRef(null);
  const districtLayerRef = useRef(null);
  const layerControlRef = useRef(null);
  const baseMapsRef = useRef(null);

  // Global GeoServer URL (update as needed)
  const geoServerUrl = "http://188.166.39.65:8080/geoserver/wms";

  // Initialize the Leaflet map (runs only once after mounting)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return; // Ensure map is not already initialized

    // Define base layers
    baseMapsRef.current = {
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
      layers: [baseMapsRef.current["OpenStreetMap"]],
    });

    // Create the Districts layer (always visible) using the workspace "cdi"
    districtLayerRef.current = L.tileLayer
      .wms(geoServerUrl, {
        layers: "cdi:ugandadistrict",
        format: "image/png",
        transparent: true,
        attribution: "GeoServer",
      })
      .addTo(mapInstance.current);
    districtLayerRef.current.bringToFront();

    // Create the initial raster layer based on default selections
    const monthLower = selectedMonth.toLowerCase();
    const initialWmsLayerName =
      "cdi:Raw_" + indicator + "_" + month + "_" + timerange;
    rasterLayerRef.current = L.tileLayer
      .wms(geoServerUrl, {
        layers: initialWmsLayerName,
        format: "image/png",
        transparent: true,
        opacity: 1.0,
        attribution: "GeoServer",
      })
      .addTo(mapInstance.current);

    // Build the initial overlay name (e.g., "PDI June 2024")
    const displayName = indicator + " " + month + " " + timerange;

    // Create the layer control including base layers and overlays (raster and districts)
    layerControlRef.current = L.control
      .layers(
        baseMapsRef.current,
        {
          [displayName]: rasterLayerRef.current,
          Districts: districtLayerRef.current,
        },
        { collapsed: false }
      )
      .addTo(mapInstance.current);

    // Add a world layer with de-emphasized style
    const worldLayer = L.tileLayer.wms(geoServerUrl, {
      layers: "cdi:world", // Assuming you have a world layer in your GeoServer
      format: "image/png",
      transparent: true,
      opacity: 0.3, // Reduce opacity to de-emphasize
      attribution: "GeoServer",
    }).addTo(mapInstance.current);
  }, []); // Run only once on mount

  // Update the raster layer (and layer control) whenever time or raster type changes.
  useEffect(() => {
    if (!mapInstance.current) return; // Wait until map is ready

    // Remove the old raster layer if it exists
    if (rasterLayerRef.current) {
      mapInstance.current.removeLayer(rasterLayerRef.current);
    }

    // Construct the new WMS layer name and display name
    const monthLower = selectedMonth.toLowerCase();
    const newWmsLayerName =
      "cdi:Raw_" + indicator + "_" + month + "_" + timerange;
    const newDisplayName = indicator + " " + month + " " + timerange;

    // Create and add the updated raster layer
    rasterLayerRef.current = L.tileLayer
      .wms(geoServerUrl, {
        layers: newWmsLayerName,
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        attribution: "GeoServer",
      })
      .addTo(mapInstance.current);

    // Make sure the district layer stays on top
    if (districtLayerRef.current) {
      districtLayerRef.current.bringToFront();
    }

    // Remove and recreate the layer control with the new overlay name
    if (layerControlRef.current) {
      mapInstance.current.removeControl(layerControlRef.current);
    }
    layerControlRef.current = L.control
      .layers(
        baseMapsRef.current,
        {
          [newDisplayName]: rasterLayerRef.current,
          Districts: districtLayerRef.current,
        },
        { collapsed: false }
      )
      .addTo(mapInstance.current);
  }, [timerange, month, indicator]);

  // Handler for the slider (time selector)
  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    // Calculate year and month from the slider value (assuming slider value 0 corresponds to January 2001)
    const year = 2001 + Math.floor(value / 12);
    const month = value % 12;
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  // Handler for downloading the map as an image
  const handleDownloadMap = () => {
    if (!mapInstance.current) return;

    // Use leaflet-image to capture the map as a canvas
    leafletImage(mapInstance.current, (err, canvas) => {
      if (err) {
        console.error("Error capturing map:", err);
        return;
      }

      // Convert the canvas to a data URL
      const image = canvas.toDataURL("image/png");

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = image;
      link.download = `map_${selectedRasterType}_${months[selectedMonth]}_${selectedYear}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* Combined Drought Index (CDI) */}
           { getIndex(indicator)}
          </h1>
        </div>
        <h2 className="text-xl text-gray-600 font-medium">
          {selectedDistrict || ""}
        </h2>
      </div>

      {/* Main Content Container */}
      <div className="flex h-[60vh] mb-4 gap-6">
        {/* Map Section */}
        <div className="w-[60%] bg-white rounded-xl shadow-lg p-4 relative">
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
          <div
            ref={mapRef}
            id="leaflet-map"
            className="h-full w-full rounded-lg"
          />
        </div>

        {/* Chart Section */}
        <div className="w-[40%] bg-white rounded-xl shadow-lg p-4 relative">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors tooltip"
              data-tooltip="Download Chart"
            >
              <FiDownload className="text-gray-600" size={20} />
            </button>
          </div>
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <span className="text-gray-400 font-medium">Time series</span>
          </div>
        </div>
      </div>

      {/* Time Selector Section */}
      <div className="">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            {months[selectedMonth]} {selectedYear}
          </h3>
          <span className="text-sm text-gray-500">
            {2001} - {2025}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={(2025 - 2001) * 12 + 11}
          step={1}
          value={(selectedYear - 2001) * 12 + selectedMonth}
          onChange={handleSliderChange}
          className="w-full range-slider"
        />
      </div>

      {/* Key Note Section */}
      <div className="w-[60%] bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>
              Real-time drought monitoring using FAO Combined Drought Index
              (CDI)
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>
              Integrated analysis of precipitation, soil moisture, and
              vegetation health
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>
              Supports Uganda's climate resilience and sustainable resource
              management.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapView;