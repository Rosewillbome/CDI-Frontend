"use client";
import { useState, useRef, useEffect } from "react";
import { Download, Loader } from "lucide-react";
import DistrictSection from "./DistrictSection";
import DistrictSectiontwo from "./DistrictSectiontwo";
import { useSideberStore } from "../store/useSideberStore";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Home() {
  let { districtTwo, districtOne } = useSideberStore((state) => state);
  const [selectedIndicator] = useState("Combined Drought Index (CDI)");
  const reportRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.classList.add("hidden");
    }
  }, []);

  // Function to ensure maps are fully loaded
  const waitForMapsToLoad = async () => {
    return new Promise((resolve) => {
      const checkMaps = () => {
        // Add your map loaded detection logic here
        // For example, check if map tiles are visible
        const mapTiles = document.querySelectorAll(".leaflet-tile-loaded");
        if (mapTiles.length >= 4) {
          // Assuming at least 4 tiles need to load
          resolve(true);
        } else {
          setTimeout(checkMaps, 500);
        }
      };
      checkMaps();
    });
  };

  const handleDownloadAllPdf = async () => {
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(reportRef.current, {
        useCORS: true,
        scrollY: -window.scrollY, // optional: to handle fixed headers or current scroll
        windowWidth: document.body.scrollWidth,
        windowHeight: document.body.scrollHeight,
      });
      const dataURL = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(dataURL);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

      // Center vertically if smaller than the page
      const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

      pdf.addImage(dataURL, "PNG", 0, yOffset, imgWidth, imgHeight);
      pdf.save("report.pdf");
    } catch (error) {
      console.error("Screenshot failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Loader */}
      {isDownloading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg font-semibold text-gray-900">
              {/* {mapsLoaded ? "Generating PDF..." : "Loading map data..."} */}
              Generating PDF...
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white">
        {/* Header & Download Button */}
        <div className="mt-2 mb-2 flex items-center justify-center">
          <div className="w-1/3"></div>
          <h1 className="text-3xl font-bold text-black text-center ">
            {selectedIndicator}
          </h1>
          <div className="w-1/3 flex justify-end">
            <button
              onClick={handleDownloadAllPdf}
              disabled={isDownloading}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isDownloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#308DE0] text-white hover:bg-blue-700"
              }`}
            >
              {isDownloading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <Download size={18} />
              )}
              {"Download Report"}
            </button>
          </div>
        </div>

        {/* Comparison Title */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-[#e03030]">
            Comparing: {districtOne} vs {districtTwo}
          </h2>
          {/* Moving Text */}
          <div className="mt-2 overflow-hidden whitespace-nowrap">
            <p className="inline-block animate-marquee text-lg text-gray-600">
              Select on Year and month to see the respective map and select
              district to see the time series visualization.
            </p>
          </div>
        </div>

        {/* District Comparison Sections */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto px-4"
          ref={reportRef}
        >
          <div className="h-screen w-full">
            <DistrictSection />
          </div>
          <div className="h-screen w-full">
            <DistrictSectiontwo />
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes delayed-marquee {
          0%,
          14.2857% {
            transform: translateX(-50%);
            left: 50%;
            position: relative;
            padding-left: 0;
          }
          14.2858% {
            left: auto;
            position: static;
            padding-left: 100%;
          }
          100% {
            transform: translateX(-100%);
            padding-left: 100%;
          }
        }

        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: delayed-marquee 70s linear infinite;
        }

        /* Ensure map containers are properly sized */
        .map-container,
        .leaflet-container {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
        }
      `}</style>
    </>
  );
}
