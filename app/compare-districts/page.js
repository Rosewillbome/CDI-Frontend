"use client";
import { useState, useRef } from "react";
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
    <div ref={reportRef} className="min-h-screen bg-gray-100 p-8">
      {/* Top Border */}
      <div className="border-t-2  border-[#308DE0]"></div>

      {/* Header & Download Button */}
      <div className="max-w-7xl mx-auto mb-8 mt-3 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-black text-center w-full">
            {selectedIndicator}
          </h1>

          <button
            onClick={handleDownloadAllPdf}
            disabled={isDownloading}
            className={`absolute top-0 right-0 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isDownloading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#308DE0] text-white hover:bg-blue-700"
            }`}
          >
            {isDownloading ? <Loader className="animate-spin" size={18} /> : <Download size={18} />}
            {isDownloading ? "Downloading... Please Wait" : "Download Comparison"}
          </button>
        </div>
      </div>

      {/* Comparison Title */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-[#e03030]">
          Comparing: {districtOne} vs {districtTwo}
        </h2>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg h-[90vh] w-full">
          <DistrictSection />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg h-[90vh] w-full">
          <DistrictSectiontwo />
        </div>
      </div>
    </div>
  );
}
