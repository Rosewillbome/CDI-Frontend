"use client";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { FiDownload } from "react-icons/fi";
import { useSideberStore } from "../store/useSideberStore";

const TableView = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { district, timerange } = useSideberStore((state) => state);

  // Memoized filtered data to optimize rendering
  const filtable = useMemo(() => {
    if (!tableData.length) return [];
    
    let filteredData = [...tableData];

    if (timerange?.trim()?.length !== 0) {
      function getYear(dateString) {
        return dateString.split(" ")[1];
      }

      filteredData = filteredData.filter(
        (month_data) =>
          getYear(month_data[2]?.toLowerCase()) === timerange?.toLowerCase()
      );
    }

    if (status?.trim()?.length !== 0 && status?.toLowerCase() !== "status") {
      filteredData = filteredData.filter(
        (month_data) => month_data[7]?.toLowerCase() === status?.toLowerCase()
      );
    }

    return filteredData;
  }, [timerange, status, tableData]);

  useEffect(() => {
    const fetchData = async () => {
      setTableLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}data/district/table/cdi`
        );
        setTableData(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
        setTableLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownloadTableData = async (e) => {
    e.preventDefault();
    setDownloadLoading(true);
    try {
      let requestData = {
        reportType: "xlsx",
        reportData: {
          tableView: filtable,
        },
      };
      const filename = "CDI.xlsx";

      const response = await fetch("/api/tableViewReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  // Loading skeleton
  const renderLoadingSkeleton = () => {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex space-x-2 animate-pulse">
            {[...Array(8)].map((_, j) => (
              <div
                key={j}
                className="h-10 bg-gray-200 rounded flex-1"
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3 pl-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Table View</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50"
          onClick={handleDownloadTableData}
          disabled={downloadLoading || filtable.length === 0}
        >
          {downloadLoading ? "Processing..." : "Download CSV"}
          <FiDownload className="ml-2" size={20} />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-[#308DE0] rounded-sm shadow-lg overflow-hidden">
        <div 
          className="overflow-x-auto relative" 
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {tableLoading ? (
            <div className="p-4">
              {renderLoadingSkeleton()}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#308DE0] sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    District
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Current CDI
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Year
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Previous CDI
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Previous Year
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Deviation from Previous
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                    Deviation from Long-Term Mean
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-white rounded-lg text-gray-700 bg-white"
                    >
                      <option value="">Status</option>
                      <option value="Improving">Improving</option>
                      <option value="Normal">Normal</option>
                      <option value="Worsening">Worsening</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {filtable.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 transition-colors ${
                      item[7] === "Worsening"
                        ? "bg-[#733635]"
                        : item[7] === "Improving"
                        ? "bg-[#ACE1AF]"
                        : "bg-[#D0F0C0]"
                    }`}
                  >
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 bg-blue-50 border-r border-white">
                      {item[0]}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                      {parseFloat(item[1])?.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                      {item[2]}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                      {parseFloat(item[3])?.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                      {item[4]}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                      {parseFloat(item[5])?.toFixed(2)}
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
                ))}
              </tbody>
            </table>
          )}
          {!tableLoading && filtable.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableView;