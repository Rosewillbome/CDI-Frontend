"use client";
import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { v4 } from "uuid";

const UgandaMap = ({ indicator, timerange, month, zoom, minZoom }) => {
  const [geoData, setGeoData] = useState(null);
  const [Hreload, setHreload] = useState("");
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const rasterLayerRef = useRef(null);
  const layerControlRef = useRef(null);
  const baseMapsRef = useRef(null);
  const districtLayerRef = useRef(null);

  const geoServerUrl = `${process.env.NEXT_PUBLIC_WSM}`;

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
    mapRef.current = L.map(mapContainerRef.current, {
      center: [1.3733, 32.2903],
      zoom: zoom ? zoom : 7.2,
      minZoom: minZoom ? minZoom : 7.2,
      layers: [baseMapsRef.current["OpenStreetMap"]],
    });

    // Initialize District Layer
    districtLayerRef.current = L.geoJSON(geoData, {
      style: {
        color: "black",
        weight: 1,
        fill: false,
      },
    }).addTo(mapRef.current);

    setHreload(v4());
  }, [geoData]);

  // Update the raster layer when indicator, month, or timerange changes
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
    console.log(
      "Updating raster layer...",
      `${indicator} ${month} ${timerange}`
    );

    if (!geoServerUrl) {
      console.error("GeoServer URL is missing. Check your .env file.");
      return;
    }

    // Remove the previous raster layer
    if (rasterLayerRef.current) {
      console.log("Removed previous raster layer");
      mapRef.current.removeLayer(rasterLayerRef.current);
    }

    // Define new WMS layer
    const newWmsLayerName = `cdi:Raw_${indicator}_${month?.toLowerCase()}_${timerange}`;
    console.log("newWmsLayerName", newWmsLayerName);
    const newDisplayName = `${indicator} ${month} ${timerange}`;

    rasterLayerRef.current = L.tileLayer
      .wms(geoServerUrl, {
        layers: newWmsLayerName,
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        attribution: "GeoServer",
      })
      .addTo(mapRef.current);

    if (layerControlRef.current) {
      console.log("Removing previous layer control...");
      mapRef.current.removeControl(layerControlRef.current);
    }

    if (!baseMapsRef.current) {
      console.error("Base maps not initialized yet.");
      return;
    }

    // Create a custom control container
    const customControl = L.control({ position: 'topright' });

    customControl.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'custom-control');

      // Add base map options
      const baseMaps = baseMapsRef.current;
      const baseMapsSelect = L.DomUtil.create('select', 'base-maps-select', div);
      for (const key in baseMaps) {
        const option = L.DomUtil.create('option', '', baseMapsSelect);
        option.value = key;
        option.textContent = key;
      }

      // Add raster layer checkbox
      const rasterLayerCheckbox = L.DomUtil.create('input', 'raster-layer-checkbox', div);
      rasterLayerCheckbox.type = 'checkbox';
      rasterLayerCheckbox.checked = true;
      rasterLayerCheckbox.id = 'raster-layer-checkbox';
      const rasterLayerLabel = L.DomUtil.create('label', '', div);
      rasterLayerLabel.htmlFor = 'raster-layer-checkbox';
      rasterLayerLabel.textContent = newDisplayName;

      // Add district layer checkbox
      const districtLayerCheckbox = L.DomUtil.create('input', 'district-layer-checkbox', div);
      districtLayerCheckbox.type = 'checkbox';
      districtLayerCheckbox.checked = true;
      districtLayerCheckbox.id = 'district-layer-checkbox';
      const districtLayerLabel = L.DomUtil.create('label', '', div);
      districtLayerLabel.htmlFor = 'district-layer-checkbox';
      districtLayerLabel.textContent = 'Districts';

      // Event listeners for base map selection
      L.DomEvent.on(baseMapsSelect, 'change', function (e) {
        const selectedBaseMap = e.target.value;
        for (const key in baseMaps) {
          if (key === selectedBaseMap) {
            map.addLayer(baseMaps[key]);
          } else {
            map.removeLayer(baseMaps[key]);
          }
        }
      });

      // Event listeners for raster layer checkbox
      L.DomEvent.on(rasterLayerCheckbox, 'change', function (e) {
        if (e.target.checked) {
          map.addLayer(rasterLayerRef.current);
        } else {
          map.removeLayer(rasterLayerRef.current);
        }
      });

      // Event listeners for district layer checkbox
      L.DomEvent.on(districtLayerCheckbox, 'change', function (e) {
        if (e.target.checked) {
          map.addLayer(districtLayerRef.current);
        } else {
          map.removeLayer(districtLayerRef.current);
        }
      });

      return div;
    };

    layerControlRef.current = customControl.addTo(mapRef.current);
  }, [timerange, month, indicator, Hreload]);

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