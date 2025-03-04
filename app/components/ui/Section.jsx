import React from 'react'
import TimeSeriesChart from '../TimeSeriesChart'

function Section({district,month,timerange,indicator,chart_id}) {
  return (
    <div className="mb-6 relative">
          {/* <h3 className="text-lg font-semibold mb-4">
            Temperature Drought Index (TDI)
          </h3> */}
          <div className="h-full bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
            <TimeSeriesChart
            chart_id={chart_id}
              indicator={indicator}
              timerange={timerange}
              month={month}
              district={district}
            />
          </div>
        </div>
  )
}

export default Section