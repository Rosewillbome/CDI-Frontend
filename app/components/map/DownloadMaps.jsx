"use client";
import React from "react";
// import leafletImage from "leaflet-image";
import html2canvas from "html2canvas";
const DownloadMaps = ({ mapRef }) => {
  //  const handleDownload = () => {
  //   if (!mapRef.current) return;

  //   leafletImage(mapRef.current, function (err, canvas) {
  //     if (err) {
  //       console.error("Error generating image", err);
  //       return;
  //     }

  //     const imgData = canvas.toDataURL("image/png");
  //     const a = document.createElement("a");
  //     a.href = imgData;
  //     a.download = "leaflet-map.png";
  //     a.click();
  //   });
  // };

  const handleDownload = async () => {
    if (!mapRef.current) return;

    const canvas = await html2canvas(mapRef.current);

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "map.png";
    link.click();
  };
  return <button onClick={handleDownload}>Download Map</button>;
};

export default DownloadMaps;
