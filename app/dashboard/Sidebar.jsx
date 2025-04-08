"use client";

import React, { useState } from "react";
import {
  Calendar,
  Filter,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSideberStore } from "../store/useSideberStore";
import {
  showYears,
  months,
  districts,
  getDistrictsFromGeoson,
  capitalize,
} from "../utils/selectYear";
import { geoData } from "../utils/geodata";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    indicator,
    timerange,
    month,
    district,
    setIndicator,
    setTimerange,
    setMonth,
    setDistrict,
    setFilterBylegend,
    tabs,
  } = useSideberStore((state) => state);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const clearFilters = (e) => {
    e.preventDefault();
    setIndicator("CDI");
    setTimerange("");
    setMonth("");
    setDistrict("All");
    setFilterBylegend([]);
  };
 

  return (
    <div className="relative">
      {/* Sidebar Container */}
      <div
        className={`relative transition-all duration-300 ${
          isOpen ? "w-56" : "w-16"
        }`}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 z-50 p-2 bg-white text-[#308DE0] border border-[#308DE0] rounded-2xl shadow-lg 
          hover:bg-[#2c5d8a] hover:text-white hover:border-white transition-all group 
          ${isOpen ? "-right-4" : "right-2"}`}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
          {/* Tooltip */}
          <div className="absolute -right-5 top-10 bg-[#308DE0] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isOpen ? "Close Sidebar" : "Open Sidebar"}
          </div>
        </button>

        {/* Sidebar Content */}
        <div
          className={`bg-[#308DE0] min-h-screen border-r p-6 shadow-xl transition-all duration-300 ${
            isOpen ? "w-64" : "w-20 overflow-hidden"
          }`}
        >
          {isOpen && (
            <div className="space-y-8">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-white flex items-center gap-2 text-lg font-semibold">
                  <Filter className="h-5 w-5 text-white/80" />
                  Dashboard Filters
                </h2>
                <p className="text-sm text-white/70 mt-2">
                  Refine your analytics view
                </p>
              </div>

              {/* Filter Sections */}
              <div className="space-y-8">
                {/* Indicator Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-white/90">
                    <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
                      <Filter className="h-4 w-4" />
                    </div>
                    <label className="text-sm font-medium">Indicators</label>
                  </div>
                  <select
                    value={indicator}
                    onChange={(e) => setIndicator(e.target.value)}
                    className="w-full px-3 py-2 border border-white rounded-lg text-gray-700"
                  >
                    <option className="bg-whute-700">CDI</option>
                    {tabs?.trim() === "table-view" ? null : (
                      <>
                        <option className="bg-whute-700">PDI</option>
                        <option className="bg-[#e9edf0]">TDI</option>
                        <option className="bg-[#f6f7f7]">VDI</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Time Filters */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-white/90">
                    <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <label className="text-sm font-medium">Time Range</label>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/70 mb-1">
                        Year
                      </label>
                      <select
                        value={timerange}
                        onChange={(e) => setTimerange(e.target.value)}
                        className="w-full px-3 py-2 border border-white rounded-lg text-gray-700"
                      >
                        <option className="bg-[#f8f9f9]">Select Year</option>
                        {showYears()?.map((year, index) => (
                          <option key={index} className="bg-[#f8fafb]">
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    {tabs?.trim() === "table-view" ? null : (
                      <>
                        <div>
                          <label className="block text-xs text-white/70 mb-1">
                            Month
                          </label>
                          <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-full px-3 py-2 border border-white rounded-lg text-gray-700"
                          >
                            <option className="bg-[#2c5d8a]">
                              Select Month
                            </option>
                            {months?.map((month, index) => (
                              <option key={index} className="bg-[#f4f5f6]">
                                {month[0]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* District Filter */}
                {tabs?.trim() === "table-view" ? null : (
                  <>
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-white/90">
                        <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <label className="text-sm font-medium">District</label>
                      </div>
                      <select
                        value={capitalize(district?.toLowerCase())}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2 border border-white rounded-lg text-gray-700"
                      >
                        {/* <option className="bg-[#2c5d8a]" value={"All"}>
                          All
                        </option> */}
                        {getDistrictsFromGeoson(geoData)?.map(
                          (district, index) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Clear Button */}
              <button
                onClick={(e) => clearFilters(e)}
                className="w-full mt-8 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 border border-white/20 transition-all hover:shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
