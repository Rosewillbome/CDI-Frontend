"use client";
import React from "react";

function SnapshotTable({ currentData }) {
  return (
    <div className="bg-[#308DE0] rounded-sm shadow-lg overflow-hidden mb-3">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#308DE0]">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                District
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                Current CDI
              </th>

              <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                Previous CDI
              </th>

              <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                Deviation from Long-Term Mean
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Current Drought Classification
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {currentData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 bg-blue-50 border-r border-white">
                    {item[0]}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                    {/* {item[1]?.toFixed(2)} */}
                    {parseFloat(item[1])?.toFixed(2)}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                    {parseFloat(item[3])?.toFixed(2)}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                    {parseFloat(item[6])?.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 whitespace-nowrap text-sm font-bold ${
                      item[7] === "Worsening"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item[7]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SnapshotTable;
