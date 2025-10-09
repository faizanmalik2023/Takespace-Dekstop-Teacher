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
    // Supports two shapes:
    // 1) Array of objects with {date, practice_time, goal_time}
    // 2) Object with { labels: string[], data: { attempted, correct }[] }
    if (!data) return []

    // Shape 2: {labels, data}
    if (!Array.isArray(data) && Array.isArray(data?.data) && Array.isArray(data?.labels)) {
      const labels = data.labels
      const points = data.data
      const len = Math.min(labels.length, points.length)
      return Array.from({ length: len }).map((_, i) => {
        const point = points[i] || {}
        const attempted = Number(point.attempted ?? 0)
        const correct = Number(point.correct ?? 0)
        return {
          formattedDate: String(labels[i] ?? ''),
          practiceTime: attempted, // map attempted -> primary bar
          goalTime: correct,       // map correct -> secondary bar
        }
      })
    }

    // Shape 1: Array of objects
    if (Array.isArray(data)) {
      return data.map(d => ({
        date: d.date instanceof Date ? d.date : new Date(d.date),
        formattedDate: formatDate(d.date instanceof Date ? d.date : new Date(d.date), false),
        practiceTime: Number(d.practiceTime ?? d.practice_time ?? 0),
        goalTime: Number(d.goalTime ?? d.goal_time ?? 0),
      }))
    }

    return []
  }, [data])
  
  // Removed horizontal scroll; chart will be responsive within its container
  
  // Compute dynamic Y-axis upper bound based on data
  const yMax = useMemo(() => {
    if (!Array.isArray(chartData) || chartData.length === 0) return 10
    const maxPoint = chartData.reduce((m, p) => {
      const localMax = Math.max(Number(p.practiceTime || 0), Number(p.goalTime || 0))
      return Math.max(m, localMax)
    }, 0)
    const padding = maxPoint > 0 ? Math.ceil(maxPoint * 0.15) : 10
    return maxPoint + padding
  }, [chartData])

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
      
      {/* Chart Container without horizontal scroll */}
      <div className="flex-1 w-full min-h-[300px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barCategoryGap="20%"
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
                tick={{ fontSize: 12, fill: '#398AC8' }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickMargin={10}
                tickFormatter={(value) => value.toLocaleString()}
                domain={[0, yMax]}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="practiceTime" 
                fill="#0B2848" 
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="goalTime" 
                fill="#3A86D1" 
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: '#0B2848' }}></div>
          <span className="text-sm text-gray-600">Practice Time</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: '#3A86D1' }}></div>
          <span className="text-sm text-gray-600">Goal Time</span>
        </div>
      </div>
    </div>
  )
} 