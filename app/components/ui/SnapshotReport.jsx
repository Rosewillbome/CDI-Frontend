"use client";
import React, { useRef, useEffect, useState } from "react";
import SnapshotTable from "../SnapshotTable";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { useSideberStore } from "../../store/useSideberStore";
import axios from "axios";
import { capitalize, moth } from "../../utils/selectYear";

function SnapshotReport({ assessment }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { timerange, month, setSliderYear } = useSideberStore((state) => state);
  const [cdi, setCdi] = useState([]);
  const [rfe, setRfe] = useState([]);
  const [ndvi, setNdvi] = useState([]);
  const [cdiTable, setCdiTable] = useState([]);
  const [trending, setTrending] = useState([]);
  const [improving, setImproving] = useState([]);
  console.log("assessment", assessment);

  const currentMonthYear = `${month?.toUpperCase()},${timerange} `;

  let list_Of_Districts_severe = JSON.parse(assessment[13]);
  let list_Of_Districts_Trending = JSON.parse(assessment[14]);
  let list_Of_Districts_Improving = JSON.parse(assessment[15]);

  useEffect(() => {
    const fetchCdi = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API}data/all/cdi`)
        .then((response) => {
          let filteredCdi = response?.data?.data?.filter(
            (cdi_assessment_data) =>
              cdi_assessment_data[2] ===
              `Raw_CDI_${month?.toLowerCase()}_${timerange}_map`
          );
          console.log("filteredCdi", filteredCdi[0]?.[4]);
          setCdi(filteredCdi);
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    const fetchRfe = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API}data/all/rfe`)
        .then((response) => {
          let filteredrfe = response?.data?.data?.filter(
            (rfe_assessment_data) =>
              rfe_assessment_data[2] ===
              `rainfall_${month?.toLowerCase()}_${timerange}_map.jpg`
          );

          setRfe(filteredrfe);
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    const fetchNdvi = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API}data/all/vdi`)
        .then((response) => {
          let filteredVdi = response?.data?.data?.filter(
            (vdi_assessment_data) =>
              vdi_assessment_data[2] ===
              `Raw_NDVI_Anomaly_${month?.toLowerCase()}_${timerange}_map.jpg`
          );
          //Raw_NDVI_Anomaly_february_2002_map.jpg
          setNdvi(filteredVdi);
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };

    const fetchTableCdi = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API}data/district/table/${timerange}`)
        .then((response) => {
          if (month?.trim()?.length !== 0) {
            function getYear(dateString) {
              return dateString.split(" ")[0];
            }

            let filteredByMonth = response?.data?.data?.filter(
              (month_data) =>
                parseInt(getYear(month_data[2]?.toLowerCase())) ===
                parseInt(moth.indexOf(capitalize(month))) + 1
            );

            let filteredByDistrict = filteredByMonth?.filter((month_data) =>
              list_Of_Districts_severe?.includes(
                month_data[0]?.toString()?.trim()
              )
            );
            setCdiTable(filteredByDistrict);
            let filteredByTrending = filteredByMonth?.filter((month_data) =>
              list_Of_Districts_Trending?.includes(
                month_data[0]?.toString()?.trim()
              )
            );
            setTrending(filteredByTrending);
            let filteredByImproving = filteredByMonth?.filter((month_data) =>
              list_Of_Districts_Improving?.includes(
                month_data[0]?.toString()?.trim()
              )
            );
            setImproving(filteredByImproving);
          }
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    fetchCdi();
    fetchRfe();
    fetchNdvi();
    fetchTableCdi();
  }, [timerange]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Download button */}
      <div className="flex justify-end p-4 sticky top-0 bg-gray-50 z-10 shadow-sm">
        <button
          onClick={() => reactToPrintFn()}
          className="bg-[#308DE0] px-6 py-3 text-white rounded-md hover:text-[#308DE0] hover:bg-white transition-all duration-300 cursor-pointer font-medium shadow-md"
        >
          Download Report
        </button>
      </div>

      {/* Report content */}
      <div
        className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg"
        ref={contentRef}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <div>
            <Image
              src="/fao.png"
              alt="FAO Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">
              UGANDA NATIONAL DROUGHT MONITORING TOOL REPORT
            </h1>
            <h2 className="text-lg font-semibold text-gray-600">
              {currentMonthYear}
            </h2>
          </div>
        </div>

        {/* Overview section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            DROUGHT BULLETIN
          </h2>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Overview</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              The drought continues to affect various districts in Uganda. A
              total of{" "}
              <span className="font-bold text-red-600">
                {assessment?.length === 0 ? 0 : assessment[3]}
              </span>{" "}
              districts have locations that are classified under Severe and
              Extreme Drought conditions and may require immediate humanitarian
              assistance in the coming days or month.
            </p>
          </div>

          {/* CDI Map container */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <h4 className="font-bold text-gray-700">
                CDI Extreme/Severe Overview Map
              </h4>
            </div>
            <div className="p-4 flex justify-center bg-gray-50">
              {/* Replace with actual Image component */}
              <div className="w-[50%] h-[50%] bg-gray-200 flex items-center justify-center text-gray-500">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}uploaded${cdi[0]?.[4]}`}
                  alt={cdi[0]?.[2]}
                  className="static_image"
                />
              </div>
            </div>
          </div>

          {/* Severe districts table */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-700 mb-2">
              These districts are:
            </h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <SnapshotTable currentData={cdiTable} />
            </div>
          </div>

          {/* Extended severe districts */}
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              Additionally,{" "}
              <span className="font-bold text-orange-600">
                {assessment?.length === 0 ? 0 : assessment[4]}
              </span>{" "}
              districts have experienced severe and extreme drought conditions
              for an extended period.
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-medium text-gray-700 mb-2">
              These districts are:
            </h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <SnapshotTable currentData={trending} />
            </div>
          </div>

          {/* Recovering districts */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              Finally,{" "}
              <span className="font-bold text-green-600">
                {assessment?.length === 0 ? 0 : assessment[5]}
              </span>{" "}
              districts are showing signs of recovery. Ongoing interventions
              should be maintained or expanded to ensure full restoration of
              livelihoods.
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-medium text-gray-700 mb-2">
              These districts are:
            </h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <SnapshotTable currentData={improving} />
            </div>
          </div>
        </section>

        {/* Combined Drought Index section */}
        <div className="page-break" style={{ pageBreakBefore: "always" }}></div>
        <section className="mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Combined Drought Index {currentMonthYear}
          </h3>
          <p className="text-gray-600 mb-4">
            Consider the map below that details the drought conditions across
            the different districts in Uganda for {currentMonthYear}
          </p>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex justify-center bg-gray-50">
              {/* Replace  */}
              <div className="w-[50%] h-[50%] bg-gray-200 flex items-center justify-center text-gray-500">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}uploaded${cdi[0]?.[4]}`}
                  alt={cdi[0]?.[2]}
                  className="static_image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rainfall Performance section */}
        <div className="page-break" style={{ pageBreakBefore: "always" }}></div>
        <section className="mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Rainfall Performance {currentMonthYear}
          </h3>
          <p className="text-gray-600 mb-4">
            This data is derived from Modified CHIRPS dataset received for{" "}
            {currentMonthYear}.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex justify-center bg-gray-50">
              {/* Replace */}
              <div className="w-[50%] h-[50%] bg-gray-200 flex items-center justify-center text-gray-500">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}uploaded${rfe[0]?.[4]}`}
                  alt={rfe[0]?.[2]}
                  className="static_image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NDVI Anomaly Performance section */}
        <div className="page-break" style={{ pageBreakBefore: "always" }}></div>
        <section className="mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            NDVI Anomaly Performance
          </h3>
          <p className="text-gray-600 mb-4">
            During this period the vegetation condition change as compared to
            the long-term average is shown below. The data is derived from
            Modified MODIS data.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex justify-center bg-gray-50">
              {/* Replace with Map David */}
              <div className="w-[50%] h-[50%] bg-gray-200 flex items-center justify-center text-gray-500">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}uploaded${ndvi[0]?.[4]}`}
                  alt={ndvi[0]?.[2]}
                  className="static_image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="mt-8 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-4">
            <strong className="font-semibold">NB</strong>: This is an automated
            report generated using the combined drought index approach. For
            further information on the methodology,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              download the technical documentation
            </a>
            .
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">
              For more information contact us:
            </h4>
            <ul className="space-y-1 text-gray-600">
              <li>
                <strong>Name:</strong> Drought Monitoring Team
              </li>
              <li>
                <strong>Email:</strong> drought-info@uganda.gov
              </li>
              <li>
                <strong>Telephone:</strong> +256 XXX XXX XXX
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SnapshotReport;
