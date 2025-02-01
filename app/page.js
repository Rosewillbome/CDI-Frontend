"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("introduction");
  const [activeDroughtTab, setActiveDroughtTab] = useState("CDI");
  const [progressYear, setProgressYear] = useState(2025);
  const [selectedDistrict, setSelectedDistrict] = useState("Acholi");

  const handleYearChange = (year) => {
    setProgressYear(year);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const getActiveTabTitle = () => {
    switch (activeDroughtTab) {
      case "CDI":
        return "Combined Drought Index (CDI)";
      case "TDI":
        return "Temperature Drought Index (TDI)";
      case "PDI":
        return "Precipitation Drought Index (PDI)";
      default:
        return "Map Placeholder";
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-8 sm:p-20 font-geist-sans flex flex-row gap-8">
      {/* Sidebar Section */}
      <div
        className="bg-[#308DE0] text-white p-6 flex flex-col gap-6 w-[32%] h-full fixed left-0 top-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(48, 141, 224, 0.9)",
        }}
      >
        <div>
          <h2 className="text-xl font-thin">UGANDA NATIONAL DROUGHT</h2>
          <h1 className="text-3xl font-bold">MONITORING TOOL</h1>
        </div>

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

        <div
          className="text-sm transition-opacity overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 200px)",
            maxWidth: "80%",
          }}
        >
          {activeTab === "introduction" ? (
           <p className="">
           Drought is conceived in this study as a combination of the
           following: a precipitation component, which considers rainfall
           deficits and dryness persistence; a vegetation component, which
           is used as a proxy for soil moisture deficit and which considers
           NDVI deficits and deficit persistence; and a temperature
           component, which considers temperature excesses and persistence
           of high temperatures. The drought index calculated using the
           precipitation component is referred to in the study as the{" "}
           <i>Precipitation Drought Index (PDI)</i>, while the index based
           on temperature is named the{" "}
           <i>Temperature Drought Index (TDI)</i>
           and that based on the vegetation component is named the{" "}
           <i>Vegetation Drought Index (VDI)</i>. The drought index that
           combines the three drought components is named the{" "}
           <i>Combined Drought Index (CDI)</i>. Based on the considerations
           in the preceding text, the CDI was developed by Balint et al.
           (2011). The new index is a statistical index comparing the
           present hydrometeorological conditions with the long-term
           average characteristics in the same interest period within the
           year.
         </p>
          ) : (
            <div className="prose max-w-none space-y-4 pl-4">
              <h2 className="text-2xl font-semibold ">
                Description of the Drought Index
              </h2>
              <p className="">
                Drought is conceived in this study as a combination of the
                following: a precipitation component, which considers rainfall
                deficits and dryness persistence; a vegetation component, which
                is used as a proxy for soil moisture deficit and which considers
                NDVI deficits and deficit persistence; and a temperature
                component, which considers temperature excesses and persistence
                of high temperatures. The drought index calculated using the
                precipitation component is referred to in the study as the{" "}
                <i>Precipitation Drought Index (PDI)</i>, while the index based
                on temperature is named the{" "}
                <i>Temperature Drought Index (TDI)</i>
                and that based on the vegetation component is named the{" "}
                <i>Vegetation Drought Index (VDI)</i>. The drought index that
                combines the three drought components is named the{" "}
                <i>Combined Drought Index (CDI)</i>. Based on the considerations
                in the preceding text, the CDI was developed by Balint et al.
                (2011). The new index is a statistical index comparing the
                present hydrometeorological conditions with the long-term
                average characteristics in the same interest period within the
                year.
              </p>

              <h2 className="text-2xl font-semibold ">
                1.1.1 Calculation of the Precipitation, the Temperature and the
                Soil Moisture/Vegetation Drought Indices (PDI, TDI and MDI/VDI)
              </h2>
              <p className="animate__animated animate__fadeIn animate__delay-6s">
                In the present approach, drought is conceived as a combination
                of the following components:
              </p>
              <ul className="list-disc ml-8 space-y-2 ">
                <li>
                  a precipitation component that considers (1) rainfall deficits
                  and (2) dryness persistence;
                </li>
                <li>
                  a temperature component that considers (3) temperature
                  excesses and (4) persistence of high temperatures;
                </li>
                <li>
                  a soil moisture component that considers (5) soil moisture
                  deficit and (6) persistence of dry soil conditions – because
                  of limitations in soil moisture observations, this is
                  approximated by NDVI deficits and deficit persistence.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Moving Animation Text */}
        <div className="mt-auto overflow-hidden whitespace-nowrap">
          <div className="animate-marquee text-sm font-bold">
            🌍 Stay informed! Explore the latest drought monitoring updates. 🌍
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" flex-1 ml-[32%] mr-[16.67%]">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#651d32]">
            How is Drought affecting your District?
          </h2>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="appearance-none bg-white border border-[#308DE0] rounded-lg px-8 py-2 pr-10 text-sm font-semibold text-[#308DE0] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#308DE0]"
            >
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
          {/* Title at the Top and Center */}
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

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => setActiveDroughtTab("CDI")}
                className={`px-6 py-1 text-sm font-semibold transition-all transform skew-x-[-20deg] border border-[#308DE0] ${
                  activeDroughtTab === "CDI"
                    ? "bg-[#308DE0] text-white"
                    : "bg-[#F1F1F1] text-[#308DE0] hover:bg-[#308DE0] hover:text-white"
                }`}
              >
                <span className="block transform skew-x-[20deg]">CDI</span>
              </button>
              <button
                onClick={() => setActiveDroughtTab("TDI")}
                className={`px-6 py-1 text-sm font-semibold transition-all transform skew-x-[-20deg] border border-[#308DE0] ${
                  activeDroughtTab === "TDI"
                    ? "bg-[#308DE0] text-white"
                    : "bg-[#F1F1F1] text-[#308DE0] hover:bg-[#308DE0] hover:text-white"
                }`}
              >
                <span className="block transform skew-x-[20deg]">TDI</span>
              </button>
              <button
                onClick={() => setActiveDroughtTab("PDI")}
                className={`px-6 py-1 text-sm font-semibold transition-all transform skew-x-[-20deg] border border-[#308DE0] ${
                  activeDroughtTab === "PDI"
                    ? "bg-[#308DE0] text-white"
                    : "bg-[#F1F1F1] text-[#308DE0] hover:bg-[#308DE0] hover:text-white"
                }`}
              >
                <span className="block transform skew-x-[20deg]">PDI</span>
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm text-black font-semibold mb-2">Legend</h3>
              <div className="flex flex-col gap-2">
                <div
                  className="px-3 py-1 rounded-md text-sm text-white"
                  style={{ backgroundColor: "#87CEEB" }}
                >
                  No Drought (&gt;1.0)
                </div>
                <div
                  className="px-3 py-1 rounded-md text-sm text-white"
                  style={{ backgroundColor: "#5F9EA0" }}
                >
                  Mild (0.8-1.0)
                </div>
                <div
                  className="px-3 py-1 rounded-md text-sm text-white"
                  style={{ backgroundColor: "#4682B4" }}
                >
                  Moderate (0.6-0.8)
                </div>
                <div
                  className="px-3 py-1 rounded-md text-sm text-white"
                  style={{ backgroundColor: "#1E90FF" }}
                >
                  Severe (0.4-0.6)
                </div>
                <div
                  className="px-3 py-1 rounded-md text-sm text-white"
                  style={{ backgroundColor: "#00008B" }}
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

        <div className="relative border border-[#308DE0] rounded-xl p-4 h-[calc(100%-200px)] flex flex-col justify-between mt-8">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F1F1F1] px-2">
            <h3 className="text-md text-[#308DE0] font-bold">Assessment</h3>
          </div>
          <p className="text-sm text-center">
            This section provides an overview of the assessment.
          </p>

          <div className="mt-4 flex justify-center">
            <Image
              src="/drought.png"
              alt="Drought Clip Art"
              width={180}
              height={120}
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-center mt-auto">
          <p className="text-sm font-bold text-[#308DE0]">
            Click here to access a{" "}
            <span className="underline">Full Report</span>
          </p>
        </div>
      </div>
    </div>
  );
}
