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
      try {
        const response = await axios.get(
          selectedIndicator === "Rainfall"
            ? `${process.env.NEXT_PUBLIC_API}data/all/rfe`
            : ""
        );
        setData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedIndicator, startYear, endYear]);

  const getYears = returnYears(startYear, endYear);

  const handleDownload = async (e, month, year) => {
    e.preventDefault();
    const mapData = filter_static_data(Data, month, year);
    if (mapData.length > 0) {
      const imageUrl = `${process.env.NEXT_PUBLIC_API}uploaded/uploads/data/RFE/${mapData[0][3]}`;
      console.log("Fetching image from:", imageUrl); // Debugging log
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = mapData[0][3]; // Set the filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    } else {
      console.error("No map data found for the selected month and year.");
    }
  };

  const handleDownloadAllMaps = async () => {
    for (const year of getYears) {
      for (const month of months) {
        const mapData = filter_static_data(Data, month[1], year);
        if (mapData.length > 0) {
          const imageUrl = `${process.env.NEXT_PUBLIC_API}uploaded/uploads/data/RFE/${mapData[0][3]}`;
          console.log(`Fetching image for ${month[0]} ${year} from:`, imageUrl); // Debugging log
          try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
              throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
            }
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = mapData[0][3]; // Set the filename for the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error(`Error downloading the image for ${month[0]} ${year}:`, error);
          }
        }
      }
    }
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
              onChange={(e) => setStartYear(Number(e.target.value))}
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
              onChange={(e) => setEndYear(Number(e.target.value))}
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
                            onClick={(e) => handleDownload(e, month[1], endYear)}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[400px]">
                          {filter_static_data(Data, month[1], endYear)?.length > 0 ? (
                            <ImageStatic
                              Data={Data}
                              month={month[1]}
                              year={endYear}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              No data available
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : endYear - startYear + 1 === 5 ? (
                  <div className="flex flex-wrap gap-4 justify-center"> {/* Center columns and add gap */}
                    {getYears?.map((year) => (
                      <div key={year} className="flex-1 min-w-[220px] max-w-[calc(22%-1rem)]"> {/* Slightly increased width */}
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
                                    onClick={(e) => handleDownload(e, month[1], year)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]"> {/* Adjusted height */}
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
            ) : (
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