"use client"

import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/app/components/Header"
import { useEffect, useState } from "react"
import FilterDropdown from "@/app/components/FilterDropdown"
import PracticeChart from "@/app/components/PracticeChart"
import PieChartSection from "@/app/components/PieChartSection"
import TopicsMasteryChart from "@/app/components/TopicsMasteryChart"
import GoalsDisplayComponent from "@/app/components/GoalsDisplayComponent"
import UnitsAndTopicsComponent from "@/app/components/UnitsAndTopicsComponent"
import { getStudentProgress, getStudentStatistics, updateStudentGoals } from "@/app/lib/api"
// Mock students data (same as in MainContent)
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    avatar: "JD",
    status: "Manual",
    mastery: "39",
    skill: "12",
    depth: "1.5",
    markOut: "75",
    predicted: "-",
    timeToEarn: "2.5",
    predicted2: "1",
    timePracticed: "7h 08m",
    timePracticed2: "6h 23m",
    topicsMaximized: "7",
    topicsMaximized2: "5",
    aptitude: "1",
    memory: "2",
    creativity: "8",
    quest: "27",
    bgColor: "bg-[#ffe0eb]",
  },
  {
    id: 2,
    name: "Nil Simon",
    avatar: "NS",
    status: "Manual",
    mastery: "42",
    skill: "15",
    depth: "2.1",
    markOut: "80",
    predicted: "B+",
    timeToEarn: "3.2",
    predicted2: "2",
    timePracticed: "8h 15m",
    timePracticed2: "7h 30m",
    topicsMaximized: "9",
    topicsMaximized2: "8",
    aptitude: "2",
    memory: "3",
    creativity: "7",
    quest: "31",
    bgColor: "bg-[#e0f2fe]",
  },
  {
    id: 3,
    name: "Steve Jobs",
    avatar: "SJ",
    status: "Manual",
    mastery: "35",
    skill: "18",
    depth: "1.8",
    markOut: "70",
    predicted: "B",
    timeToEarn: "4.1",
    predicted2: "3",
    timePracticed: "6h 45m",
    timePracticed2: "8h 00m",
    topicsMaximized: "6",
    topicsMaximized2: "7",
    aptitude: "3",
    memory: "1",
    creativity: "9",
    quest: "24",
    bgColor: "bg-[#f3e5f5]",
  },
  {
    id: 4,
    name: "Bill Gates",
    avatar: "BG",
    status: "Manual",
    mastery: "48",
    skill: "22",
    depth: "2.8",
    markOut: "85",
    predicted: "A-",
    timeToEarn: "2.1",
    predicted2: "1",
    timePracticed: "9h 20m",
    timePracticed2: "6h 45m",
    topicsMaximized: "11",
    topicsMaximized2: "9",
    aptitude: "4",
    memory: "4",
    creativity: "6",
    quest: "35",
    bgColor: "bg-[#e8f5e8]",
  },
  {
    id: 5,
    name: "Alexa",
    avatar: "A",
    status: "Absent",
    mastery: "25",
    skill: "8",
    depth: "1.2",
    markOut: "60",
    predicted: "C",
    timeToEarn: "5.8",
    predicted2: "4",
    timePracticed: "4h 30m",
    timePracticed2: "5h 15m",
    topicsMaximized: "4",
    topicsMaximized2: "6",
    aptitude: "1",
    memory: "2",
    creativity: "5",
    quest: "18",
    bgColor: "bg-[#fff3e0]",
  },
]
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
  { id: 'last_7_days', label: 'Last 7 days' },
  { id: 'last_30_days', label: 'Last 30 days' },
  { id: 'last_year', label: 'Last year' },
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
]
const imgGroup = "/c8c0fee716a27772f1443d814e6c1e60aa4adee0.svg"

export default function StudentInfoPage() {
  const params = useParams()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('last_30_days')
  const [progress, setProgress] = useState(null)
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(false)
  const studentId = parseInt(params.id)
  const student = mockStudents.find(s => s.id === studentId)

  // TODO: Replace with real subject selection; default to Math:1 for now
  const subjectId = 1

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [p, s] = await Promise.all([
          getStudentProgress(studentId, subjectId, selectedDateRange),
          getStudentStatistics(studentId, subjectId, selectedDateRange)
        ])
        setProgress(p)
        setStatistics(s)
      } catch (e) {
        console.error('Failed to load student data', e)
      } finally {
        setLoading(false)
      }
    }
    if (studentId) load()
  }, [studentId, subjectId, selectedDateRange])

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
         <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 p-4 md:p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Student Not Found</h1>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 p-4 md:p-6">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Students
        </button>

        {/* Student Header */}
       <div className="p-[20px]">
       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-[2%] gap-4">
          {/* Left Side - Title and Refresh */}
          <div className="flex items-center space-x-2">
            <div className="text-[18px] font-semibold text-[#103358]">{student.name}</div>
           
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

       </div>
        
        {/* Chart Section - Two Column Layout */}
        <div className="p-[20px]">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left Column - Chart */}
            <div className="w-full lg:w-[60%]">
              {loading && (
                <div className="h-72 flex items-center justify-center">Loading...</div>
              )}
              {!loading && progress && (
                <PracticeChart 
                  dateRange={selectedDateRange}
                  grade={selectedGrade}
                  subject={selectedSubject}
                />
              )}
            </div>
            
            {/* Right Column - Pie Chart Section */}
            <div className="w-full lg:w-[40%] h-full">
              {progress && (
                <PieChartSection 
                  dateRange={selectedDateRange}
                  grade={selectedGrade}
                  subject={selectedSubject}
                />
              )}
            </div>
          </div>
        </div>

        {/* Topics Mastery Section */}
        <div className="p-[20px]">
          <TopicsMasteryChart 
            dateRange={selectedDateRange}
            grade={selectedGrade}
            subject={selectedSubject}
          />
        </div>

        {/* Goals Display Section */}
        <div className="p-[20px]">
          <GoalsDisplayComponent 
            dateRange={selectedDateRange}
            grade={selectedGrade}
            subject={selectedSubject}
          />
        </div>

        {/* Units and Topics Section */}
        <div className="p-[20px]">
          <UnitsAndTopicsComponent 
            dateRange={selectedDateRange}
            grade={selectedGrade}
            subject={selectedSubject}
          />
        </div>
       
      </div>
    </div>
  )
} 