"use client";
import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";
import axios from "axios";
import { v4 } from "uuid";
import { capitalize } from "../../utils/selectYear";

const UgandaMap = ({
  indicator,
  timerange,
  month,
  zoom,
  minZoom,
  setDistrict,
  getTheBounds,
}) => {
  const [geoData, setGeoData] = useState(null);
  const [Hreload, setHreload] = useState("");
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const rasterLayerRef = useRef(null);
  const layerControlRef = useRef(null);
  const baseMapsRef = useRef(null);
  const districtLayerRef = useRef(null);
  const boundaryLayer = useRef(null);

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
    baseMapsRef.current = {
      OpenStreetMap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ),
    };

    mapRef.current = L.map(mapContainerRef.current, {
      center: [1.3733, 32.2903],
      zoom: zoom ? zoom : 7.2,
      minZoom: minZoom ? minZoom : 7.2,
      layers: [baseMapsRef.current["OpenStreetMap"]],
      attributionControl: false,
    });

    // Initialize District Layer
    districtLayerRef.current = L.geoJSON(geoData, {
      style: {
        color: "gray",
        weight: 1,
        fill: false,
      },
      onEachFeature: function (feature, layer) {
        const districtName =
          feature.properties?.DISTRICT ||
          feature.properties?.NAME_1 ||
          feature.properties?.name ||
          "Unknown";

        if (districtName !== "Unknown") {
          layer
            .bindTooltip(districtName, {
              permanent: true,
              direction: "center",
              className: "district-label",
            })
            .openTooltip();
          layer.bringToFront();
        }
      },
    }).addTo(mapRef.current);

    // mapRef.current.fitBounds(districtLayerRef.current.getBounds());
    districtLayerRef.current.bringToFront();
    mapRef.current.on("click", function (ev) {
      let clickedFeature = null;
      // Iterate through the district layer to find the clicked feature
      districtLayerRef.current.eachLayer(function (layer) {
        if (
          layer instanceof L.Polygon &&
          layer.getBounds().contains(ev.latlng)
        ) {
          clickedFeature = layer.feature;
        }
      });

      if (clickedFeature) {
        if (setDistrict) {
          //set district
          setDistrict(clickedFeature.properties.name?.toUpperCase());
          let coordinates = clickedFeature;
          if (!coordinates) return;
          if (boundaryLayer.current) {
            mapRef.current.removeLayer(boundaryLayer.current);
            boundaryLayer.current = null;
          }
          boundaryLayer.current = L.geoJSON(coordinates, {
            style: {
              color: "#308DE0",
              weight: 4,
              // opacity: 0.3,
              fill: false,
              // stroke: false,
            },
          })
            .addTo(mapRef.current)
            .bringToBack();
        }
      } else {
      }
    });

    setHreload(v4());
  }, [geoData]);

  // Update the raster layer when indicator, month, or timerange changes
  useEffect(() => {
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
    const newWmsLayerName = `cdi:Raw_${indicator}_${month?.toLowerCase()}_${timerange}`;

    const newDisplayName = `${indicator} ${month} ${timerange}`;

    rasterLayerRef.current = L.tileLayer
      .wms(geoServerUrl, {
        layers: newWmsLayerName,
        format: "image/png",
        transparent: true,
        opacity: 0.7,
      })
      .addTo(mapRef.current);

    if (layerControlRef.current) {
      mapRef.current.removeControl(layerControlRef.current);
    }

    if (!baseMapsRef.current) {
      return;
    }

    // Create a custom control container
    const customControl = L.control({ position: "topright" });

    customControl.onAdd = function (map) {
      const div = L.DomUtil.create("div", "custom-control");

      // Add base map options
      const baseMaps = baseMapsRef.current;
      const baseMapsSelect = L.DomUtil.create(
        "select",
        "base-maps-select",
        div
      );
      for (const key in baseMaps) {
        const option = L.DomUtil.create("option", "", baseMapsSelect);
        option.value = key;
        option.textContent = key;
      }

      // Add raster layer checkbox
      const rasterLayerCheckbox = L.DomUtil.create(
        "input",
        "raster-layer-checkbox",
        div
      );
      rasterLayerCheckbox.type = "checkbox";
      rasterLayerCheckbox.checked = true;
      rasterLayerCheckbox.id = "raster-layer-checkbox";
      const rasterLayerLabel = L.DomUtil.create("label", "", div);
      rasterLayerLabel.htmlFor = "raster-layer-checkbox";
      rasterLayerLabel.textContent = newDisplayName;

      // Add district layer checkbox
      const districtLayerCheckbox = L.DomUtil.create(
        "input",
        "district-layer-checkbox",
        div
      );
      districtLayerCheckbox.type = "checkbox";
      districtLayerCheckbox.checked = true;
      districtLayerCheckbox.id = "district-layer-checkbox";
      const districtLayerLabel = L.DomUtil.create("label", "", div);
      districtLayerLabel.htmlFor = "district-layer-checkbox";
      districtLayerLabel.textContent = "Districts";

      // Event listeners for base map selection
      L.DomEvent.on(baseMapsSelect, "change", function (e) {
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
      L.DomEvent.on(rasterLayerCheckbox, "change", function (e) {
        if (e.target.checked) {
          map.addLayer(rasterLayerRef.current);
        } else {
          map.removeLayer(rasterLayerRef.current);
        }
      });

      // Event listeners for district layer checkbox
      L.DomEvent.on(districtLayerCheckbox, "change", function (e) {
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

  useEffect(() => {
    if (geoData?.length === 0) return;
    if (getTheBounds?.trim()?.length === 0) return;
    const updatedFeatures = geoData?.features?.filter(
      (feature) =>
        feature?.properties?.name === capitalize(getTheBounds?.toLowerCase())
    );
    if (!updatedFeatures) return;
    // Create a new GeoJSON object with the updated features array
    const updatedJsson = {
      ...geoData, // Copy all properties from the original GeoJSON
      features: updatedFeatures, // Replace the features array with the updated one
    };
    if (!updatedJsson) return;

    if (boundaryLayer.current) {
      mapRef.current.removeLayer(boundaryLayer.current);
      boundaryLayer.current = null;
    }
    boundaryLayer.current = L.geoJSON(updatedJsson, {
      style: {
        color: "blue",
        weight: 4,
        // opacity: 0.3,
        fill: false,
        // stroke: false,
      },
    })
      .addTo(mapRef.current)
      .bringToBack();
    const getboundary = boundaryLayer.current.getBounds();
    if (Object?.keys(getboundary)?.length !== 0) {
      mapRef.current.fitBounds(getboundary);
      mapRef.current.setMaxBounds(getboundary);
    } else {
      // console.error("Bounds are not valid:");
    }
  }, [getTheBounds, geoData]);

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
