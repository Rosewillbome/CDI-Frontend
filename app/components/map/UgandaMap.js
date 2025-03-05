// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import axios from "axios";

// const UgandaMap = ({ indicator, timerange, month, district }) => {
//   const [geoData, setGeoData] = useState([]);
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null); // Prevent multiple initializations

//   const rasterLayerRef = useRef(null);
//   const districtLayerRef = useRef(null);
//   const layerControlRef = useRef(null);
//     const baseMapsRef = useRef(null);

//   useEffect(() => {
//     const fetchBasemap = async () => {
//       await axios
//         .get("/api/geojson")
//         .then((response) => {
//           setGeoData(JSON.parse(response?.data?.geojsondata));
//         })
//         .catch((error) => {});
//     };
//     fetchBasemap();
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined" && geoData?.length !== 0) {
//       // Only initialize the map if it hasn't been initialized
//       console.log("loaded map");
//       mapRef.current = L.map(mapContainerRef.current, {
//         center: [1.3733, 32.2903],
//         zoom: 7.2,
//         minZoom: 7.2,
//         // maxZoom: 0,
//         layers: [
//           L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
//         ],
//       });

//       L.geoJSON(geoData, {
//         style: {
//           color: "black",
//           weight: 1,
//           // opacity: 0.3,
//           fill: false,
//           // stroke: false,
//         },
//       }).addTo(mapRef.current);
//     }

//     return () => {
//       // Cleanup when component unmounts
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [geoData]);

//   // Update the raster layer (and layer control) whenever time or raster type changes.
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const geoServerUrl = `${process.env.REACT_APP_GEOSERVER_URL}`;
//       if (!mapRef.current) return; // Wait until map is ready

//       // Remove the old raster layer if it exists
//       if (rasterLayerRef.current) {
//         mapRef.current.removeLayer(rasterLayerRef.current);
//       }

//       // Construct the new WMS layer name and display name
//       const monthLower = selectedMonth.toLowerCase();
//       const newWmsLayerName =
//         "cdi:Raw_" + indicator + "_" + month + "_" + timerange;
//       const newDisplayName = indicator + " " + month + " " + timerange;

//       // Create and add the updated raster layer
//       rasterLayerRef.current = L.tileLayer
//         .wms(geoServerUrl, {
//           layers: newWmsLayerName,
//           format: "image/png",
//           transparent: true,
//           opacity: 0.7,
//           attribution: "GeoServer",
//         })
//         .addTo(mapRef.current);

//       // Make sure the district layer stays on top
//       if (districtLayerRef.current) {
//         districtLayerRef.current.bringToFront();
//       }

//       // Remove and recreate the layer control with the new overlay name
//       if (layerControlRef.current) {
//         mapRef.current.removeControl(layerControlRef.current);
//       }
//       layerControlRef.current = L.control
//         .layers(
//           baseMapsRef.current,
//           {
//             [newDisplayName]: rasterLayerRef.current,
//             Districts: districtLayerRef.current,
//           },
//           { collapsed: false }
//         )
//         .addTo(mapRef.current);
//     }
//   }, [timerange, month, indicator]);

//   return (
//     <>
//       <div
//         ref={mapContainerRef}
//         style={{
//           position: "relative",
//           height: "100%",
//           width: "100%",
//           background: "#f0f0f0",
//         }}
//       />
//       ;
//     </>
//   );
// };

// export default UgandaMap;

"use client";
import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const UgandaMap = ({ indicator, timerange, month, district }) => {
  const [geoData, setGeoData] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const rasterLayerRef = useRef(null);
  const districtLayerRef = useRef(null);
  const layerControlRef = useRef(null);
  const baseMapsRef = useRef(null);

  const geoServerUrl = process.env.NEXT_PUBLIC_WSM;

  // Fetch GeoJSON data
  useEffect(() => {
    const fetchBasemap = async () => {
      try {
        const response = await axios.get("/api/geojson");
        setGeoData(JSON.parse(response?.data?.geojsondata));
      } catch (error) {
        console.error("Error fetching GeoJSON:", error);
      }
    };

    fetchBasemap();
  }, []);

  // Initialize the map when geoData is available
  useEffect(() => {
    if (typeof window === "undefined" || !geoData || mapRef.current) return;

    console.log("Initializing map...");
    mapRef.current = L.map(mapContainerRef.current, {
      center: [1.3733, 32.2903],
      zoom: 7.2,
      minZoom: 7.2,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      ],
    });

    // Add district boundaries
    L.geoJSON(geoData, {
      style: {
        color: "black",
        weight: 1,
        fill: false,
      },
    }).addTo(mapRef.current);

    return () => {
      // Cleanup on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [geoData]);

  // Update the raster layer when indicator, month, or timerange changes
  useEffect(() => {
    console.log("Updating raster layer...",`${indicator} ${month} ${timerange}`);
      if (typeof window === "undefined" || !mapRef.current) return;
   
    if (!geoServerUrl) {
      console.error("GeoServer URL is missing. Check your .env file.");
      return;
    }

    // Remove the previous raster layer
    if (rasterLayerRef.current) {
      mapRef.current.removeLayer(rasterLayerRef.current);
    }

    // Define new WMS layer
    const newWmsLayerName = `cdi:Raw_${indicator}_${month}_${timerange}`;
    console.log("newWmsLayerName", newWmsLayerName);
    const newDisplayName = `${indicator} ${month} ${timerange}`;

    rasterLayerRef.current = L.tileLayer.wms(geoServerUrl, {
      layers: newWmsLayerName,
      format: "image/png",
      transparent: true,
      opacity: 0.7,
      attribution: "GeoServer",
    }).addTo(mapRef.current);

    // Keep district layer on top
    if (districtLayerRef.current) {
      districtLayerRef.current.bringToFront();
    }

    // Update the layer control
    if (layerControlRef.current) {
      mapRef.current.removeControl(layerControlRef.current);
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
      .addTo(mapRef.current);
  }, [timerange, month, indicator]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        background: "#f0f0f0",
      }}
    />
  );
};

export default UgandaMap;
