"use client";
import Image from "next/image";
import { useState } from "react";
import { Info, Download, Calendar, Filter, ArrowUpRight } from "lucide-react";
import DistrictSection from "./DistrictSection";
import DistrictSectiontwo from "./DistrictSectiontwo";
import { useSideberStore } from "../store/useSideberStore";

export default function Home() {
  let { districtTwo,districtOne } = useSideberStore((state) => state);
  const [selectedIndicator, setSelectedIndicator] = useState(
    "Combined Drought Index (CDI)"
  );

  const handleDownloadAllPdf = () => {
    console.log("Downloading all maps as PDF");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Border */}
      <div className="border-t-2 border-[#308DE0]"></div>

      <div className="p-8">
        {/* Control Panel */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex justify-center w-full">
              <h1 className="text-3xl font-bold text-black text-center">
                {selectedIndicator}
              </h1>
            </div>
          </div>

          <div className=" p-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleDownloadAllPdf}
                className="px-4 py-2 bg-[#308DE0] text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors ml-auto"
              >
                <Download size={18} />
                Download Comparison
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-[#e03030]">
            Comparing: {districtOne} vs {districtTwo}
          </h2>
        </div>

        {/* Comparison Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <DistrictSection />
          <DistrictSectiontwo />
        </div>
      </div>
    </div>
  );
}
