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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            {/* Tooltip */}
            <span className="invisible group-hover:visible absolute z-10 bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full right-0 mb-1 whitespace-nowrap">
              Click to filter severity
            </span>
          </span>
        </div>
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="space-y-1">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#308DE0]">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Color
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Value
                  </th>
                  {indicator === "PDI" || indicator === "TDI" ? null : (
                    <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                      Tag
                    </th>
                  )}
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {legend?.map((item, index) => {
                  //{getColor(item?.color)}
                  return (
                    <tr key={index} onClick={(e) =>
                      setLevels([item.left_operator, item.right_operator])
                    }>
                      <td style={{ backgroundColor: `${item?.color}` }}></td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                        {item?.range}
                      </td>

                      {indicator === "PDI" || indicator === "TDI" ? null : (
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                          {item?.labels}
                        </td>
                      )}

                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                        {item?.Description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegendData;
