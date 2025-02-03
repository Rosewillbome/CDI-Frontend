"use client";
import { useState } from "react";
import Image from "next/image";
import { Sun, Droplet } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("introduction");
  const [progressYear, setProgressYear] = useState(2025);
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const handleYearChange = (year) => {
    setProgressYear(year);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const getActiveTabTitle = () => {
    return "Combined Drought Index (CDI)";
  };

  const handleDownload = (tabName) => {
    // Placeholder function for download logic
    alert(`Downloading ${tabName}...`);
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-8 sm:p-20 font-geist-sans flex flex-row gap-8">
      {/* Sidebar Section */}
      <div
  className="bg-[#308DE0] shadow-xl shadow-[#308DE0] border-r text-white p-6 flex flex-col gap-6 w-[32%] h-full fixed left-0 top-0"
  style={{
    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(20px)",
    backgroundColor: "rgba(48, 141, 224, 0.9)",
  }}
>
  {/* Header */}
  <div>
    <h2 className="text-xl font-thin">UGANDA NATIONAL DROUGHT</h2>
    <h1 className="text-3xl font-bold">MONITORING TOOL</h1>
  </div>

  {/* Tab Buttons */}
  <div className="flex border border-[#F1F1F1] rounded-3xl text-sm overflow-hidden w-[70%]">
    <button
      className={`py-2 px-4 flex-1 text-center transition-all ${
        activeTab === "introduction"
          ? "bg-[#F1F1F1] text-black"
          : "bg-[#308DE0] text-white"
      }`}
      onClick={() => setActiveTab("introduction")}
    >
      Introduction
    </button>
    <div className="w-[1px] bg-white"></div>
    <button
      className={`py-2 px-4 flex-1 text-center transition-all ${
        activeTab === "methodology"
          ? "bg-[#F1F1F1] text-black"
          : "bg-[#308DE0] text-white"
      }`}
      onClick={() => setActiveTab("methodology")}
    >
      Methodology
    </button>
  </div>

  {/* Content Container */}
  <div
    className="text-sm transition-opacity overflow-y-auto"
    style={{
      height: "60vh", // Fixed height for consistency
      maxWidth: "90%", // Adjusted for better spacing
    }}
  >
    {activeTab === "introduction" ? (
      <>
        <p className="mb-4">The Uganda National Online Drought Monitoring Tool (UNODMT) hosted by the National Emergency Coordination and Operations Centre (NECOC) within the Office of the Prime Minister (OPM) in Uganda, has been developed by the Food and Agriculture Uganda office.</p>
    
    <p className="mb-4">This is in response to the country’s increasing vulnerability to drought and other natural hazards. Over the past decade, Uganda faces a growing number of hazards each year, with the INFORM Risk Index ranking the country 12th out of 191 globally in 2024, showing a worsening situation compared to the previous year.</p>
    
    <p className="mb-4">As an agrarian nation heavily dependent on rain-fed agriculture, Uganda’s food security and livelihoods are particularly vulnerable to meteorological droughts...</p>
    
    <h2 className="text-xl font-semibold mt-6 mb-2">Calculation of the CDI</h2>
    <p className="mb-4">Within this tool, drought is conceived as a combination of the following: a precipitation component, a vegetation component, and a temperature component...</p>
    
    <h2 className="text-xl font-semibold mt-6 mb-2">How to Interpret the TDI, PDI and CDI values</h2>
    <p className="mb-4">By definition of CDI Equation, CDI=1.0 represents average weather conditions. If the CDI is greater than 1.0, it represents wetter than average...</p>
    
    <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
            <tr className="bg-transparent">
                <th className="border border-gray-300 px-4 py-2 text-[#308DE0]">Color</th>
                <th className="border border-gray-300 px-4 py-2text-[#308DE0]">Value</th>
                <th className="border border-gray-300 px-4 py-2 text-[#308DE0]">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border border-gray-300 px-4 py-2 text-[#308DE0]">&lt; 0.4</td>
                <td className="border border-gray-300 px-4 py-2 text-[#308DE0]">Extreme</td>
                <td className="border border-gray-300 px-4 py-2 text-[#308DE0]">Major loss of crops and pasture...</td>
            </tr>
            <tr className="bg-transparent">
                <td className="border border-gray-300 px-4 py-2 text-[#308DE0]">0.4 - 0.6</td>
                <td className="border border-gray-300 px-4 py-2 text-[#308DE0]">Severe</td>
                <td className="border border-gray-300 px-4 py-2 text-[#308DE0]">Wider scale of loss of crops...</td>
            </tr>
        </tbody>
    </table>

       
        
      </>
    ) : (
      <>
        <div className="prose max-w-none space-y-4 pl-4">
        <button
          onClick={() => handleDownload("Methodology")}
          className="mt-4 flex items-center justify-center gap-2 bg-[#F1F1F1] text-[#308DE0] py-2 px-4 rounded-2xl hover:bg-[#308DE0] hover:text-white transition-all text-sm"
        >
          <span>Download Methodology</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mt-6 mb-2">Calculation of the CDI</h2>
    <p className="mb-4">Within this tool, drought is conceived as a combination of the following: a precipitation component, a vegetation component, and a temperature component...</p>
    
    <h2 className="text-xl font-semibold mt-6 mb-2">How to Interpret the TDI, PDI and CDI values</h2>
    <p className="mb-4">By definition of CDI Equation, CDI=1.0 represents average weather conditions. If the CDI is greater than 1.0, it represents wetter than average...</p>
    
    <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Color</th>
                <th className="border border-gray-300 px-4 py-2">Value</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border border-gray-300 px-4 py-2">&lt; 0.4</td>
                <td className="border border-gray-300 px-4 py-2">Extreme</td>
                <td className="border border-gray-300 px-4 py-2">Major loss of crops and pasture...</td>
            </tr>
            <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">0.4 - 0.6</td>
                <td className="border border-gray-300 px-4 py-2">Severe</td>
                <td className="border border-gray-300 px-4 py-2">Wider scale of loss of crops...</td>
            </tr>
        </tbody>
    </table>

        </div>

       
        
      </>
    )}
  </div>

  {/* Footer Marquee */}
  <div className="mt-auto overflow-hidden whitespace-nowrap">
    <div className="animate-marquee text-sm font-bold">
      🌍 Stay informed! Explore the latest drought monitoring updates. 🌍
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className=" flex-1 ml-[32%] mr-[16.67%]">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-[#651d32]">
            How is Drought affecting your District?
          </h2>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="appearance-none bg-white border border-[#308DE0] rounded-lg px-8 py-2 pr-10 text-sm font-semibold text-[#308DE0] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#308DE0]"
            >
              <option value="All">All</option>
              <option value="Acholi">Acholi</option>
              <option value="Lango">Lango</option>
              <option value="Karamoja">Karamoja</option>
              <option value="West Nile">West Nile</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#308DE0]">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold text-[#308DE0]">
              {getActiveTabTitle()}
            </h2>
          </div>

          {/* Map Placeholder and Legend */}
          <div className="relative h-[600px]">
            {/* Map Placeholder */}
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Map Placeholder</span>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-1 shadow-md">
              <h3 className="text-sm text-black font-semibold mb-2">Legend</h3>
              <div className="flex flex-col gap-1">
                <div
                  className="px-2 py-1  text-sm text-gray-500"
                  style={{ backgroundColor: "#E5E7EB" }}
                >
                  Other
                </div>

                <div
                  className="px-2 py-1 text-sm text-white"
                  style={{ backgroundColor: "#D03A27" }}
                >
                  Severe (0.4-0.6)
                </div>
                <div
                  className="px-2 py-1 text-sm text-white"
                  style={{ backgroundColor: "#940905" }}
                >
                  Extreme (&lt;0.4)
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
              <span>2001</span>
              <span>2025</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 relative">
              <div
                className="bg-[#308DE0] h-3 rounded-full"
                style={{
                  width: `${((2025 - progressYear) / (2025 - 2001)) * 100}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 text-center text-sm font-semibold text-gray-700">
              Year: {progressYear}
            </div>
            <input
              type="range"
              min="2001"
              max="2025"
              value={progressYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="w-full mt-4"
            />
          </div>
        </div>
      </div>

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

          <div className=" space-y-4">
            <div>
              <div className="flex items-center bg-[#E0E0E0] rounded-lg border ">
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
              <div className="flex items-center bg-[#E0E0E0] rounded-lg border ">
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
              <div className="flex items-center bg-[#E0E0E0] rounded-lg border ]">
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
    </div>
  );
}
