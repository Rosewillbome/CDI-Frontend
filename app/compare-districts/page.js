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
  const [mapsLoaded, setMapsLoaded] = useState(false);

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
        const mapTiles = document.querySelectorAll('.leaflet-tile-loaded');
        if (mapTiles.length >= 4) { // Assuming at least 4 tiles need to load
          resolve(true);
        } else {
          setTimeout(checkMaps, 500);
        }
      };
      checkMaps();
    });
  };

  const handleDownloadAllPdf = async () => {
    if (!reportRef.current) {
      console.error("Report section not found!");
      return;
    }

    setIsDownloading(true);
    setMapsLoaded(false);

    try {
      // Wait for maps to fully load
      await waitForMapsToLoad();
      setMapsLoaded(true);

      // Additional delay to ensure everything renders
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Scroll to top to ensure we capture everything
      window.scrollTo(0, 0);

      const pdf = new jsPDF("p", "mm", "a4");
      const canvas = await html2canvas(reportRef.current, {
        scale: 3, // Increased scale for better quality
        windowWidth: reportRef.current.scrollWidth,
        windowHeight: reportRef.current.scrollHeight,
        useCORS: true, // Enable cross-origin requests for map tiles
        allowTaint: true, // Allow tainted canvas
        logging: true, // Helpful for debugging
        backgroundColor: '#FFFFFF', // Ensure white background
        ignoreElements: (element) => {
          // Ignore elements that might interfere with capture
          return element.classList.contains('leaflet-control-container') || 
                 element.classList.contains('leaflet-interactive');
        },
        onclone: (clonedDoc) => {
          // Make sure all map containers are fully visible
          const mapContainers = clonedDoc.querySelectorAll('.map-container, .leaflet-container');
          mapContainers.forEach(container => {
            container.style.visibility = 'visible';
            container.style.opacity = '1';
            container.style.zIndex = '9999';
          });
          
          // Hide any interactive elements that might interfere
          const controls = clonedDoc.querySelectorAll('.leaflet-control-container');
          controls.forEach(control => control.style.display = 'none');
        }
      });

      const imgData = canvas.toDataURL("image/png", 1.0); // Use PNG for better quality
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages as needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Drought_Comparison_${districtOne}_vs_${districtTwo}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
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
              {mapsLoaded ? "Generating PDF..." : "Loading map data..."}
            </p>
          </div>
        </div>
      )}

      <div ref={reportRef} className="min-h-screen bg-white">
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
              {isDownloading
                ? mapsLoaded 
                  ? "Generating PDF..." 
                  : "Loading map data..."
                : "Download Comparison"}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto px-4">
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
        .map-container, .leaflet-container {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
        }
      `}</style>
    </>
  );
}