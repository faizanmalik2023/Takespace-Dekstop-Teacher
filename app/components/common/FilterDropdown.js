'use client';
import { useState, useEffect, useRef } from 'react';

const FilterDropdown = ({
  label,
  value,
  options = [],
  onChange,
  width,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  const displayText = `${label}: ${value}`;
  const rootStyle = className ? undefined : { width };

  return (
    <div ref={dropdownRef} className={`relative ${className}`} style={rootStyle}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-[46px] px-4 py-2 bg-white border border-black/5 rounded-lg shadow-[0px_0px_25px_rgba(0,0,0,0.05)] text-left"
      >
        <span
          className="font-poppins text-sm text-[#103358] whitespace-nowrap overflow-hidden text-ellipsis"
          title={displayText}
        >
          {displayText}
        </span>
        <svg
          className={`flex-shrink-0 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#103358"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white border border-black/5 rounded-lg shadow-[0px_0px_25px_rgba(0,0,0,0.05)] max-h-60 overflow-y-auto"
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 text-sm text-[#103358] hover:bg-gray-50 transition-colors"
              title={option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;





