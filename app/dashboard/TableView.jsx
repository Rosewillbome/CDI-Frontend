"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

const TableView = () => {
  // Dummy data for table
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}data/district/table/cdi`)
        .then((response) => {
          console.log("table", response?.data?.data);
          setTableData(response?.data?.data);
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const currentData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownloadTableData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let requestData;
      let filename;

      // Prepare request data for XLSX
      requestData = {
        reportType: "xlsx",
        reportData: {
          tableView: tableData,
        },
      };
      filename = "CDI.xlsx";

      if (!filename) {
        throw new Error("Invalid report type selected");
      }

      // Make the POST request to the API endpoint
      const response = await fetch("/api/tableViewReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      // let url:string = ''
      // let url = window.URL.createObjectURL(blob);
      let url;
      if (typeof window !== "undefined") {
        url = window.URL.createObjectURL(blob);
      }
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Use the appropriate filename based on report type
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      // setLoading(false); // Hide loader
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6 pl-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Table View</h1>

        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          onClick={(e) => handleDownloadTableData(e)}
        >
          {`${loading ? "Proccessing please wait..." : `Download CSV`}`}{" "}
          <FiDownload className="ml-2" size={20} />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-[#308DE0] rounded-sm shadow-lg overflow-hidden">
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
                  Month & Year
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                  Previous CDI
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                  Previous Month & Year
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                  Deviation from Previous
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-white">
                  Deviation from Long-Term Mean
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {currentData.map((item, index) => {
                // const deviationFromPrevious = (
                //   parseFloat(item[1]) - parseFloat(item[3])
                // ).toFixed(2);
                // const deviationFromLongTerm = (
                //   parseFloat(item[1]) - parseFloat(item.LongTermMeanCDI)
                // ).toFixed(2);
                // const status =
                //   deviationFromPrevious > 0 || deviationFromLongTerm > 0
                //     ? "Worsening"
                //     : "Improving";

                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 transition-colors ${
                      item[7] === "Worsening"
                        ? "bg-[#733635]"
                        : item[7] === "Improving"
                        ? "bg-[#ACE1AF]" //#6B8E23
                        : "bg-[#D0F0C0]" // Default color for other cases
                    }`}
                  >
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 bg-blue-50 border-r border-white">
                      {item[0]}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-white">
                      {/* {item[1]?.toFixed(2)} */}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableView;
