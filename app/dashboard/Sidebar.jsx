"use client";
import React from "react";
import { Calendar, Filter, Clock, MapPin } from "lucide-react";
import { useSideberStore } from "../store/useSideberStore";
import { showYears, months } from "../utils/selectYear";

const Sidebar = () => {
  let {
    indicator,
    timerange,
    month,
    district,
    setIndicator,
    setTimerange,
    setMonth,
    setDistrict,
  } = useSideberStore((state) => state);
  console.log("indicator", indicator);
  console.log("timerange", timerange);
  return (
    <div className="w-64 min-h-screen bg-[#308DE0] border-r p-6 shadow-xl">
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
              className="w-full px-3 py-2 border border-white rounded-lg text-gray-700 "
            >
              <option className="bg-[#2c5d8a]">CDI</option>
              <option className="bg-[#2c5d8a]">PDI</option>
              <option className="bg-[#2c5d8a]">TDI</option>
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
                <label className="block text-xs text-white/70 mb-1">Year</label>
                <div className="w-full flex items-center justify-between px-4 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all">
                  <select
                    value={timerange}
                    onChange={(e) => setTimerange(e.target.value)}
                    className="w-full px-3 py-2 border border-white rounded-lg text-gray-700 "
                  >
                    {showYears()?.map((year, index) => (
                      <option key={index} className="bg-[#2c5d8a]">
                        {year}
                      </option>
                    ))}
                  </select>

                  <Calendar className="h-4 w-4 text-white/60" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  Month
                </label>
                <button className="w-full flex items-center justify-between px-4 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-white rounded-lg text-gray-700 "
                  >
                    {months?.map((month, index) => (
                      <option key={index} className="bg-[#2c5d8a]">
                        {month}
                      </option>
                    ))}
                  </select>
                  <Calendar className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>

          {/* District Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-white/90">
              <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <label className="text-sm font-medium">District</label>
            </div>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-white rounded-lg  text-gray-700"
            >
              <option className="bg-[#2c5d8a]">Acholi</option>
              <option className="bg-[#2c5d8a]">Lango</option>
              <option className="bg-[#2c5d8a]">West Nile</option>
            </select>
          </div>
        </div>

        {/* Clear Button */}
        <button className="w-full mt-8 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 border border-white/20 transition-all hover:shadow-lg">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
