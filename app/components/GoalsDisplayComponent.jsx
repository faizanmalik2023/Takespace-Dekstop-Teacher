"use client"

import React from 'react';

// Progress Bar Component
const ProgressBar = ({ currentValue, goalValue, currentColor = "bg-blue-500", goalColor = "bg-red-500", unit = "" }) => {
  // Handle string values like "3 months" by extracting numbers
  const extractNumber = (value) => {
    if (typeof value === 'number') return value;
    const match = value.toString().match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const currentNum = extractNumber(currentValue);
  const goalNum = extractNumber(goalValue);
  const currentPercentage = goalNum > 0 ? Math.min((currentNum / goalNum) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      {/* Current Value Bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Predicted</span>
        <span className="text-sm font-medium text-gray-700">{currentValue}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${currentColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${currentPercentage}%` }}
        ></div>
      </div>
      
      {/* Goal Value Bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Goal</span>
        <span className="text-sm font-medium text-gray-700">{goalValue}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${goalColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: "100%" }}
        ></div>
      </div>
      
      {/* Set Link */}
      <div className="text-right">
        <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
          Set
        </button>
      </div>
    </div>
  );
};

// Practice Time Progress Bar (with different goal color)
const PracticeTimeProgressBar = ({ currentValue, goalValue, unit = "" }) => {
  // Handle time values like "8h 23m" by converting to minutes
  const timeToMinutes = (timeStr) => {
    const match = timeStr.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
  };

  const currentMinutes = timeToMinutes(currentValue);
  const goalMinutes = timeToMinutes(goalValue);
  const currentPercentage = goalMinutes > 0 ? Math.min((currentMinutes / goalMinutes) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      {/* Current Value Bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Last Week</span>
        <span className="text-sm font-medium text-gray-700">{currentValue}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${currentPercentage}%` }}
        ></div>
      </div>
      
      {/* Goal Value Bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Goal</span>
        <span className="text-sm font-medium text-gray-700">{goalValue}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: "100%" }}
        ></div>
      </div>
      
      {/* Set Link */}
      <div className="text-right">
        <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
          Set
        </button>
      </div>
    </div>
  );
};

// Practice Time 30 Days Progress Bar
const PracticeTime30DaysProgressBar = ({ currentValue, goalValue, unit = "" }) => {
  // Handle time values like "8h 23m" by converting to minutes
  const timeToMinutes = (timeStr) => {
    const match = timeStr.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
  };

  const currentMinutes = timeToMinutes(currentValue);
  const goalMinutes = timeToMinutes(goalValue);
  const currentPercentage = goalMinutes > 0 ? Math.min((currentMinutes / goalMinutes) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      {/* Current Value Bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Last 30 days</span>
        <span className="text-sm font-medium text-gray-700">{currentValue}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${currentPercentage}%` }}
        ></div>
      </div>
      
      {/* Goal Value Bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Goal</span>
        <span className="text-sm font-medium text-gray-700">{goalValue}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: "100%" }}
        ></div>
      </div>
      
      {/* Set Link */}
      <div className="text-right">
        <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
          Set
        </button>
      </div>
    </div>
  );
};

// Topics Mastered Progress Bar (with two sets of data)
const TopicsMasteredProgressBar = ({ lastWeekValue, lastWeekGoal, last30DaysValue, last30DaysGoal }) => {
  const lastWeekPercentage = lastWeekGoal > 0 ? Math.min((lastWeekValue / lastWeekGoal) * 100, 100) : 0;
  const last30DaysPercentage = last30DaysGoal > 0 ? Math.min((last30DaysValue / last30DaysGoal) * 100, 100) : 0;

  return (
    <div className="space-y-4">
      {/* Last Week Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Last Week</span>
          <span className="text-sm font-medium text-gray-700">{lastWeekValue}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${lastWeekPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Goal</span>
          <span className="text-sm font-medium text-gray-700">{lastWeekGoal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: "100%" }}
          ></div>
        </div>
        
        <div className="text-right">
          <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
            Set
          </button>
        </div>
      </div>

      {/* Last 30 Days Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Last 30 days</span>
          <span className="text-sm font-medium text-gray-700">{last30DaysValue}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${last30DaysPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Goal</span>
          <span className="text-sm font-medium text-gray-700">{last30DaysGoal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: "100%" }}
          ></div>
        </div>
        
        <div className="text-right">
          <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Goals Display Component
const GoalsDisplayComponent = ({ dateRange, grade, subject }) => {
  // Mock data based on filters - in real app this would come from API
  const getMockData = () => {
    // This would be replaced with actual API call based on dateRange, grade, subject
    return {
      mark: {
        predicted: 70,
        goal: 75,
        unit: "%"
      },
      practiceTimeLastWeek: {
        current: "8h 23m",
        goal: "6h 13m"
      },
      practiceTimeLast30Days: {
        current: "8h 23m", 
        goal: "6h 13m"
      },
      timeToExam: {
        predicted: "3 months",
        goal: "2.5 months"
      },
      topicsMastered: {
        lastWeek: 7,
        lastWeekGoal: 8,
        last30Days: 25,
        last30DaysGoal: 8
      }
    };
  };

  const data = getMockData();

  return (
    <div className="space-y-6 rounded-lg  border  bg-white p-6">
      {/* Section Title */}
      <div>
        <h2 className="text-lg font-medium text-gray-500 mb-2">Statistics</h2>
        <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mark Card */}
        <div className="bg-[#FCFCFD] rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Mark</h3>
          <ProgressBar 
            currentValue={data.mark.predicted}
            goalValue={data.mark.goal}
            unit={data.mark.unit}
            currentColor="bg-blue-500"
            goalColor="bg-red-500"
          />
        </div>

        {/* Practice Time Card (Last Week) */}
        <div className="bg-[#FCFCFD] rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Practice Time</h3>
          <PracticeTimeProgressBar 
            currentValue={data.practiceTimeLastWeek.current}
            goalValue={data.practiceTimeLastWeek.goal}
          />
        </div>

        {/* Time to Exam Card */}
        <div className="bg-[#FCFCFD] rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Time to Exam</h3>
          <ProgressBar 
            currentValue={data.timeToExam.predicted}
            goalValue={data.timeToExam.goal}
            currentColor="bg-blue-500"
            goalColor="bg-red-500"
          />
        </div>

        {/* Topics Mastered Card */}
        <div className="bg-[#FCFCFD] rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Topics Mastered</h3>
          <TopicsMasteredProgressBar 
            lastWeekValue={data.topicsMastered.lastWeek}
            lastWeekGoal={data.topicsMastered.lastWeekGoal}
            last30DaysValue={data.topicsMastered.last30Days}
            last30DaysGoal={data.topicsMastered.last30DaysGoal}
          />
        </div>

        {/* Practice Time Card (Last 30 Days) */}
        <div className="bg-[#FCFCFD] rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Practice Time</h3>
          <PracticeTime30DaysProgressBar 
            currentValue={data.practiceTimeLast30Days.current}
            goalValue={data.practiceTimeLast30Days.goal}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalsDisplayComponent; 