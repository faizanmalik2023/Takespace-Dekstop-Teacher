"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Custom tooltip for pie chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-blue-600">{data.count} topics</p>
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
          outerRadius={120}
          paddingAngle={0}
          dataKey="value"
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const RADIAN = Math.PI / 180
            const radius = innerRadius + (outerRadius - innerRadius) * 0.6
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)
            
            // For very small slices, position label outside
            if (percent < 0.05) {
              const outerX = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN)
              const outerY = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN)
              return (
                <g key={`label-${index}`}>
                  <line
                    x1={cx + outerRadius * Math.cos(-midAngle * RADIAN)}
                    y1={cy + outerRadius * Math.sin(-midAngle * RADIAN)}
                    x2={outerX}
                    y2={outerY}
                    stroke="#9CA3AF"
                    strokeWidth={1}
                  />
                  <text
                    x={outerX}
                    y={outerY}
                    fill="black"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                    fontWeight="medium"
                  >
                    {data[index].count}({data[index].percentage}%)
                  </text>
                </g>
              )
            }
            
            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
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

// Progress Metric Component
function ProgressMetric({ label, value, unit = "", isSet = false }) {
  if (isSet) {
    return (
      <div className="flex items-center space-x-2 mb-3 last:mb-0">
        <span className="text-sm text-blue-600 font-medium">Set</span>
        <div className="bg-blue-50 px-4 py-2 rounded-full flex-1">
          <span className="text-sm text-gray-600">{label}</span>
          <span className="text-sm font-bold text-gray-900 ml-2">
            {value}{unit}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 px-4 py-2 rounded-full mb-3 last:mb-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-bold text-gray-900 ml-2">
        {value}{unit}
      </span>
    </div>
  )
}

export default function TopicsMasteryChart({ topicsData = [], progressData = {} }) {

  const legendData = [
    { color: '#22C55E', label: 'Mastered' },
    { color: '#FCD34D', label: '2 More Revision left' },
    { color: '#86EFAC', label: 'Revised Later' },
    { color: '#3B82F6', label: '3 More Revision left' },
    { color: '#FEF3C7', label: 'Last Revision left' },
    { color: '#EF4444', label: 'Difficult' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Topics by level of mastery */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="text-gray-500 text-sm mb-1">Statistics</div>
            <div className="text-lg font-semibold text-gray-900">Topics by level of mastery</div>
          </div>
          
          {/* Pie Chart and Legend Row */}
          <div className="flex items-start space-x-12">
            {/* Pie Chart */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64">
                {topicsData.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">No data</div>
                ) : (
                  <CustomPieChart data={topicsData} />
                )}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-x-12 gap-y-4">
                {legendData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-[16px] text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Section - Progress to date */}
        <div className="w-full lg:w-[15%]">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="text-lg font-semibold text-gray-900">Progress to date</div>
          </div>
          
          {/* Progress Metrics */}
          <div className="space-y-3">
            <ProgressMetric label="Mastery" value={progressData.mastery} unit="%" />
            <ProgressMetric label="Red" value={progressData.red} unit="%" />
            <ProgressMetric label="Depth" value={progressData.depth} />
            <ProgressMetric label="Streak" value={progressData.streak} />
            <ProgressMetric label="Memory" value={progressData.memory} />
            <ProgressMetric label="Memory" value={progressData.memory} isSet={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 