"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const GoalsComponent = () => {
  const [practiceTime, setPracticeTime] = useState('5');
  const [topicsMastered, setTopicsMastered] = useState('5');
  const [examDate, setExamDate] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
      {/* Title */}
     

      {/* Goals Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Practice Time */}
        <div className="text-center">
          <div className="mb-2">
            <h3 className="text-[18px] font-semibold text-[#103358]">Practice Time</h3>
            <p className="text-[16px] text-[#4F4F4F]">Per week, in hours</p>
          </div>
          <div className="relative">
            <input
              type="number"
              value={practiceTime}
              onChange={(e) => setPracticeTime(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-center text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#398AC8] focus:border-transparent"
              placeholder="5"
            />
          </div>
        </div>

        {/* Topics Mastered */}
        <div className="text-center">
          <div className="mb-2">
            <h3 className="text-[18px] font-semibold text-[#103358]">Topics Mastered</h3>
            <p className="text-[16px] text-[#4F4F4F]">Per week</p>
          </div>
          <div className="relative">
            <input
              type="number"
              value={topicsMastered}
              onChange={(e) => setTopicsMastered(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-center text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#398AC8] focus:border-transparent"
              placeholder="5"
            />
          </div>
        </div>

        {/* Exam Date */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-[18px] font-semibold text-[#103358]">Exam Date</h3>
          </div>
          <div className="relative">
            <DatePicker
              selected={examDate}
              onChange={(date) => setExamDate(date)}
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyyy"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-center text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#398AC8] focus:border-transparent cursor-pointer"
              showPopperArrow={false}
              popperPlacement="bottom-start"
              popperModifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ]}
            />
            {/* Calendar Icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src="/icons/calendar.svg" alt="Calendar" className="w-[25px] h-[25px] text-[#398AC8] mb-[1px] mr-1" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__input-container {
          width: 100%;
        }
        .react-datepicker__input-container input {
          width: 100%;
          padding: 12px 16px;
          background-color: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          text-align: center;
          color: #6b7280;
          font-weight: 500;
          outline: none;
          cursor: pointer;
        }
        .react-datepicker__input-container input:focus {
          outline: none;
          ring: 2px;
          ring-color: #398AC8;
          border-color: transparent;
        }
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .react-datepicker__header {
          background-color: #398AC8;
          color: white;
          border-bottom: 1px solid #d1d5db;
        }
        .react-datepicker__current-month {
          color: white;
          font-weight: 600;
        }
        .react-datepicker__day-name {
          color: white;
        }
        .react-datepicker__day:hover {
          background-color: #398AC8;
          color: white;
        }
        .react-datepicker__day--selected {
          background-color: #398AC8;
          color: white;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #398AC8;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default GoalsComponent; 