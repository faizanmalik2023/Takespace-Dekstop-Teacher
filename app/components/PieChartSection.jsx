"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import VerticalPill from './VerticalPill'

// Custom tooltip for pie charts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const isTimeData = Number(data.value) > 200 // Assuming time values are larger than question counts
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-blue-600">
          {data.name === 'Class' ? 'Classwork' : 'Homework'}: {data.displayValue ?? data.value}
          {isTimeData ? ((data.displayValue === '-' ) ? '' : 'm') : ' Questions'}
        </p>
        <p className="text-sm text-gray-600">{data.percentage}%</p>
      </div>
    )
  }
  return null
}

// Custom Pie Chart with Labels
function CustomPieChart({ data }) {
    // Ensure the pie renders even when all values are 0 by substituting minimal values
    const total = Array.isArray(data) ? data.reduce((sum, d) => sum + Number(d.value || 0), 0) : 0
    const displayData = (total === 0 && Array.isArray(data))
      ? data.map(d => ({ ...d, value: 1 }))
      : data

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={displayData}
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
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    )
  }
  

// Individual Pie Chart Component
function PieChartItem({ data }) {
  // Generate dynamic titles based on data
  const classData = data.find(item => item.name === 'Class') || { value: 0, percentage: 0, displayValue: '-' }
  const homeData = data.find(item => item.name === 'Home') || { value: 0, percentage: 0, displayValue: '-' }
  
  const isTimeData = classData && Number(classData.value) > 200
  const title = isTimeData 
    ? `Classwork Time ${classData?.displayValue ?? classData?.value}${(classData?.displayValue === '-') ? '' : 'm'}`
    : `Classwork Questions ${classData?.displayValue ?? classData?.value}`
  const subtitle = isTimeData 
    ? `Homework Time ${homeData?.displayValue ?? homeData?.value}${(homeData?.displayValue === '-') ? '' : 'm'}`
    : `Homework Questions ${homeData?.displayValue ?? homeData?.value}`

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
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#103358' }}></div>
              <span className="text-xs text-gray-600">Class</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#398AC8' }}></div>
              <span className="text-xs text-gray-600">Home</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* No right-side labels per design */}
    </div>
  )
}

// SidePill no longer used

export default function PieChartSection({ questionsData = [], timeData = [], rightTopTexts = [], rightBottomTexts = [] }) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900">For the chosen period</h3>
      </div>
      
      {/* Pie Charts */}
      <div className="flex-1 flex flex-row items-stretch">
        {/* Left content: two stacked pies */}
        <div className="flex-[1.2] flex flex-col justify-center space-y-12 pr-8">
          {/* Questions Pie Chart */}
          <PieChartItem
            data={Array.isArray(questionsData) && questionsData.length ? questionsData : [
              { name: 'Class', value: 0, percentage: 0, displayValue: '-', color: '#103358' },
              { name: 'Home', value: 0, percentage: 0, displayValue: '-', color: '#398AC8' }
            ]}
          />

          {/* Divider for desktop */}
          <div className="h-px w-full border-t border-[#E5E5EF] my-8" />

          {/* Time Pie Chart */}
          <PieChartItem
            data={Array.isArray(timeData) && timeData.length ? timeData : [
              { name: 'Class', value: 0, percentage: 0, displayValue: '-', color: '#103358' },
              { name: 'Home', value: 0, percentage: 0, displayValue: '-', color: '#398AC8' }
            ]}
          />
        </div>
        {/* Right-side vertical pills - centered column of up to three */}
        <div className="hidden lg:flex flex-col items-center h-full py-2" style={{ width: 'clamp(60px, 7vw, 84px)' }}>
          {(() => {
            const merged = [
              ...((rightTopTexts || [])),
              ...((rightBottomTexts || []))
            ].slice(0, 3)
            return (
              <div className="flex flex-col items-center justify-center h-full w-full" style={{ rowGap: '100px' }}>
                {merged.map((t, i) => (
                  <VerticalPill key={`rp-${i}`} text={t} />
                ))}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
} 