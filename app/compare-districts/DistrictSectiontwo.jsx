"use client";
import Image from "next/image";
import { useState } from "react";
import { Info } from "lucide-react";
import { showYears, months, districts } from "../utils/selectYear";
import Section from "../components/ui/Section";
import { useSideberStore } from "../store/useSideberStore";

const UgandaMap = ({ district }) => {
  return (
    <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 mb-6">
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Uganda Map View - Highlighting {district}
      </div>
    </div>
  );
};

const FullScreenView = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center">
      <div className="bg-white w-11/12 lg:w-3/4 h-5/6 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 flex justify-between items-center bg-[#308DE0] text-white">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Close Full View
          </button>
        </div>
        <div className="p-6 h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};

function DistrictSectiontwo() {
  let {
    setDistrictTwo,
    setTimerangeTwo,
    setMonthTwo,
    monthTwo,
    timerangeTwo,
    districtTwo,
  } = useSideberStore((state) => state);

  const [fullViewContent, setFullViewContent] = useState(null);
  const handleFullViewClose = () => setFullViewContent(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {fullViewContent && (
        <FullScreenView title="Full View" onClose={handleFullViewClose}>
          {fullViewContent}
        </FullScreenView>
      )}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg r font-semibold text-[#308DE0]">
            Compare this District with another
          </h2>
          <Info size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <select
            value={timerangeTwo}
            onChange={(e) => setTimerangeTwo(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
          >
            <option className="bg-[#2c5d8a]">select Year</option>
            {showYears()?.map((year, index) => (
              <option key={index} className="bg-[#2c5d8a]">
                {year}
              </option>
            ))}
          </select>
          <select
            value={monthTwo}
            onChange={(e) => setMonthTwo(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
          >
            <option className="bg-[#2c5d8a]">select Month</option>
            {months?.map((month, index) => (
              <option key={index} className="bg-[#2c5d8a]">
                {month}
              </option>
            ))}
          </select>
          <select
            value={districtTwo}
            onChange={(e) => setDistrictTwo(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
          >
            <option className="bg-[#2c5d8a]">All</option>
            {districts?.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <UgandaMap district={districtTwo} />

        <Section
          chart_id={"District_section_4"}
          indicator={"TDI"}
          timerange={timerangeTwo}
          month={monthTwo}
          district={districtTwo}
        />

        <Section
          chart_id={"District_section_3"}
          indicator={"PDI"}
          timerange={timerangeTwo}
          month={monthTwo}
          district={districtTwo}
        />
      </div>
    </div>
  );
}

export default DistrictSectiontwo;
