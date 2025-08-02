"use client"

import React from 'react';

// Generic Goal Card Component
const GoalCard = ({ 
  title, 
  data, 
  currentColor = "bg-blue-500", 
  goalColor = "bg-red-500",
  showSetButton = true 
}) => {
  const renderProgressBars = () => {
    if (Array.isArray(data)) {
      // Multiple data sets (like Topics Mastered)
      return data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <span className="text-sm font-medium text-gray-700">{item.currentValue}{item.unit || ""}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${currentColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Goal</span>
            <span className="text-sm font-medium text-gray-700">{item.goalValue}{item.unit || ""}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${goalColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: "100%" }}
            ></div>
          </div>
          
          {showSetButton && (
            <div className="text-right">
              <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
                Set
              </button>
            </div>
          )}
        </div>
      ));
    } else {
      // Single data set
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{data.label}</span>
            <span className="text-sm font-medium text-gray-700">{data.currentValue}{data.unit || ""}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${currentColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${data.percentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Goal</span>
            <span className="text-sm font-medium text-gray-700">{data.goalValue}{data.unit || ""}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${goalColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: "100%" }}
            ></div>
          </div>
          
          {showSetButton && (
            <div className="text-right">
              <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
                Set
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      {renderProgressBars()}
    </div>
  );
};

export default GoalCard; 