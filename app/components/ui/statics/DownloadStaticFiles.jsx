"use client";
import React, { useRef, useEffect, useState } from "react";
import ImageStatic from "../../ImageStatic";
import {
  filter_static_data,
  showYears,
  months,
  returnYears,
  refactorStaticMapData,
} from "../../../utils/selectYear";
import ReactPrint from "../../ui/ReactPrint";
import TableStatic from "./TableStatic";

function DownloadStaticFiles({
  data,
  endYear,
  startYear,
  selectedIndicator,
  selectedOption,
}) {
  const [count, setCount] = useState();
  let getYears = returnYears(startYear, endYear);
  // console.log("getYears ", getYears);F
  const contentRef = useRef(null);
  const imgRefs = useRef(null);

  const { yrs, groupedData } = refactorStaticMapData(data, startYear, endYear,selectedOption);
  // Run only once after the component mounts // Run only once after the component mounts
  return (
    <>
      <ReactPrint contentRef={contentRef} />
      <div>
        {endYear - startYear === 0 ? (
          <div
            // grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6
            className="w-full flex items-center flex-wrap justify-evenly mt-6"
            ref={contentRef}
          >
            {/* <h1 className="text-3xl font-bold text-[#4A8BD0] text-center w-full">
              {selectedIndicator?.trim()?.toLowerCase() === "vdi"
                ? "NDVI Anomaly"
                : selectedIndicator}{" "}
              Maps
            </h1> */}
            {months.map((month, index) => (
              // bg-white rounded-lg shadow-md p-3
              <div
                key={`${startYear}-${month[0]}`}
                className={`bg-white rounded-lg shadow-md p-3 w-[500px] h-[500px] ${
                  index % 6 === 0 ? `page-break` : ""
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{month[0]}</span>
                </div>

                <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-full">
                  {filter_static_data(data, month[0], endYear)?.length > 0 ? (
                    <>
                      <ImageStatic
                        Data={data}
                        month={month[0]}
                        year={endYear}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* {index < months.length - 1 && <div className="page-break" />} */}
              </div>
            ))}
          </div>
        ) : (
          <div id="maps-container" ref={contentRef} className="w-full ">
            {/* <h1 className="text-3xl font-bold text-[#4A8BD0] text-center w-full">
              {selectedIndicator?.trim()?.toLowerCase() === "vdi"
                ? "NDVI Anomaly"
                : selectedIndicator}{" "}
              Maps
            </h1> */}
            {/* {selectedOption === "selected_option"
              ? getYears?.map((year, index) => (
                  <div
                    key={year}
                    className={`bg-white rounded-lg shadow-md overflow-hidden w-[500px] mr-2`}
                    ref={imgRefs}
                  >
                    <div className="p-4 bg-[#4A8BD0] text-white">
                      <h3 className="text-lg font-semibold">{year}</h3>
                    </div>
                    <div className="flex items-center flex-col justify-between flex-wrap w-full">
                      {months?.map((month, index) => (
                        <div
                          key={`${year}-${month[0]}`}
                          className={`flex flex-col ${
                            index % 4 === 0 && index !== 0 && "page-break"
                          } pt-5`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              {month[0]}
                            </span>
                          </div>
                          <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg w-[200px] h-[200px]">
                            <ImageStatic
                              Data={data}
                              month={month[0]}
                              year={year}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : showYears()?.map((year, index) => (
                  // <div
                  //   key={year}
                  //   className={`bg-white rounded-lg shadow-md overflow-hidden w-full page-break`}
                  //   ref={imgRefs}
                  // >
                  //   <div className="p-4 bg-[#4A8BD0] text-white">
                  //     <h3 className="text-lg font-semibold">{year}</h3>
                  //   </div>
                  //   <div className="p-4 space-y-4 flex items-start justify-evenly flex-wrap w-full">
                  //     {months?.map((month, index) => (
                  //       <div
                  //         key={`${year}-${month[0]}`}
                  //         className={`flex flex-col`}
                  //       >
                  //         <div className="flex justify-between items-center mb-2">
                  //           <span className="text-sm font-medium">
                  //             {month[0]}
                  //           </span>
                  //         </div>
                  //         <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg w-[300px] h-[300px]">
                  //           <ImageStatic
                  //             Data={data}
                  //             month={month[0]}
                  //             year={year}
                  //           />
                  //         </div>
                  //       </div>
                  //     ))}
                  //   </div>
                  // </div>
                  <div
                    key={year}
                    className={`bg-white rounded-lg shadow-md  w-[50px] mr-2`}
                    ref={imgRefs}
                  >
                    <div className="p-4 bg-[#4A8BD0] text-white flex items-center justify-center">
                      <h3 className="text-xs ">{year}</h3>
                    </div>
                    <div className="flex items-center flex-col justify-between flex-wrap w-full">
                      {months?.map((month, index) => (
                        <div
                          key={`${year}-${month[0]}`}
                          className={`flex flex-col  pt-5`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs ">
                              {month[0]}
                            </span>
                          </div>
                          <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg w-[50px] h-[50px]">
                            <ImageStatic
                              Data={data}
                              month={month[0]}
                              year={parseInt(year)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))} */}
            <TableStatic years ={yrs} groupedData={groupedData} selectedOption={selectedOption}/>
          </div>
        )}
      </div>
    </>
  );
}

export default DownloadStaticFiles;
