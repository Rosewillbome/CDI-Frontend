'use client'
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TableView = () => {
  // Dummy data for table
  const [tableData, setTableData] = useState([
    { District: 'Acholi', name: 'Sample District 1', date: '2025-01-01' },
    { District: 'Buganda', name: 'Sample District 2', date: '2025-02-15' },
    { District: 'Bunyoro', name: 'Sample District 3', date: '2025-03-05' },
    { District: 'Karamoja', name: 'Sample District 4', date: '2025-04-10' },
  ]);

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedDate(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Table View</h1>

      {/* Filters Section */}
      <div className="flex items-center justify-between space-x-4 mb-4">
        {/* Date Picker */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="border px-3 py-2 rounded-md"
            isClearable
          />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Clear All Filters
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData
                .filter((item) => {
                  // Filter table data by selected date if any
                  if (selectedDate) {
                    const itemDate = new Date(item.date);
                    return itemDate.toDateString() === selectedDate.toDateString();
                  }
                  return true;
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.District}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span>{item.date}</span>
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableView;
