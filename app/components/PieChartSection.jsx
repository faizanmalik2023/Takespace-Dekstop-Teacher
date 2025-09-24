"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Custom tooltip for pie charts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const isTimeData = data.value > 200 // Assuming time values are larger than question counts
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-blue-600">
          {data.name === 'Class' ? 'Classwork' : 'Homework'}: {data.value}
          {isTimeData ? 'm' : ' Questions'}
        </p>
        <p className="text-sm text-gray-600">{data.percentage}%</p>
      </div>
    )
  }
  return null
}

// Custom Pie Chart with Labels
function CustomPieChart({ data }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            paddingAngle={0}
            dataKey="value"
            labelLine={false} 
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={16}
                  fontWeight="bold"
                >
                  {data[index].percentage}%
                </text>
              )
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    )
  }
  

// Individual Pie Chart Component
function PieChartItem({ data, rightLabels }) {
  // Generate dynamic titles based on data
  const classData = data.find(item => item.name === 'Class')
  const homeData = data.find(item => item.name === 'Home')
  
  const isTimeData = classData && classData.value > 200
  const title = isTimeData 
    ? `Classwork Time ${classData?.value}m`
    : `Classwork Questions ${classData?.value}`
  const subtitle = isTimeData 
    ? `Homework Time ${homeData?.value}m`
    : `Homework Questions ${homeData?.value}`

  return (
    <div className="flex items-center justify-between mb-12 last:mb-0">
      {/* Left side - Pie Chart and Info */}
      <div className="flex items-center space-x-6 flex-1">
        {/* Pie Chart */}
        <div className="w-48 h-48 flex-shrink-0">
          <CustomPieChart data={data} />
        </div>
        
        {/* Blue Information Box */}
        <div className="flex-1 min-w-0">
          <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
            <div className="text-sm text-gray-900 mb-1 font-medium">{title}</div>
            <div className="text-sm text-gray-600">{subtitle}</div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
              <span className="text-xs text-gray-600">Class</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#1E40AF] rounded-full"></div>
              <span className="text-xs text-gray-600">Home</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Labels */}
      {rightLabels && (
        <div className="text-right flex-shrink-0 ml-6">
          {rightLabels.map((label, index) => (
            <div key={index} className="text-xs text-gray-600 mb-2 last:mb-0 whitespace-nowrap">
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PieChartSection({ questionsData = [], timeData = [] }) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900">For the chosen period</h3>
      </div>
      
      {/* Pie Charts */}
      <div className="flex-1 flex flex-col justify-center space-y-12">
        {(questionsData.length === 0 && timeData.length === 0) ? (
          <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
        ) : (
          <>
            {/* Questions Pie Chart */}
            <PieChartItem
              data={questionsData}
              rightLabels={["Mastery+ 2%", "Creativity 8"]}
            />

            {/* Time Pie Chart */}
            <PieChartItem
              data={timeData}
              rightLabels={["Creativity + 27"]}
            />
          </>
        )}
      </div>
    </div>
  )
} 