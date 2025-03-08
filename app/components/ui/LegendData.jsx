"use client";
import { useSideberStore } from "../../store/useSideberStore";
import { DROUGHT_SEVERITY_LEVELS } from "../../utils/drought_levels";
import React, { useEffect, useState } from "react";
import KeyNote from "./KeyNote";

function LegendData() {
  let { filterBylegend, setFilterBylegend } = useSideberStore((state) => state);
  const [levels, setLevels] = useState("");

  useEffect(() => {
    setFilterBylegend(levels);
    console.log("legend",filterBylegend)
  }, [levels]);
  return (
    <div className="flex items-start space-x-6">
      <KeyNote />
      {/* Legend */}
      <div className="bg-white shadow-lg p-4 text-sm rounded-lg w-64">
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="space-y-1">
          {DROUGHT_SEVERITY_LEVELS.map((level) => (
            <div
              key={level.range}
              className="flex items-center space-x-2 p-1 cursor-pointer"
              style={{ backgroundColor: level.color }}
              onClick={(e) => setLevels([level.left_operator,level.right_operator])}
            >
              <span className="text-xs">{level.label}</span>
              <span
                className="text-[10px] text-gray-600 "
                
              >
                ({level.range})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LegendData;
