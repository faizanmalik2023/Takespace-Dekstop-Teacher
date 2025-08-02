"use client"

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Sector
} from 'recharts';

const PieChartComponent = ({ 
  title, 
  data, 
  type = 'pie', // 'pie' or 'donut'
  colors = ['#103358', '#398AC8'],
  width = 300,
  height = 300
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Chart Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#103358] text-center">{title}</h3>
      </div>

      {/* Chart Container */}
      <div className="flex justify-center">
        <div style={{ width: width, height: height }}>
          <PieChart width={width} height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={type === 'donut' ? 80 : 0}
              outerRadius={type === 'donut' ? 100 : 120}
              paddingAngle={0}
              dataKey="value"
              labelLine={false} // Disable label lines
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                if (type === 'donut') {
                  // For donut chart, show percentage in center
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="68"
                      fontWeight="normal"
                      fill="#103358"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {`${data[0]?.percentage}%`} 
                    </text>
                  );
                }
                
                // For pie charts, show labels inside segments
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                
                return (
                  <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {`${value} (${data[index]?.percentage}%)`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      {/* Legend for pie charts */}
      {type === 'pie' && (
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-[#103358] font-medium">{item.name}</span>
              </div>
              <span className="text-[#103358] font-semibold">
                {item.value} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;