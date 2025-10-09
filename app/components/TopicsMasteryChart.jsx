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
    <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
      <PieChart margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
          <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          paddingAngle={0}
          dataKey="value"
          labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              // Avoid rendering tiny outside labels that can overflow
              if (percent < 0.1) return null
              const RADIAN = Math.PI / 180
              const radius = innerRadius + (outerRadius - innerRadius) * 0.6
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={13}
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
  const formatValue = (v) => {
    if (v === null || v === undefined) return '-'
    if (typeof v === 'number') {
      try {
        return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v)
      } catch (_) {
        return String(v)
      }
    }
    return v
  }
  const display = formatValue(value)
  if (isSet) {
    return (
      <div className="flex items-center space-x-2 mb-3 last:mb-0">
        <span className="text-sm text-blue-600 font-medium">Set</span>
        <div className="bg-blue-50 px-4 py-2 rounded-full flex-1">
          <span className="text-sm text-gray-600">{label}</span>
          <span className="text-sm font-bold text-gray-900 ml-2">
            {display}{unit}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 px-4 py-2 rounded-full mb-3 last:mb-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-bold text-gray-900 ml-2">
        {display}{unit}
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
            <div className="w-64 h-64 overflow-visible">
                <CustomPieChart data={Array.isArray(topicsData) && topicsData.length > 0 ? topicsData : [
                  { name: 'mastered', value: 0, count: 0, percentage: 0, color: '#22C55E' },
                  { name: 'red', value: 0, count: 0, percentage: 0, color: '#EF4444' }
                ]} />
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
            <ProgressMetric label="Mastery" value={(progressData.mastery ?? 0)} unit="%" />
            <ProgressMetric label="Red" value={(progressData.red ?? 0)} unit="%" />
            <ProgressMetric label="Depth" value={(progressData.depth ?? '-')} />
            <ProgressMetric label="Streak" value={(progressData.streak ?? '-')} />
            <ProgressMetric label="Memory" value={(progressData.memory ?? '-')} />
          </div>
        </div>
      </div>
    </div>
  )
} 