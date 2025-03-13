"use client";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  filter_static_data,
  getYearsList,
  months,
  returnYears,
} from "../../utils/selectYear";
import axios from "axios";

import ImageStatic from "../../components/ImageStatic";

function Page() {
  const [selectedIndicator, setSelectedIndicator] = useState("CDI");
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [endYear, setEndYear] = useState(new Date().getFullYear() - 1);
  const [startYear, setStartYear] = useState(endYear - 4);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios
        .get(
          `${
            selectedIndicator === "Rainfall"
              ? `${process.env.NEXT_PUBLIC_API}data/all/rfe`
              : ""
          }`
        )
        .then((response) => {
          // console.log("all rainfall",response?.data?.data)
          setData(response?.data?.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("comming error", error);
        });
    };
    fetchData();
  }, [selectedIndicator, startYear, endYear]);

  let getYears = returnYears(startYear, endYear);

  const handleDownload = (e, moth, yrs) => {
    e.preventDefault();
    // Create a link element
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_API}uploaded/uploads/data/RFE/${
      filter_static_data(Data, moth, yrs)[0]?.[3]
    }`; // Path to the PDF file in the public directory
    link.download = ` ${filter_static_data(Data, moth, yrs)[0]?.[3]}`; // Name of the downloaded file
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link from the document
  };

  const handleDownloadAllMaps = () => {
    console.log("Downloading all maps");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4A8BD0] text-center w-full">
            {selectedIndicator} Maps
          </h1>
          <div className="flex space-x-4">
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
            >
              <option value="CDI">CDI</option>
              <option value="NDVI">NDVI Anomaly</option>
              <option value="Rainfall">Rainfall</option>
            </select>
            <button
              onClick={handleDownloadAllMaps}
              className="flex items-center space-x-2 bg-[#4A8BD0] text-white px-4 py-2 rounded-md hover:bg-[#3870a8] transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download All Maps</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Year Range</h2>
          <div className="flex space-x-4">
            <select
              name="start"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
            >
              {getYearsList()?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="end"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
            >
              {getYearsList()?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!loading ? (
          <>
            {Data?.length > 0 ? (
              <>
                {endYear - startYear === 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {months.map((month) => (
                      <div
                        key={`${startYear}-${month[0]}`}
                        className="bg-white rounded-lg shadow-md p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {month[0]}
                          </span>
                          <button
                            className="text-[#4A8BD0] hover:text-[#3870a8]"
                            onClick={(e) =>
                              handleDownload(e, month[1], endYear)
                            }
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]">
                          {filter_static_data(Data, month[1], endYear)?.length >
                          0 ? (
                            <>
                              <ImageStatic
                                Data={Data}
                                month={month[1]}
                                year={endYear}
                              />
                            </>
                          ) : (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                test
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : endYear - startYear + 1 === 5 ? (
                  <div className="flex space-x-8">
                    {getYears?.map((year) => (
                      <div key={year} className="flex-1">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="p-4 bg-[#4A8BD0] text-white">
                            <h3 className="text-lg font-semibold">{year}</h3>
                          </div>
                          <div className="p-4 space-y-4">
                            {months?.map((month) => (
                              <div
                                key={`${year}-${month[0]}`}
                                className="flex flex-col"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">
                                    {month[0]}
                                  </span>
                                  <button
                                    className="text-[#4A8BD0] hover:text-[#3870a8]"
                                    onClick={(e) =>
                                      handleDownload(e, month[1], year)
                                    }
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]">
                                  <ImageStatic
                                    Data={Data}
                                    month={month[1]}
                                    year={year}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg font-semibold mb-4">
                      Please select either one year or five years.
                    </p>
                  </div>
                )}
              </>
            ) :(
              <div className="text-center py-8">
                <p className="text-lg font-semibold mb-4">No data at the moment!!!</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-semibold mb-4">Loading Please wait ..</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
