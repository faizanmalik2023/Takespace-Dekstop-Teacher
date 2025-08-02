'use client';
import { useState } from 'react';
import { DashboardHeader } from "@/app/components/Header"
import StudentBarChart from "@/app/components/StudentBarChart"
import PieChartComponent from "@/app/components/PieChartComponent"
import DifficultTopicsLeaderboard from "@/app/components/DifficultTopicsLeaderboard"
import GoalsComponent from "@/app/components/GoalsComponent"
import FilterDropdown from "@/app/components/FilterDropdown"

// Mock data for dropdowns
const gradeOptions = [
  { id: 'all', label: 'All grades' },
  { id: 'grade-3', label: 'Grade 3' },
  { id: 'grade-4', label: 'Grade 4' },
  { id: 'grade-5', label: 'Grade 5' },
  { id: 'grade-6', label: 'Grade 6' },
]

const subjectOptions = [
  { id: 'all', label: 'All subjects' },
  { id: 'math', label: 'Math' },
  { id: 'science', label: 'Science' },
  { id: 'english', label: 'English' },
  { id: 'geography', label: 'Geography' },
  { id: 'history', label: 'History' },
]

const dateRangeOptions = [
  { id: 'last-7', label: 'Last 7 days' },
  { id: 'last-30', label: 'Last 30 days' },
  { id: 'last-90', label: 'Last 90 days' },
  { id: 'last-180', label: 'Last 180 days' },
  { id: 'last-365', label: 'Last year' },
]

// Mock student data for the bar chart
const mockStudentData = [
  { name: 'John Doe', questions: 125 },
  { name: 'Jane Smith', questions: 98 },
  { name: 'Mike Johnson', questions: 187 },
  { name: 'Sarah Wilson', questions: 156 },
  { name: 'David Brown', questions: 143 },
  { name: 'Lisa Garcia', questions: 89 },
  { name: 'Tom Anderson', questions: 201 },
  { name: 'Emily Davis', questions: 134 },
  { name: 'Chris Miller', questions: 167 },
  { name: 'Anna Taylor', questions: 112 },
  { name: 'Mark Thompson', questions: 78 },
  { name: 'Jessica Lee', questions: 195 },
  { name: 'Ryan Clark', questions: 145 },
  { name: 'Amanda White', questions: 123 },
  { name: 'Kevin Martinez', questions: 168 },
  { name: 'Nicole Rodriguez', questions: 91 },
  { name: 'Brandon Harris', questions: 179 },
  { name: 'Michelle Lewis', questions: 102 },
  { name: 'Jason Walker', questions: 156 },
  { name: 'Stephanie Hall', questions: 134 },
  { name: 'Daniel Allen', questions: 87 },
  { name: 'Rachel Young', questions: 172 },
  { name: 'Andrew King', questions: 148 },
  { name: 'Lauren Wright', questions: 119 },
  { name: 'Justin Lopez', questions: 163 },
  { name: 'John Doe', questions: 125 },
  { name: 'Jane Smith', questions: 98 },
  { name: 'Mike Johnson', questions: 187 },
  { name: 'Sarah Wilson', questions: 156 },
  { name: 'David Brown', questions: 143 },
  { name: 'Lisa Garcia', questions: 89 },
  { name: 'Tom Anderson', questions: 201 },
  { name: 'Emily Davis', questions: 134 },
  { name: 'Chris Miller', questions: 167 },
  { name: 'Anna Taylor', questions: 112 },
  { name: 'Mark Thompson', questions: 78 },
  { name: 'Jessica Lee', questions: 195 },
  { name: 'Ryan Clark', questions: 145 },
  { name: 'Amanda White', questions: 123 },
  { name: 'Kevin Martinez', questions: 168 },
  { name: 'Nicole Rodriguez', questions: 91 },
  { name: 'Brandon Harris', questions: 179 },
  { name: 'Michelle Lewis', questions: 102 },
  { name: 'Jason Walker', questions: 156 },
  { name: 'Stephanie Hall', questions: 134 },
  { name: 'Daniel Allen', questions: 87 },
  { name: 'Rachel Young', questions: 172 },
  { name: 'Andrew King', questions: 148 },
  { name: 'Lauren Wright', questions: 119 },
  { name: 'Justin Lopez', questions: 163 }
]

// Mock data for pie charts
const homeworkClassworkData = [
  { name: 'Homework', value: 7473, percentage: 59.49 },
  { name: 'Classwork', value: 5104, percentage: 40.51 }
]

const timeData = [
  { name: 'Homework Time', value: 651, percentage: 76.1 },
  { name: 'Classwork Time', value: 204, percentage: 23.9 }
]

const teacherEngagementData = [
  { name: 'Engaged', value: 75, percentage: 75 },
  { name: 'Not Engaged', value: 25, percentage: 25 }
]

// Mock data for difficult topics leaderboard
const difficultTopicsData = [
  {
    name: 'Mathematics',
    topics: [
      { id: 'P2-FF.1', name: 'Homophones with pictures', count: 14 },
      { id: 'P2-GG.1', name: 'Multiple-meaning words with pictures', count: 13 },
      { id: 'P2-EE.3', name: 'Choose the antonym', count: 10 },
      { id: 'P4-E.7', name: 'Interpret remainders', count: 9 },
      { id: 'P3-S.25', name: 'Fractions of a number', count: 9 }
    ]
  },
  {
    name: 'English',
    topics: [
      { id: 'P2-FF.1', name: 'Homophones with pictures', count: 14 },
      { id: 'P2-GG.1', name: 'Multiple-meaning words with pictures', count: 13 },
      { id: 'P2-EE.3', name: 'Choose the antonym', count: 10 },
      { id: 'P4-E.7', name: 'Interpret remainders', count: 9 },
      { id: 'P3-S.25', name: 'Fractions of a number', count: 9 }
    ]
  },
  {
    name: 'Science',
    topics: [
      { id: 'P2-FF.1', name: 'Homophones with pictures', count: 14 },
      { id: 'P2-GG.1', name: 'Multiple-meaning words with pictures', count: 13 },
      { id: 'P2-EE.3', name: 'Choose the antonym', count: 10 },
      { id: 'P4-E.7', name: 'Interpret remainders', count: 9 },
      { id: 'P3-S.25', name: 'Fractions of a number', count: 9 }
    ]
  },
  {
    name: 'Geography',
    topics: [
      { id: 'P2-FF.1', name: 'Homophones with pictures', count: 14 },
      { id: 'P2-GG.1', name: 'Multiple-meaning words with pictures', count: 13 },
      { id: 'P2-EE.3', name: 'Choose the antonym', count: 10 },
      { id: 'P4-E.7', name: 'Interpret remainders', count: 9 },
      { id: 'P3-S.25', name: 'Fractions of a number', count: 9 }
    ]
  },
  {
    name: 'History',
    topics: [
      { id: 'P2-FF.1', name: 'Homophones with pictures', count: 14 },
      { id: 'P2-GG.1', name: 'Multiple-meaning words with pictures', count: 13 },
      { id: 'P2-EE.3', name: 'Choose the antonym', count: 10 },
      { id: 'P4-E.7', name: 'Interpret remainders', count: 9 },
      { id: 'P3-S.25', name: 'Fractions of a number', count: 9 }
    ]
  }
]

const imgGroup = "/c8c0fee716a27772f1443d814e6c1e60aa4adee0.svg"



export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('last-30')

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Main Content Area */}
      <div className="p-[2%]">
        {/* Top Section - Title and Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-[2%] gap-4">
          {/* Left Side - Title and Refresh */}
          <div className="flex items-center space-x-2">
            <div className="text-[18px] font-semibold text-[#103358]">Homework questions</div>
            <button 
              onClick={() => {
                console.log('Refresh button clicked');
              }}
              className="hover:opacity-70 transition-opacity"
            >
              <img src="/icons/Refresh.svg" className="w-[20px] h-[20px] mt-1" alt="refresh" />
            </button>
          </div>

          {/* Right Side - Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <FilterDropdown
              label="GRADE"
              value={selectedGrade}
              options={gradeOptions}
              onChange={setSelectedGrade}
            />
            
            <FilterDropdown
              label="SUBJECT"
              value={selectedSubject}
              options={subjectOptions}
              onChange={setSelectedSubject}
            />
            
            <FilterDropdown
              label="DATE RANGE"
              value={selectedDateRange}
              options={dateRangeOptions}
              onChange={setSelectedDateRange}
            />
          </div>
        </div>

        {/* Bar Chart Section For Homework Questions*/}
        <StudentBarChart 
          studentData={mockStudentData}
          average={157}
          goal={120}
        />

        <div className="flex items-center space-x-2 my-[2%]">
            <div className="text-[18px] font-semibold text-[#103358]">Classroom Questions</div>
            <button 
              onClick={() => {
                console.log('Refresh button clicked');
              }}
              className="hover:opacity-70 transition-opacity"
            >
              <img src="/icons/Refresh.svg" className="w-[20px] h-[20px] mt-1" alt="refresh" />
            </button>
          </div>

          {/* Bar Chart Section For Classroom Questions */}
          <StudentBarChart 
          studentData={mockStudentData}
          average={157}
          goal={120}
        />

        {/* Pie Charts Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Question: Homework to Classwork */}
            <PieChartComponent
              title="Question: Homework to Classwork"
              data={homeworkClassworkData}
              type="pie"
              colors={['#103358', '#398AC8']}
            />

            {/* Time: Homework to Classwork */}
            <PieChartComponent
              title="Time: Homework to Classwork (hour)"
              data={timeData}
              type="pie"
              colors={['#103358', '#398AC8']}
            />

            {/* Teacher Engagement */}
            <PieChartComponent
              title="Teacher Engagement"
              data={teacherEngagementData}
              type="donut"
              colors={['#398AC8', '#103358']}
            />
          </div>
        </div>

        {/* Difficult Topics Leaderboard */}
        <DifficultTopicsLeaderboard data={difficultTopicsData} />
        <div className="mt-8 pb-[10%]">
        <div className="text-[18px] font-semibold text-[#103358]">Default Goals For The Chosen Grade(s) And Subject(s)</div>
        {/* Goals Component */}
        <GoalsComponent />
        </div>

      </div>
    </div>
  )
}