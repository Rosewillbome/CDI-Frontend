import React from 'react'

function KeyNote() {
  return (
    <div className="w-[60%] bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-5">
    <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
    <ul className="space-y-3 text-sm">
      <li className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full" />
        <span>
          Real-time drought monitoring using FAO Combined Drought Index
          (CDI)
        </span>
      </li>
      <li className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full" />
        <span>
          Integrated analysis of precipitation, soil moisture, and
          vegetation health
        </span>
      </li>
      
    </ul>
  </div>
  )
}

export default KeyNote