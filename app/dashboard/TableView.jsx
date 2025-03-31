"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FiDownload } from "react-icons/fi";
import { useSideberStore } from "../store/useSideberStore";

const TableView = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { district, timerange } = useSideberStore((state) => state);

  // Memoize the filtered data to avoid unnecessary recalculations
  const filtable = useMemo(() => {
    if (!tableData.length) return [];

    let filteredData = [...tableData];

    if (timerange?.trim()?.length) {
      const getYear = (dateString) => dateString.split(" ")[1]?.toLowerCase();
      const targetYear = timerange.toLowerCase();
      filteredData = filteredData.filter(
        (month_data) => getYear(month_data[2]) === targetYear
      );
    }

    if (status?.trim()?.length && status.toLowerCase() !== "status") {
      filteredData = filteredData.filter(
        (month_data) => month_data[7]?.toLowerCase() === status.toLowerCase()
      );
    }

    return filteredData;
  }, [timerange, status, tableData]);

  // Fetch data with cleanup
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}data/district/table/cdi`,
          { signal: controller.signal }
        );
        if (isMounted) {
          setTableData(response?.data?.data || []);
        }
      } catch (error) {
        if (isMounted && !axios.isCancel(error)) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Optimized download handler with useCallback
  const handleDownloadTableData = useCallback(async (e) => {
    e.preventDefault();
    setDownloadLoading(true);
    try {
      const requestData = {
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
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setDownloadLoading(false);
    }
  }, [filtable]);

  // Table headers memoized to prevent unnecessary re-renders
  const tableHeaders = useMemo(() => [
    "District",
    "Current CDI",
    "Month & Year",
    "Previous CDI",
    "Previous Month & Year",
    "Deviation from Previous",
    "Deviation from Long-Term Mean",
    "Status"
  ], []);

  return (
    <div className="space-y-3 pl-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Table View</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50"
          onClick={handleDownloadTableData}
          disabled={downloadLoading || !filtable.length}
        >
          {downloadLoading ? "Processing please wait..." : "Download CSV"}
          <FiDownload className="ml-2" size={20} />
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-700">Fetching data...</span>
        </div>
      )}

      {/* Table Section */}
      {!loading && (
        <div className="bg-[#308DE0] rounded-sm shadow-lg overflow-hidden">
          <div className="overflow-x-auto" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#308DE0] sticky top-0 z-10">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={`px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider ${
                        index < tableHeaders.length - 1 ? "border-r border-white" : ""
                      }`}
                    >
                      {header === "Status" ? (
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full px-3 py-2 border border-white rounded-lg text-gray-700 "
                        >
                          <option value="">Status</option>
                          <option value="Improving">Improving</option>
                          <option value="Normal">Normal</option>
                          <option value="Worsening">Worsening</option>
                        </select>
                      ) : (
                        header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {filtable.length ? (
                  filtable.map((item, index) => (
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
                      {item.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-2 whitespace-nowrap text-sm ${
                            cellIndex === 0
                              ? "font-medium text-gray-900 bg-blue-50"
                              : "text-gray-900"
                          } ${
                            cellIndex < item.length - 1 ? "border-r border-white" : ""
                          } ${
                            cellIndex === item.length - 1
                              ? item[7] === "Worsening"
                                ? "text-red-600 font-bold"
                                : "text-green-600 font-bold"
                              : ""
                          }`}
                        >
                          {typeof cell === "number"
                            ? parseFloat(cell).toFixed(2)
                            : cell}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tableHeaders.length} className="px-4 py-4 text-center text-gray-500">
                      {tableData.length ? "No matching records found" : "No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableView;