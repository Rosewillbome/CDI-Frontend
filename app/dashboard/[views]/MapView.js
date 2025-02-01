import React from "react";
import { DROUGHT_SEVERITY_LEVELS } from "../../utils/drought_levels";
const MapView = () => {
  return (
    <div className="flex h-full">
      <div className="w-2/3 bg-gray-200 p-4 relative">
        <div className="h-full  flex justify-center items-center relative">
          <span className=" font-semibold">Map Placeholder.</span>

          <div className="absolute bottom-4 right-4 bg-white shadow-lg p-2 text-sm ">
            <h3 className="font-semibold mb-2">Legend</h3>
            <div className="space-y-1">
              {DROUGHT_SEVERITY_LEVELS.map((level) => (
                <div
                  key={level.range}
                  className="flex items-center space-x-2 p-1 rounded"
                  style={{ backgroundColor: level.color }}
                >
                  <span className="text-xs text-white">{level.label}</span>
                  <span className="text-[10px] text-gray-600">
                    ({level.range})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/3 bg-white p-8 overflow-y-auto max-h-[calc(100vh-32px)]">
        <h1 className="text-2xl font-bold text-[#4A8BD0] mb-4">
          Key Notes for the Uganda National Online Drought Monitoring Tool
          Report
        </h1>
        <p className="text-gray-700 mb-4">
          Drought is a significant challenge in Uganda, impacting agriculture,
          water resources, and livelihoods. The Uganda National Online Drought
          Monitoring Tool (UNODMT) is designed to provide real-time, data-driven
          insights for effective drought management. This tool uses the FAO
          Combined Drought Index (CDI), which integrates multiple data sources
          to assess drought intensity, duration, and spatial extent. The primary
          purpose of the tool is to enable proactive drought monitoring and
          management while supporting policymakers, researchers, and farmers
          with actionable insights. It aligns with Uganda's strategies for
          sustainable resource management and climate resilience.
        </p>
        <p className="text-gray-700 mb-4">
          The methodology involves comprehensive data collection, integrating
          meteorological, soil moisture, vegetation health, and socio-economic
          indicators. The FAO Combined Drought Index (CDI) is applied to merge
          meteorological, agricultural, and hydrological dimensions of drought
          into a single composite measure. The system utilizes GIS for
          geospatial analysis, machine learning for predictive modeling, and
          real-time satellite data for monitoring. An interactive dashboard
          provides visualizations, alerts, and downloadable reports to enhance
          accessibility. Validation against historical drought events and
          ongoing stakeholder engagement ensures the tool’s accuracy and
          relevance.
        </p>
        <p className="text-gray-700 mb-4">
          Drought severity is categorized into six levels: no drought, mild
          drought, moderate drought, severe drought, extreme drought, and
          exceptional drought. These levels reflect increasing intensity and
          impacts, ranging from normal conditions with adequate resources to
          catastrophic conditions marked by ecosystem collapse and severe
          socio-economic consequences. Each level is assessed using thresholds
          for precipitation deficits, soil moisture anomalies, and vegetation
          health indices.
        </p>
        <p className="text-gray-700 mb-4">
          The tool integrates satellite-based and ground-based data to deliver
          real-time updates and predictive analytics for drought forecasting.
          Its user-friendly interface offers customizable reports and
          region-specific alerts, ensuring that users can make informed
          decisions. This tool enhances Uganda's capacity for drought
          preparedness, response, and recovery by supporting evidence-based
          policymaking and resource allocation. It ultimately reduces the
          socio-economic impacts of drought on vulnerable communities and
          strengthens national resilience.
        </p>
        <p className="text-gray-700 mb-4">
          For further information, readers can consult FAO CDI guidelines, UNMA
          reports, and global drought monitoring systems. Additional details are
          available through remote sensing platforms like MODIS and SMOS for
          vegetation and soil moisture data. Uganda’s Climate Resilience
          Framework offers insights into policy alignment and resource
          management strategies. These resources complement the report and
          provide a deeper understanding of the methodology and applications of
          the Uganda National Online Drought Monitoring Tool.
        </p>
      </div>
    </div>
  );
};

export default MapView;
