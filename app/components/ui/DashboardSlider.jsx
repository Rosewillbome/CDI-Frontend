"use client";
import React, {useEffect } from "react";
import { months } from "../../utils/selectYear";
import { useSideberStore } from "../../store/useSideberStore";
function DashboardSlider() {
  let { timerange, month, setTimerange, setMonth } = useSideberStore(
    (state) => state
  );

  useEffect(() => {
    console.log("month", months[months.indexOf(month)], "year", timerange);
  }, [timerange, month]);
  // Handler for the slider (time selector)
  const handleSliderChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    // Calculate year and month from the slider value (assuming slider value 0 corresponds to January 2001)
    const year = 2001 + Math.floor(value / 12);
    const month = value % 12;
    setTimerange(year);
    setMonth(months[month]);
  };
  return (
    <>
      {" "}
      {/* Time Selector Section */}
      <div className="">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            {months[months.indexOf(month)]} {timerange}
          </h3>
          <span className="text-sm text-gray-500">
            {2001} - {2025}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={(2025 - 2001) * 12 + 11}
          step={1}
          value={(timerange - 2001) * 12 + months.indexOf(month)}
          onChange={(event) => handleSliderChange(event)}
          className="w-full range-slider"
        />
      </div>
    </>
  );
}

export default DashboardSlider;
