"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { useMemo } from 'react'

const formatDate = (date, isToday) => {
  if (isToday) return 'TODAY'
  
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate()
  
  // Show month for first day of month or specific dates (like in screenshot)
  if (day === 1 || day === 8 || day % 4 === 0) {
    return `${day} ${month}`
  }
  
  // For other days, just show the day number
  return day.toString()
}

export default function PracticeChart({ data }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.map(d => ({
      date: d.date instanceof Date ? d.date : new Date(d.date),
      formattedDate: formatDate(d.date instanceof Date ? d.date : new Date(d.date), false),
      practiceTime: Number(d.practiceTime ?? d.practice_time ?? 0),
      goalTime: Number(d.goalTime ?? d.goal_time ?? 0),
    }))
  }, [data])
  
  // Calculate minimum width based on data points
  const minWidth = Math.max(600, chartData.length * 40)
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Practice Time: {payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-blue-400">
            Goal Time: {payload[1].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

    return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col" style={{ borderRadius: '12px' }}>
      {/* Chart Header */}
      <div className="mb-6">
        <div className="text-gray-500 text-sm mb-1">Statistics</div>
        <div className="text-lg font-semibold text-gray-900">Practice by day</div>
      </div>
      
      {/* Chart Container */}
      <div className="flex-1 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative min-h-[300px]">
        {/* Scroll indicator */}
        <div className="absolute top-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded opacity-75">
          Scroll →
        </div>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
        ) : (
          <div className="h-full" style={{ minWidth: `${minWidth}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#E5E7EB" 
                  horizontal={true}
                  vertical={false}
                />
                <XAxis 
                  dataKey="formattedDate" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickMargin={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickMargin={10}
                  tickFormatter={(value) => value.toLocaleString()}
                  domain={[0, 'dataMax + 1000']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="practiceTime" 
                  fill="#1E40AF" 
                  radius={[2, 2, 0, 0]}
                  barSize={8}
                />
                <Bar 
                  dataKey="goalTime" 
                  fill="#3B82F6" 
                  radius={[2, 2, 0, 0]}
                  barSize={8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#1E40AF] rounded"></div>
          <span className="text-sm text-gray-600">Practice Time</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#3B82F6] rounded"></div>
          <span className="text-sm text-gray-600">Goal Time</span>
        </div>
      </div>
    </div>
  )
} 