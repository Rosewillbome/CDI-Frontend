import React, { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Chinese', 'French', 'Russian', 'Spanish'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#4A8BD0] hover:text-[#3870a8] bg-white rounded-full px-4 py-2 border border-[#4A8BD0]"
      >
        <Languages className="h-5 w-5" />
        <span>{selectedLanguage}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#4A8BD0] hover:text-white"
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;