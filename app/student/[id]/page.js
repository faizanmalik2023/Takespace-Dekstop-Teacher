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

  // Load selected student name from storage if available
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Accept multiple storage keys for robustness
        const possibleKeys = [
          'selected_student_name',
          'selectedStudentName',
          'student_name',
          'studentName'
        ]
        let storedName = null
        for (const key of possibleKeys) {
          storedName = storedName || localStorage.getItem(key) || sessionStorage.getItem(key)
        }
        // Also accept ?name= in URL if provided
        if (!storedName && typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          const n = url.searchParams.get('name')
          if (n) storedName = decodeURIComponent(n)
        }
        if (storedName) setStudentName(storedName)
      }
    } catch (_) {}
  }, [])

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
                questionsData={(() => {
                  const src = progress?.data?.homework_to_classwork_questions
                  const hwRaw = src?.homework
                  const cwRaw = src?.classwork
                  const hw = Number(hwRaw ?? 0)
                  const cw = Number(cwRaw ?? 0)
                  const total = hw + cw
                  const p = (v) => total > 0 ? Math.round((v / total) * 100) : 0
                  return [
                    { name: 'Class', value: cw, displayValue: (cwRaw == null ? '-' : cw), percentage: p(cw), color: '#103358' },
                    { name: 'Home', value: hw, displayValue: (hwRaw == null ? '-' : hw), percentage: p(hw), color: '#398AC8' },
                  ]
                })()}
                timeData={(() => {
                  const src = progress?.data?.homework_to_classwork_time
                  const hwtRaw = src?.homework_time
                  const cwtRaw = src?.classwork_time
                  const hwt = Number(hwtRaw ?? 0)
                  const cwt = Number(cwtRaw ?? 0)
                  const total = hwt + cwt
                  const p = (v) => total > 0 ? Math.round((v / total) * 100) : 0
                  return [
                    { name: 'Class', value: cwt, displayValue: (cwtRaw == null ? '-' : cwt), percentage: p(cwt), color: '#103358' },
                    { name: 'Home', value: hwt, displayValue: (hwtRaw == null ? '-' : hwt), percentage: p(hwt), color: '#398AC8' },
                  ]
                })()}
                rightTopTexts={[
                  `Mastery+ ${statistics?.data?.mastery_plus_percentage != null ? Number(statistics.data.mastery_plus_percentage) : '-' }%`,
                  `Creativity ${progress?.data?.progress_to_date?.creativity != null ? progress.data.progress_to_date.creativity : '-' }`
                ]}
                rightBottomTexts={[
                  `Creativity + ${progress?.data?.progress_to_date?.creativity != null ? progress.data.progress_to_date.creativity : '-' }`
                ]}
              />
            </div>
          </div>
        </div>

        {/* Topics Mastery Section */}
        <div className="p-[20px]">
          <TopicsMasteryChart 
            topicsData={(() => {
              const tbm = progress?.data?.topics_by_mastery || {}
              const asNum = (v) => Number(v ?? 0)
              const get = (key) => ({
                value: asNum(tbm[key]?.count),
                count: asNum(tbm[key]?.count),
                percentage: asNum(tbm[key]?.percentage)
              })
              return [
                { name: 'mastered', color: '#22C55E', ...get('mastered') },
                { name: 'evergreen', color: '#86EFAC', ...get('evergreen') },
                { name: 'yellow', color: '#FCD34D', ...get('yellow') },
                { name: 'green', color: '#3B82F6', ...get('green') },
                { name: 'red', color: '#EF4444', ...get('red') },
                { name: 'difficult', color: '#EF4444', ...get('difficult') },
                { name: 'gray', color: '#9CA3AF', ...get('gray') },
                { name: 'white', color: '#E5E7EB', ...get('white') },
                { name: 'mastery_plus', color: '#0EA5E9', ...get('mastery_plus') },
                { name: 'learning', color: '#A78BFA', ...get('learning') },
                { name: 'haven_started', color: '#CBD5E1', ...get('haven_started') },
              ]
            })()}
            progressData={{
              mastery: Number(progress?.data?.progress_to_date?.mastery ?? 0),
              red: Number(progress?.data?.progress_to_date?.red ?? 0),
              depth: Number(progress?.data?.progress_to_date?.depth ?? 0),
              streak: Number(progress?.data?.progress_to_date?.streak ?? 0),
              memory: Number(progress?.data?.progress_to_date?.memory ?? 0),
            }}
          />
        </div>

        {/* Goals Display Section */}
        <div className="p-[20px]">
          <GoalsDisplayComponent 
            data={(() => {
              const g = progress?.data?.goals
              if (!g) return null

              const num = (v) => (v === null || v === undefined) ? 0 : Number(v)
              const minutesToLabel = (mins) => {
                const m = Number(mins || 0)
                const h = Math.floor(m / 60)
                const mm = m % 60
                return `${h}h ${mm}m`
              }

              return {
                mark: {
                  predicted: num(g.mark?.predicted ?? 0),
                  goal: num(g.mark?.actual ?? 0),
                  unit: ''
                },
                practiceTimeLastWeek: {
                  current: minutesToLabel(num(g.practice_time_last_week?.actual ?? 0)),
                  goal: minutesToLabel(num(g.practice_time_last_week?.predicted ?? 0))
                },
                timeToExam: {
                  predicted: num(g.time_to_exam?.predicted ?? 0),
                  goal: num(g.time_to_exam?.actual ?? 0)
                },
                topicsMastered: {
                  lastWeek: num(g.topics_mastered_last_week?.actual ?? 0),
                  lastWeekGoal: num(g.topics_mastered_last_week?.predicted ?? 0),
                  last30Days: num(g.topics_mastered_last_30_days?.actual ?? 0),
                  last30DaysGoal: num(g.topics_mastered_last_30_days?.predicted ?? 0),
                },
                practiceTimeLast30Days: {
                  current: minutesToLabel(num(g.practice_time_last_30_days?.actual ?? 0)),
                  goal: minutesToLabel(num(g.practice_time_last_30_days?.predicted ?? 0))
                }
              }
            })()}
          />
        </div>

        {/* Units and Topics Section */}
        <div className="p-[20px]">
          <UnitsAndTopicsComponent 
            subtopics={(() => {
              const u = progress?.data?.units_and_topics?.units_and_topics
              // API shape unknown; return empty until schema is finalized
              return Array.isArray(u?.subtopics) ? u.subtopics : []
            })()}
            topics={(() => {
              const u = progress?.data?.units_and_topics?.units_and_topics
              return Array.isArray(u?.topics) ? u.topics : []
            })()}
          />
        </div>
       
      </div>
    </div>
  )
} 