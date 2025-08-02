"use client"

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

const StudentBarChart = ({ studentData, average = 157, goal = 120 }) => {
  // Calculate the width needed for all bars with proper spacing
  const chartWidth = Math.max(800, studentData.length * 60);

  return (
    <>
      <style jsx>{`
        .always-visible-scrollbar {
          scrollbar-width: auto;
          -ms-overflow-style: auto;
        }
        .always-visible-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .always-visible-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .always-visible-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        .always-visible-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Chart Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Student Questions Solved</h3>
      </div>

      {/* Scrollable Container */}
      <div className="w-full overflow-x-auto always-visible-scrollbar">
        <div style={{ width: chartWidth, minWidth: '100%' }}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={studentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 12, 
                  fill: '#666',
                  angle: -45,
                  textAnchor: 'end',
                  height: 60
                }}
                interval={0}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                domain={[0, 'dataMax + 50']}
              />
              
              {/* Goal Line */}
              <ReferenceLine 
                y={goal} 
                stroke="#10B981" 
                strokeDasharray="4 4" 
                strokeWidth={2}
                label={{ value: `Goal: ${goal}q`, position: 'topRight', fill: '#10B981', fontSize: 12 }}
              />
              
              {/* Average Line */}
              <ReferenceLine 
                y={average} 
                stroke="#3B82F6" 
                strokeDasharray="4 4" 
                strokeWidth={2}
                label={{ value: `Average: ${average}q`, position: 'topRight', fill: '#3B82F6', fontSize: 12 }}
              />
              
              <Bar 
                dataKey="questions" 
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                {studentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.questions >= average ? '#0A66C2' : entry.questions >= goal ? '#10B981' : '#F59E0B'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#0A66C2] rounded"></div>
          <span className="text-gray-600">Above Average</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#10B981] rounded"></div>
          <span className="text-gray-600">Above Goal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#F59E0B] rounded"></div>
          <span className="text-gray-600">Below Goal</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-lg font-semibold text-gray-800">{studentData.length}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Average Questions</div>
          <div className="text-lg font-semibold text-[#0A66C2]">{average}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Goal</div>
          <div className="text-lg font-semibold text-[#10B981]">{goal}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Above Goal</div>
          <div className="text-lg font-semibold text-green-600">
            {studentData.filter(student => student.questions >= goal).length}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentBarChart; 