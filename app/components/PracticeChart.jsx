"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { useState, useEffect } from 'react'

// Mock data for the chart - this would come from backend in real implementation
const generateMockData = (dateRange, grade, subject) => {
  const today = new Date()
  const data = []
  
  // Generate data based on date range
  let days = 30 // default
  if (dateRange === 'last-7') days = 7
  else if (dateRange === 'last-90') days = 90
  else if (dateRange === 'last-180') days = 180
  else if (dateRange === 'last-365') days = 365
  
  // Adjust data based on grade and subject for more realistic variation
  const gradeMultiplier = grade === 'all' ? 1 : parseInt(grade.split('-')[1]) * 0.2
  const subjectMultiplier = subject === 'all' ? 1 : 
    subject === 'math' ? 1.2 : 
    subject === 'science' ? 1.1 : 
    subject === 'english' ? 0.9 : 0.8
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Generate more realistic data with some patterns
    const basePracticeTime = Math.floor(Math.random() * 6000) + 500
    const baseGoalTime = Math.floor(Math.random() * 4000) + 300
    
    // Add some weekly patterns (weekends might have different patterns)
    const dayOfWeek = date.getDay()
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.1
    
    const practiceTime = Math.floor(basePracticeTime * gradeMultiplier * subjectMultiplier * weekendMultiplier)
    const goalTime = Math.floor(baseGoalTime * gradeMultiplier * subjectMultiplier)
    
    data.push({
      date: date,
      practiceTime: practiceTime,
      goalTime: goalTime,
      formattedDate: formatDate(date, i === 0)
    })
  }
  
  return data
}

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

export default function PracticeChart({ dateRange, grade, subject }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call delay for more realistic behavior
    const timer = setTimeout(() => {
      setData(generateMockData(dateRange, grade, subject))
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [dateRange, grade, subject])
  
  // Calculate minimum width based on data points
  const minWidth = Math.max(600, data.length * 40) // 40px per data point minimum
  
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="h-full" style={{ minWidth: `${minWidth}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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