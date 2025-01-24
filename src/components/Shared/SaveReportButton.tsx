import React from 'react';
import { Download } from 'lucide-react';

interface SaveReportButtonProps {
  className?: string;
}

const SaveReportButton: React.FC<SaveReportButtonProps> = ({ className = '' }) => {
  return (
    <button
      className={`flex items-center space-x-2 bg-white text-[#4A8BD0] hover:bg-[#4A8BD0] hover:text-white transition-colors duration-200 px-8 py-3 rounded-[26px] shadow-md ${className}`}
    >
      <Download className="h-5 w-5" />
      <span>Save Full Report</span>
    </button>
  );
};

export default SaveReportButton;