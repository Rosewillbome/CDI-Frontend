"use client";
import { useState, useRef, useEffect } from "react";
import { Download, Loader } from "lucide-react";
import DistrictSection from "./DistrictSection";
import DistrictSectiontwo from "./DistrictSectiontwo";
import { useSideberStore } from "../store/useSideberStore";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { v4 } from "uuid";

export default function Home() {
  let {
    districtTwo,
    districtOne,
    setMapsToggle,
    generatingStatus,
    setGeneratingStatus,
    MapsToggle,
    setDisOne,
    setDisTwo,
  } = useSideberStore((state) => state);
  const [selectedIndicator] = useState("Combined Drought Index (CDI)");
  const reportRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAllPdf = async () => {
    try {
      
      // 📸 Take screenshot of the referenced HTML element
      const canvas = await html2canvas(reportRef.current, {
        useCORS: true,
        scrollY: -window.scrollY,
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

      const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

      pdf.addImage(dataURL, "PNG", 0, yOffset, imgWidth, imgHeight);
      pdf.save(`${districtOne} vs ${districtTwo}.pdf`);
    } catch (error) {
      console.error("Screenshot failed:", error);
    } finally {
      setIsDownloading(false);
      setGeneratingStatus("Done");
      setDisTwo(false);
      setDisOne(false);
    }
  };

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.classList.add("hidden");
    }
    if (!MapsToggle && generatingStatus?.toLowerCase() === "generating") {
      handleDownloadAllPdf();
    }
  }, [generatingStatus, MapsToggle]);

  // PDF download function
  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setGeneratingStatus("Preparing");
    setMapsToggle(true);
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
              {`${generatingStatus} PDF...`}
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
              onClick={handleDownloadPdf}
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto  px-4"
          ref={reportRef}
        >
          <div className="w-full">
            <DistrictSection />
          </div>
          <div className="w-full">
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
