"use client";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  filter_static_data,
  showYears,
  months,
  returnYears,
} from "../../utils/selectYear";
import axios from "axios";
import ImageStatic from "../../components/ImageStatic";
import html2canvas from "html2canvas";

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
              : selectedIndicator === "CDI"
              ? `${process.env.NEXT_PUBLIC_API}data/all/cdi`
              : selectedIndicator === "VDI"
              ? `${process.env.NEXT_PUBLIC_API}data/all/vdi`
              : ""
          }`
        )
        .then((response) => {
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
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_API}uploaded${
      filter_static_data(Data, moth, yrs)[0]?.[4]
    }`;
    link.download = ` ${filter_static_data(Data, moth, yrs)[0]?.[4]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllMaps = async () => {
    const element = document.getElementById("maps-container");
  
    
    const waitForAllImagesToLoad = (container) => {
      const images = Array.from(container.querySelectorAll("img"));
      return Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve(); 
          return new Promise((resolve) => {
            img.onload = resolve; 
            img.onerror = resolve; 
          });
        })
      );
    };
  
    try {
      
      await waitForAllImagesToLoad(element);
  
      
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
  
        
        const img = new Image();
        img.src = imgData;
        img.style.maxWidth = "100%";
        img.style.height = "auto";
  
        const screenshotContainer = document.createElement("div");
        screenshotContainer.style.position = "fixed";
        screenshotContainer.style.top = "0";
        screenshotContainer.style.left = "0";
        screenshotContainer.style.width = "100%";
        screenshotContainer.style.height = "100%";
        screenshotContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        screenshotContainer.style.display = "flex";
        screenshotContainer.style.justifyContent = "center";
        screenshotContainer.style.alignItems = "center";
        screenshotContainer.style.zIndex = "1000";
  
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.position = "absolute";
        closeButton.style.top = "20px";
        closeButton.style.right = "20px";
        closeButton.style.padding = "10px 20px";
        closeButton.style.backgroundColor = "#4A8BD0";
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.cursor = "pointer";
  
        closeButton.onclick = () => {
          document.body.removeChild(screenshotContainer);
        };
  
        const downloadButton = document.createElement("button");
        downloadButton.innerText = "Download";
        downloadButton.style.position = "absolute";
        downloadButton.style.bottom = "20px";
        downloadButton.style.right = "20px";
        downloadButton.style.padding = "10px 20px";
        downloadButton.style.backgroundColor = "#4A8BD0";
        downloadButton.style.color = "white";
        downloadButton.style.border = "none";
        downloadButton.style.borderRadius = "5px";
        downloadButton.style.cursor = "pointer";
  
        downloadButton.onclick = () => {
          const link = document.createElement("a");
          link.href = imgData;
          link.download = `${selectedIndicator}_Maps_A3.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          document.body.removeChild(screenshotContainer);
        };
  
        screenshotContainer.appendChild(img);
        screenshotContainer.appendChild(closeButton);
        screenshotContainer.appendChild(downloadButton);
        document.body.appendChild(screenshotContainer);
      });
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg font-semibold text-gray-900">
              Fetching data, please wait...
            </p>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4A8BD0] text-center w-full">
            {selectedIndicator?.trim()?.toLowerCase() === "vdi"
              ? "NDVI Anomaly"
              : selectedIndicator}{" "}
            Maps
          </h1>
          <div className="flex space-x-4">
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A8BD0]"
            >
              <option value="CDI">CDI</option>
              <option value="VDI">NDVI Anomaly</option>
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
              {showYears()?.map((year) => (
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
              {showYears()?.map((year) => (
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {months.map((month) => (
                      <div
                        key={`${startYear}-${month[0]}`}
                        className="bg-white rounded-lg shadow-md p-3"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {month[0]}
                          </span>
                          <button
                            className="text-[#4A8BD0] hover:text-[#3870a8]"
                            onClick={(e) =>
                              handleDownload(e, month[0], endYear)
                            }
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]">
                          {filter_static_data(Data, month[0], endYear)?.length >
                          0 ? (
                            <>
                              <ImageStatic
                                Data={Data}
                                month={month[0]}
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
                  <div
                    id="maps-container"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full"
                  >
                    {getYears?.map((year) => (
                      <div
                        key={year}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
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
                                    handleDownload(e, month[0], year)
                                  }
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]">
                                <ImageStatic
                                  Data={Data}
                                  month={month[0]}
                                  year={year}
                                />
                              </div>
                            </div>
                          ))}
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
                <p className="text-lg font-semibold mb-4">
                  No data at the moment!!!
                </p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Page;
