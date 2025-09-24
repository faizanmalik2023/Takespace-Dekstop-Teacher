"use client"

import { useParams, useRouter } from "next/navigation"
// Removed page-level header; global Navbar is rendered by AppShell
import { useEffect, useState } from "react"
import FilterDropdown from "@/app/components/FilterDropdown"
import PracticeChart from "@/app/components/PracticeChart"
import PieChartSection from "@/app/components/PieChartSection"
import TopicsMasteryChart from "@/app/components/TopicsMasteryChart"
import GoalsDisplayComponent from "@/app/components/GoalsDisplayComponent"
import UnitsAndTopicsComponent from "@/app/components/UnitsAndTopicsComponent"
import { getStudentProgress, getStudentStatistics, updateStudentGoals } from "@/app/lib/api"
// Removed mockStudents; use API-driven data only
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
  // Sidebar state not needed without page-level header
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('last_30_days')
  const [progress, setProgress] = useState(null)
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(false)
  const studentId = parseInt(params.id)
  const [studentName, setStudentName] = useState('Student')

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
        // Try to infer student name from responses if present
        const inferredName = p?.data?.student_name || s?.data?.student_name || p?.data?.student?.name || s?.data?.student?.name
        if (inferredName) setStudentName(inferredName)
      } catch (e) {
        console.error('Failed to load student data', e)
      } finally {
        setLoading(false)
      }
    }
    if (studentId) load()
  }, [studentId, subjectId, selectedDateRange])

  // Always render the page sections, even when data is not available

  return (
    <div className="min-h-screen bg-gray-50">
      
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
            <div className="text=[18px] font-semibold text-[#103358]">{studentName}</div>
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
              <PracticeChart 
                data={progress?.data?.practice_by_day || []}
              />
            </div>
            
            {/* Right Column - Pie Chart Section */}
            <div className="w-full lg:w-[40%] h-full">
              <PieChartSection 
                questionsData={statistics?.data?.homework_to_classwork_questions ? [
                  { name: 'Class', value: statistics?.data?.homework_to_classwork_questions?.classwork || 0, percentage: 0, color: '#3B82F6' },
                  { name: 'Home', value: statistics?.data?.homework_to_classwork_questions?.homework || 0, percentage: 0, color: '#1E40AF' },
                ] : []}
                timeData={statistics?.data?.homework_to_classwork_time ? [
                  { name: 'Class', value: statistics?.data?.homework_to_classwork_time?.classwork_time || 0, percentage: 0, color: '#3B82F6' },
                  { name: 'Home', value: statistics?.data?.homework_to_classwork_time?.homework_time || 0, percentage: 0, color: '#1E40AF' },
                ] : []}
              />
            </div>
          </div>
        </div>

        {/* Topics Mastery Section */}
        <div className="p-[20px]">
          <TopicsMasteryChart 
            topicsData={statistics?.data?.topics_by_mastery || []}
            progressData={{
              mastery: statistics?.data?.progress_to_date?.mastery ?? 0,
              red: statistics?.data?.progress_to_date?.red ?? 0,
              depth: statistics?.data?.progress_to_date?.depth ?? 0,
              streak: statistics?.data?.progress_to_date?.streak ?? 0,
              memory: statistics?.data?.progress_to_date?.memory ?? 0,
            }}
          />
        </div>

        {/* Goals Display Section */}
        <div className="p-[20px]">
          <GoalsDisplayComponent 
            data={statistics?.data?.goals || null}
          />
        </div>

        {/* Units and Topics Section */}
        <div className="p-[20px]">
          <UnitsAndTopicsComponent 
            subtopics={statistics?.data?.subtopics || []}
            topics={statistics?.data?.topics || []}
          />
        </div>
       
      </div>
    </div>
  )
} 