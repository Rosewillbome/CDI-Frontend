import React from 'react';
import SaveReportButton from '../Shared/SaveReportButton';

const MethodologyPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1672761619560-f13835a70830?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="min-h-screen bg-[rgba(74,139,208,0.7)] py-12"> {/* Darker background overlay */}
        <div className="max-w-full mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white bg-opacity-90 rounded-lg shadow-md p-8 overflow-y-auto max-h-[800px]">
              <h1 className="text-4xl font-bold mb-8 text-blue">Online Drought Monitoring Tool Methodology</h1> {/* White text */}
              <div className="prose max-w-none text-blue">
                <h2>Data Collection and Integration</h2>
                <p>
                  The methodology for the Uganda National Online Drought Monitoring Tool is structured into several key stages. 
                  The first stage involves data collection and integration, where meteorological data such as temperature, rainfall, 
                  and evapotranspiration are sourced from the Uganda National Meteorological Authority (UNMA) and global datasets like NOAA and ECMWF. 
                  Soil moisture data is acquired from satellite platforms like SMOS (Soil Moisture and Ocean Salinity) and MODIS 
                  (Moderate Resolution Imaging Spectroradiometer), while vegetation health data is derived from remote sensing indices, 
                  including the Normalized Difference Vegetation Index (NDVI) and Enhanced Vegetation Index (EVI). Socio-economic data, encompassing 
                  water usage, agricultural productivity, and population vulnerability, is collected from national databases to provide a comprehensive dataset.
                </p>

                <h2>Application of the FAO Combined Drought Index (CDI)</h2>
                <p>
                  The second stage focuses on the application of the FAO Combined Drought Index (CDI), which synthesizes three core dimensions 
                  of drought into a single composite index. Meteorological drought is analyzed by assessing deviations in precipitation 
                  from historical averages. Agricultural drought is evaluated through indicators of soil moisture deficits and vegetation stress, 
                  while hydrological drought is determined using data on streamflow, reservoir levels, and overall water availability. 
                  By integrating these components, the CDI enables a holistic assessment of drought intensity, duration, and spatial extent.
                </p>

                <h2>System Design and Development</h2>
                <p>
                  The third stage involves system design and development. The tool incorporates geospatial analysis through GIS (Geographical Information Systems) 
                  to map and analyze drought conditions spatially. Real-time monitoring is facilitated by integrating satellite data with automated workflows to 
                  ensure timely updates. Predictive modeling using machine learning techniques is employed to forecast drought scenarios based on historical and current data trends.
                </p>

                <h2>User-Friendly Interface</h2>
                <p>
                  The fourth stage focuses on creating a user-friendly interface that enhances accessibility. An interactive dashboard is developed to display 
                  drought conditions using visualizations such as maps and charts. Users can receive region-specific alerts for early warnings and access 
                  downloadable data and reports for further analysis.
                </p>

                <h2>Validation and Stakeholder Engagement</h2>
                <p>
                  Finally, the fifth stage emphasizes validation and stakeholder engagement. The tool undergoes validation against historical drought events 
                  and on-ground observations to ensure its accuracy and reliability. Regular consultations with stakeholders, including policymakers, farmers, 
                  and researchers, are conducted to refine the tool and ensure it addresses their specific needs. 
                  By following this methodology, the Uganda National Online Drought Monitoring Tool will provide actionable insights to support drought preparedness, 
                  response, and recovery efforts, ultimately enhancing Uganda’s resilience to climate variability.
                </p>
              </div>
            </div>
            <div className="lg:w-64">
              <div className="sticky top-8">
                <SaveReportButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage;
