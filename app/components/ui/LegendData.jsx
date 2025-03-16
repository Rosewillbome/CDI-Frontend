"use client";
import { useSideberStore } from "../../store/useSideberStore";
import { CDI_legend, PDI_legend, TDI_legend } from "../../utils/drought_levels";
import React, { useEffect, useState } from "react";
import KeyNote from "./KeyNote";

function LegendData() {
  let { filterBylegend, setFilterBylegend, indicator } = useSideberStore(
    (state) => state
  );
  const [levels, setLevels] = useState("");
  const [legend, setLegend] = useState([]);

  useEffect(() => {
    setFilterBylegend(levels);
    console.log("legend", filterBylegend);
  }, [levels]);

  useEffect(() => {
    if (indicator === "CDI") {
      setLegend(CDI_legend);
    } else if (indicator === "PDI") {
      setLegend(PDI_legend);
    } else if (indicator === "TDI") {
      setLegend(TDI_legend);
    }
  }, [indicator]);

  return (
    <div className="flex items-start space-x-6">
      {/* Legend */}
      <div className="relative bg-white shadow-lg p-2 text-sm rounded-sm w-full">
        {/* Info Icon */}
        <div className="absolute top-2 right-2">
          <span className="relative group cursor-pointer">
            {/* Inline SVG for the info icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            {/* Tooltip */}
            <span className="invisible group-hover:visible absolute z-10 bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full right-0 mb-1 whitespace-nowrap">
              Click to filter severity
            </span>
          </span>
        </div>
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="space-y-1">
          {legend?.map((level) => (
            <div
              key={level.range}
              className="flex items-center space-x-2 p-1 cursor-pointer"
              style={{ backgroundColor: level.color }}
              onClick={(e) =>
                setLevels([level.left_operator, level.right_operator])
              }
            >
              <span className="text-xs">{level.labels}</span>
              <span className="text-[8px] text-gray-600 ">({level.range})</span>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default LegendData;
