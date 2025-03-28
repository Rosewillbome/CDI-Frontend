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

  const handleDownloadAllPdf = async () => {
    if (!reportRef.current) {
      console.error("Report section not found!");
      return;
    }

    setIsDownloading(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        windowWidth: reportRef.current.scrollWidth,
        windowHeight: reportRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft > 0) {
        position -= 297;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save("Comparison_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    setIsDownloading(false);
  };

  return (
    <>
      {/* Loader */}
      {isDownloading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg font-semibold text-gray-900">
              Generating PDF, please wait...
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
                ? "Downloading... Please Wait"
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
      `}</style>
    </>
  );
}