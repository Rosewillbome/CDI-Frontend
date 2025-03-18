"use client";
import React, { useRef } from "react";
import ImageStatic from "../../ImageStatic";
import {
  filter_static_data,
  showYears,
  months,
  returnYears,
} from "../../../utils/selectYear";
import ReactPrint from "../../ui/ReactPrint"

function DownloadStaticFiles({ data, endYear, startYear }) {
  let getYears = returnYears(startYear, endYear);
      const contentRef = useRef(null);
  return (
    <>
    <ReactPrint contentRef={contentRef}/>
      <div>
        {endYear - startYear === 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6"
            ref={contentRef}
          >
            {months.map((month) => (
              <div
                key={`${startYear}-${month[0]}`}
                className="bg-white rounded-lg shadow-md p-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{month[0]}</span>
                </div>

                <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]">
                  {filter_static_data(data, month[0], endYear)?.length > 0 ? (
                    <>
                      <ImageStatic
                        Data={data}
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
            ref={contentRef}
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
                    <div key={`${year}-${month[0]}`} className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{month[0]}</span>
                      </div>
                      <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg h-[300px]">
                        <ImageStatic Data={data} month={month[0]} year={year} />
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
      </div>
    </>
  );
}

export default DownloadStaticFiles;
