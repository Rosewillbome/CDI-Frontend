"use client";
import React, { useState } from "react";

function OverviewIntro() {
  const [activeTab, setActiveTab] = useState("introduction");

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = "/CDI-manual.pdf"; // Path to the PDF file in the public directory
    link.download = "CDI-manual.pdf"; // Name of the downloaded file
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link from the document
  };

  return (
    <>
      <div className="flex border border-[#F1F1F1] rounded-3xl text-sm overflow-hidden w-[70%]">
        <button
          className={`py-2 px-4 flex-1 text-center transition-all ${
            activeTab === "introduction"
              ? "bg-[#F1F1F1] text-black"
              : "bg-[#308DE0] text-white"
          }`}
          onClick={() => setActiveTab("introduction")}
        >
          Introduction
        </button>
        <div className="w-[1px] bg-white"></div>
        <button
          className={`py-2 px-4 flex-1 text-center transition-all ${
            activeTab === "methodology"
              ? "bg-[#F1F1F1] text-black"
              : "bg-[#308DE0] text-white"
          }`}
          onClick={() => setActiveTab("methodology")}
        >
          Methodology
        </button>
      </div>

      {/* Content Container */}
      <div
        className="text-sm transition-opacity overflow-y-auto"
        style={{
          height: "60vh", // Fixed height for consistency
          maxWidth: "90%", // Adjusted for better spacing
        }}
      >
        {activeTab === "introduction" ? (
          <>
            <p className="mb-4">
              The Uganda National Online Drought Monitoring Tool (UNODMT) hosted
              by the National Emergency Coordination and Operations Centre
              (NECOC) within the Office of the Prime Minister (OPM) in Uganda,
              has been developed by the Food and Agriculture Uganda office.
            </p>

            <p className="mb-4">
              This is in response to the country’s increasing vulnerability to
              drought and other natural hazards. Over the past decade, Uganda
              faces a growing number of hazards each year, with the INFORM Risk
              Index ranking the country 12th out of 191 globally in 2024,
              showing a worsening situation compared to the previous year.
            </p>

            <p className="mb-4">
              As an agrarian nation heavily dependent on rain-fed agriculture,
              Uganda’s food security and livelihoods are particularly vulnerable
              to meteorological droughts...
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
              Calculation of the CDI
            </h2>
            <p className="mb-4">
              Within this tool, drought is conceived as a combination of the
              following: a precipitation component, a vegetation component, and
              a temperature component...
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
              How to Interpret the TDI, PDI and CDI values
            </h2>
            <p className="mb-4">
              By definition of CDI Equation, CDI=1.0 represents average weather
              conditions. If the CDI is greater than 1.0, it represents wetter
              than average...
            </p>

            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-transparent">
                  <th className="border border-gray-300 px-4 py-2 text-white">
                    Color
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-white">
                    Value
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    &lt; 0.4
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    Extreme
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    Major loss of crops and pasture...
                  </td>
                </tr>
                <tr className="bg-transparent">
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    0.4 - 0.6
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    Severe
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    Wider scale of loss of crops...
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="prose max-w-none space-y-4 pl-4">
              <button
                onClick={handleDownload}
                className="mt-4 flex items-center justify-center gap-2 bg-[#F1F1F1] text-[#308DE0] py-2 px-4 rounded-2xl hover:bg-[#308DE0] hover:text-white transition-all text-sm"
              >
                <span>Download Methodology</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-semibold mt-6 mb-2">
                Calculation of the CDI
              </h2>
              <p className="mb-4">
                Within this tool, drought is conceived as a combination of the
                following: a precipitation component, a vegetation component,
                and a temperature component...
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                How to Interpret the TDI, PDI and CDI values
              </h2>
              <p className="mb-4">
                By definition of CDI Equation, CDI=1.0 represents average
                weather conditions. If the CDI is greater than 1.0, it
                represents wetter than average...
              </p>

              <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-white">
                      Color
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-white">
                      Value
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      &lt; 0.4
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      Extreme
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      Major loss of crops and pasture...
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      0.4 - 0.6
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      Severe
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      Wider scale of loss of crops...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Footer Marquee */}
      <div className="mt-auto overflow-hidden whitespace-nowrap">
        <div className="animate-marquee text-sm font-bold">
          🌍 Stay informed! Explore the latest drought monitoring updates. 🌍
        </div>
      </div>
    </>
  );
}

export default OverviewIntro;