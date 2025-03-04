"use client";
import React from "react";
import Image from "next/image";
import { Sun, Droplet, Menu, ChevronLeft } from "lucide-react";

function OverviewRightSection() {
    const handleDownload = (tabName) => {
        // Placeholder function for download logic
        alert(`Downloading ${tabName}...`);
      };
  return (
    <>
      {/* Right Section */}
      <div className="bg-[#F1F1F1] p-6 flex flex-col gap-6 w-1/6 h-full fixed right-0 top-0">
        <div className="flex justify-center items-center mt-4">
          <Image
            src="/fao.png"
            alt="Logo"
            width={180}
            height={90}
            className="object-contain"
          />
        </div>

        <button
          onClick={() => handleDownload("Methodology")}
          className="flex items-center justify-center gap-1 bg-[#308DE0] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative"
        >
          <Sun className="h-5 w-5 text-yellow-400 px-2 py-5 animate-spin-slow" />
          <span className="px-2">Download Report</span>
          <Droplet className="h-5 w-5 text-blue-300 animate-bounce" />
          {/* Cloud effect */}
          <div className="absolute inset-0 bg-[#308DE0] opacity-20 blur-lg rounded-full"></div>
        </button>

        <div className="relative border border-[#308DE0] rounded-xl p-4 h-[calc(100%-200px)] flex flex-col justify-between mt-8">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F1F1F1] px-2">
            <h3 className="text-md text-[#308DE0] font-bold">Assessment</h3>
          </div>
          <p className="text-sm text-black text-center">
            This section provides an overview of the assessment.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center bg-[#E0E0E0] rounded-lg border">
                <div className="w-16 bg-[#308DE0] p-2 border-r border-[#308DE0] rounded-l-lg flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">12</div>
                </div>

                <div className="flex-1 flex items-center justify-between p-2">
                  <p className="text-xs text-gray-600">Extreme Severity</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343M17.657 18.657L6.343 7.343M17.657 18.657l-5.657-5.657m5.657 5.657l-5.657 5.657"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-1 text-xs text-gray-600 pl-2 italic">
                Districts in extreme severity currently
              </div>
            </div>

            <div>
              <div className="flex items-center bg-[#E0E0E0] rounded-lg border">
                <div className="w-16 bg-[#308DE0] p-2 border-r border-[#308DE0] rounded-l-lg flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">8</div>
                </div>

                <div className="flex-1 flex items-center justify-between p-2">
                  <p className="text-xs text-gray-600">Trending</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-1 text-xs text-gray-600 pl-2 italic">
                Districts with a long trend of severity - 6 months
              </div>
            </div>

            <div>
              <div className="flex items-center bg-[#E0E0E0] rounded-lg border">
                <div className="w-16 bg-[#308DE0] p-2 border-r border-[#308DE0] rounded-l-lg flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">5</div>
                </div>

                <div className="flex-1 flex items-center justify-between p-2">
                  <p className="text-xs text-gray-600">Improving</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-1 text-xs text-gray-600 pl-2 italic">
                Districts showing improvement over time - 3 months
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Image
              src="/drought.png"
              alt="Drought Clip Art"
              width={180}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewRightSection;
