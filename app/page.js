"use client";

import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import OverviewIntro from "./components/ui/OverviewIntro";
import OverviewRightSection from "./components/ui/OverviewRightSection";
import { useRouter } from "next/navigation";
import { useSideberStore } from "./store/useSideberStore";
import {
  capitalize,
  districts,
  getDistrictsFromGeoson,
} from "./utils/selectYear";
import Image from "next/image";
import DashboardSlider from "./components/ui/DashboardSlider";
import Loader from "./components/Loader"; // Import the Loader component
import { geoData } from "./utils/geodata";

const UgandaMap = dynamic(() => import("./components/map/UgandaMap"), {
  loading: () => <p>Loading Map..</p>,
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  let { indicator, timerange, month, district, setDistrict } = useSideberStore(
    (state) => state
  );
  const [progressYear, setProgressYear] = useState(2025);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleYearChange = (year) => {
    setProgressYear(year);
  };

  const handleDistrictChange = (event) => {
    event.preventDefault();
    setDistrict(event.target.value);
    router.push("/dashboard");
  };

  const getActiveTabTitle = () => {
    return "Combined Drought Index (CDI)";
  };

  return (
    <>
      {/* Loader Component */}
      {/* <Loader /> */}

      <div className="min-h-screen bg-[#f1f1f1] p-8 sm:p-20 font-geist-sans flex flex-row gap-8 relative items-start">
        {/* Sidebar Section */}
        {sidebarOpen && (
          <div
            className="bg-[#308DE0] shadow-xl shadow-[#308DE0] border-r text-white p-6 flex flex-col gap-6 w-[32%] h-full fixed left-0 top-0 z-40"
            style={{
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(48, 141, 224, 0.9)",
            }}
          >
            {/* Collapse Sidebar Button */}
            <button
              title="Collapse Sidebar"
              className="absolute top-4 right-4 bg-[#F1F1F1] text-[#308DE0] p-2 rounded-full shadow-md transition-all"
              onClick={(e) => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Header */}
            {/* <Image
              src="/fao-white.png"
              alt="FAO Logo"
              width={250}
              height={150}
              className="object-contain"
            /> */}

            <OverviewIntro />
          </div>
        )}

        {/* Floating Sidebar Button (visible when sidebar is collapsed) */}
        {!sidebarOpen && (
          <button
            title="Sidebar"
            onClick={(e) => setSidebarOpen(!sidebarOpen)}
            className="fixed top-20 left-8 bg-[#308DE0] text-white p-3 rounded-full shadow-lg z-50 transition-all"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-[32%]" : "ml-0"
          }`}
          style={{
            width: sidebarOpen
              ? "calc(100% - 32% - 16.67%)"
              : "calc(100% - 16.67%)",
            marginRight: "16.67%",
          }}
        >
          <div className="flex items-center justify-center gap-4 mt-[-70px]">
            <h2 className="text-2xl font-bold text-[#651d32] md:text-base">
              How is Drought affecting your District?
            </h2>
            <div className="relative">
              <select
                value={capitalize(district?.toLowerCase())}
                onChange={(e) => handleDistrictChange(e)}
                className="appearance-none bg-white border border-[#308DE0] rounded-lg px-8 py-2 pr-10 text-sm font-semibold text-[#308DE0] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#308DE0]"
              >
                {getDistrictsFromGeoson(geoData)?.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
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
            <div className="flex justify-center mt-[-30px]">
              <h2 className="text-xl md:text-base font-semibold text-[#308DE0] mb-6">
                {getActiveTabTitle()}
              </h2>
            </div>

            {/* Map Placeholder and Legend */}
            <div
              className="relative"
              style={{
                height: sidebarOpen ? "600px" : "800px",
                width: "100%",
              }}
            >
              {/* Map Container */}
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <UgandaMap
                  indicator={"CDI"}
                  timerange={timerange}
                  month={month}
                  district={district}
                  imageCintainerId={"home-img"}
                  mapConatinerId={"home-map"}
                />
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg shadow-gray-100 border border-gray-200">
                <div className="flex flex-col space-y-2">
                  <h3 className="font-bold text-sm text-gray-700 mb-1">
                    Legend
                  </h3>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#940905] mr-2"></div>
                    <span className="text-xs">Extreme </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#D03A27] mr-2"></div>
                    <span className="text-xs">Severe </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#E6987B] mr-2"></div>
                    <span className="text-xs">Moderate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#FFFFBE] mr-2"></div>
                    <span className="text-xs">Mild </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#D2FBD2] mr-2 border border-gray-300"></div>
                    <span className="text-xs">Normal</span>
                  </div>
                </div>
              </div>
            </div>

            <DashboardSlider />
          </div>
        </div>

        {/* Right Section */}
        <div
          className="fixed right-0 w-[16.67%] h-full z-30"
          style={{ top: 0 }}
        >
          <OverviewRightSection />
        </div>
      </div>
    </>
  );
}
