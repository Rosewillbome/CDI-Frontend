"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const UgandaMap = () => {
  const [geoData, setGeoData] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Prevent multiple initializations

  useEffect(() => {
    const fetchBasemap = async () => {
      await axios
        .get("/api/geojson")
        .then((response) => {
          setGeoData(JSON.parse(response?.data?.geojsondata));
        })
        .catch((error) => {});
    };
    fetchBasemap();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && geoData?.length !== 0 ) {
      // Only initialize the map if it hasn't been initialized
      console.log("loaded map")
      mapRef.current = L.map(mapContainerRef.current, {
        center: [1.2, 34.5],
        zoom: 7,
        // layers: [
        //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
        // ],
      });

      L.geoJSON(geoData, {
        style: {
            color: 'black',
            weight: 4,
            // opacity: 0.3,
            fill: false,
            // stroke: false,
        },
    }).addTo(mapRef.current)
    }

    return () => {
      // Cleanup when component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    }
    
  }, [geoData]);

  return (
    <>
    <div ref={mapContainerRef} style={{ position: 'relative', height: '60vh', width: '100%', background: '#f0f0f0' }}/>;
    </>
  );
};

export default UgandaMap;
