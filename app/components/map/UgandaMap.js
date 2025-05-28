"use client";
import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";
import { v4 } from "uuid";
import { capitalize } from "../../utils/selectYear";
import { usePathname } from "next/navigation";
import { geoData } from "../../utils/geodata"; // Adjust the path to your GeoJSON file
import { waterAreas } from "../../utils/waterAreas"; // Adjust the path to your GeoJSON file
import "leaflet-simple-map-screenshoter";
import { useSideberStore } from "../../store/useSideberStore";
const UgandaMap = ({
  indicator,
  timerange,
  month,
  zoom,
  minZoom,
  setDistrict,
  getTheBounds,
  district,
  mapConatinerId,
  imageCintainerId,
}) => {
  let {
    MapsToggle,
    generatingStatus,
    setGeneratingStatus,
    setMapsToggle,
    setDisTwo,
    setDisOne,
    disTwo,
    disOne,
  } = useSideberStore((state) => state);
  const pathname = usePathname();
  const [Hreload, setHreload] = useState("");
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const rasterLayerRef = useRef(null);
  const layerControlRef = useRef(null);
  const baseMapsRef = useRef(null);
  const districtLayerRef = useRef(null);
  const boundaryLayer = useRef(null);
  const riverLayer = useRef(null);
  const geoServerUrl = `${process.env.NEXT_PUBLIC_WSM}`;

  // Initialize the map when geoData is available
  useEffect(() => {
    if (typeof window === "undefined" || mapRef.current) return;
    //|| mapRef.current

    baseMapsRef.current = {
      OpenStreetMap: L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
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
        weight: 0.3,
        fill: false,
      },
    }).addTo(mapRef.current);

    // Function to toggle label visibility based on zoom level
    const updateLabelVisibility = () => {
      function doesNameFitInLeafletBoundary(
        geoJsonLayer,
        name,
        map,
        options = {}
      ) {
        const {
          fontSize = 14,
          fontFamily = "sans-serif",
          padding = 5,
        } = options;

        // 1. Get the feature's bounds
        const bounds = geoJsonLayer.getBounds();

        // 2. Convert bounds to pixel coordinates at current zoom level
        const topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
        const bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

        // 3. Calculate available width and height in pixels
        const availableWidth = bottomRight.x - topLeft.x;
        const availableHeight = bottomRight.y - topLeft.y;

        // 4. Create temporary canvas to measure text
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = `${fontSize}px ${fontFamily}`;

        // 5. Measure text (more accurate than simple approximation)
        const textWidth = ctx.measureText(name).width;
        const textHeight = fontSize; // Approximate height

        // 6. Add padding
        const paddedWidth = textWidth + padding * 2;
        const paddedHeight = textHeight + padding * 2;

        // 7. Compare dimensions
        return paddedWidth <= availableWidth && paddedHeight <= availableHeight;
      }
      districtLayerRef.current
        .eachLayer((layer) => {
          layer.closeTooltip();
          let tf = doesNameFitInLeafletBoundary(
            layer,
            layer.feature.properties?.name,
            mapRef.current,
            { fontSize: 14 }
          );

          if (layer.feature.properties?.name && tf) {
            layer
              .bindTooltip(layer.feature.properties?.name, {
                permanent: true,
                direction: "center",
                className: "district-label",
              })
              .openTooltip();
            layer.bringToFront();
          }
        })
        .addTo(mapRef.current);
    };

    // Add zoomend event listener to update label visibility
    mapRef.current.on("zoomend", updateLabelVisibility);
    // Initial check for label visibility
    updateLabelVisibility();
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

    const resizeObserver = new ResizeObserver(() => {
      mapRef.current.invalidateSize();
    });

    resizeObserver.observe(mapContainerRef.current);
    L.simpleMapScreenshoter().addTo(mapRef.current);
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
    const newWmsLayerName = `cdi_workspace:Raw_${indicator}_${month?.toLowerCase()}_${timerange}`;
    console.log("newWmsLayerName", newWmsLayerName);

    const newDisplayName = `${indicator} ${month} ${timerange}`;

    rasterLayerRef.current = L.tileLayer
      .wms(geoServerUrl, {
        layers: newWmsLayerName,
        styles: pathname === "/" ? "cdi_home_style" : "",
        format: "image/png",
        transparent: true,
        opacity: 1.0,
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

    if (boundaryLayer.current) {
      mapRef.current.removeLayer(boundaryLayer.current);
      boundaryLayer.current = null;
    }

    const updatedFeatures = geoData?.features?.filter(
      (feature) =>
        feature?.properties?.name === capitalize(district?.toLowerCase())
    );
    if (!updatedFeatures) return;
    // Create a new GeoJSON object with the updated features array
    const updatedJsson = {
      ...geoData, // Copy all properties from the original GeoJSON
      features: updatedFeatures, // Replace the features array with the updated one
    };
    if (!updatedJsson) return;
    boundaryLayer.current = L.geoJSON(updatedJsson, {
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

    if (riverLayer.current) {
      mapRef.current.removeLayer(riverLayer.current);
      riverLayer.current = null;
    }

    riverLayer.current = L.geoJSON(waterAreas, {
      style: {
        color: "d2efff",
        weight: 0.1,
        // fill: false,
        fillColor: "#d2efff",
        fillOpacity: 1.0,
      },
      onEachFeature: function (feature, layer) {
        const waterAreaName = feature.properties?.NAME;

        if (waterAreaName) {
          layer.bindTooltip(waterAreaName, {
            permanent: true,
            direction: "center",
            className: "waterAreas-label",
          });
          // .openTooltip();
          layer.bringToFront();
        }
      },
    }).addTo(mapRef.current);
    riverLayer.current.bringToBack();
  }, [timerange, month, indicator, Hreload, district, geoData]);

  useEffect(() => {
    if (geoData?.length === 0) return;
    if (getTheBounds?.trim()?.length === 0) return;
    if (
      getTheBounds?.trim()?.toLowerCase() === "all" ||
      getTheBounds?.trim() === ""
    ) {
      if (boundaryLayer.current) {
        mapRef.current.removeLayer(boundaryLayer.current);
        boundaryLayer.current = null;
      }
      mapRef.current.setView([1.3733, 2.2903], zoom ? zoom : 7.2);
      mapRef.current.setMinZoom(minZoom ? minZoom : 7.2);
      return;
    }
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

  useEffect(() => {
    if (MapsToggle && generatingStatus?.toLowerCase() === "preparing") {
      const generateBlog = async () => {
        const screenshoter = L.simpleMapScreenshoter({
          hidden: false,
          preventDownload: true,
          position: "topright",
        }).addTo(mapRef.current);

        mapRef.current.screenshoter = screenshoter;
        const mapBlob = await mapRef.current.screenshoter.takeScreen("blob");
        const mapImageUrl = URL.createObjectURL(mapBlob);
        const imageContainer = document.getElementById(imageCintainerId);

        const img = document.createElement("img");
        img.src = mapImageUrl;
        img.style.width = "100%";
        img.style.height = "100%";

        imageContainer.style.display = "block";
        imageContainer.appendChild(img);

        const mp = document.getElementById(mapConatinerId);
        mp.style.display = "none";

        if (mapConatinerId === "district-section-one-map") {
          setDisOne(true);
        }
        if (mapConatinerId === "district-section-two-map") {
          setDisTwo(true);
        }
        mapRef.current.removeControl(screenshoter);
      };
      generateBlog();
    }
    if (!MapsToggle && generatingStatus?.toLowerCase() === "done") {
      const imageContainer = document.getElementById(imageCintainerId);
      imageContainer.style.display = "none";
      const mp = document.getElementById(mapConatinerId);
      mp.style.display = "block";
    }
  }, [MapsToggle, generatingStatus]);

  useEffect(() => {
    if (disTwo && disOne) {
      setMapsToggle(false);
      setGeneratingStatus("Generating");
    }
  }, [disTwo, disOne]);

  return (
    <>
      <div
        id={mapConatinerId}
        ref={mapContainerRef}
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          background: "#f0f0f0",
        }}
      />
      <div
        id={imageCintainerId}
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          background: "#f0f0f0",
          display: "none",
        }}
      ></div>
    </>
  );
};

export default UgandaMap;
