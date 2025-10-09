"use client"

import { useState, useEffect } from 'react'
import Layout from "../components/layout/Layout"
import I18nProvider from "../components/providers/I18nProvider"
import FilterDropdown from "../components/common/FilterDropdown"
import Chart from "../components/ui/Chart"
import DifficultTopicsLeaderboard from "../components/DifficultTopicsLeaderboard"
import PieChart from "../components/analytics/PieChart"
import GoalsComponent from "../components/GoalsComponent"
import SuccessMessage from "../components/common/SuccessMessage"
import ErrorMessage from "../components/common/ErrorMessage"
import { toast } from 'react-toastify'
import { api } from "../lib/api"
import { GRADE_LABELS, SUBJECT_LABELS, DATE_RANGE_LABELS } from "../lib/enum"

export default function AnalyticsPage() {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ grade: 'All grades', subject: 'All subjects', dateRange: 'Last 30 days' })
  const [goals, setGoals] = useState({ practiceTime: 5, topicsMastered: 5, examDate: '' })
  const [savingGoals, setSavingGoals] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState('')
  const [saveError, setSaveError] = useState('')

  const fetchData = async (currentFilters) => {
    if (pageData) setLoading(true)
    try {
      const data = await api.getTeacherAnalyticsPageData(currentFilters)
      setPageData(data)
      if (data.goals) setGoals(data.goals)
    } catch (e) {
      console.error('Failed to load analytics', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    fetchData(newFilters)
  }

  const handleGoalChange = (e) => {
    const { name, value } = e.target
    setGoals(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveGoals = async () => {
    setSaveSuccess('')
    setSaveError('')

    if (!goals.examDate) {
      setSaveError('Exam date is required.')
      return
    }
    const today = new Date()
    const exam = new Date(goals.examDate)
    if (exam <= today) {
      setSaveError('Exam date must be in the future.')
      return
    }

    if (filters.grade === 'All grades' || filters.subject === 'All subjects') {
      setSaveError('Please select a specific grade and subject.')
      return
    }

    setSavingGoals(true)
    try {
      const resp = await api.updateSubjectGoals(
        { grade: filters.grade, subject: filters.subject },
        { practiceTime: goals.practiceTime, topicsMastered: goals.topicsMastered, examDate: goals.examDate }
      )
      // API returns 204 No Content on success. Our api layer returns null for 204.
      setSaveSuccess('Goals updated successfully.')
      toast.success('Goals updated successfully')
    } catch (err) {
      console.error(err)
      const message = err?.message || 'Failed to update goals.'
      setSaveError(message)
      toast.error(message)
    } finally {
      setSavingGoals(false)
    }
  }

  if (loading && !pageData) {
    return (
      <I18nProvider>
        <Layout showSidebar={false}>
          <div className="flex justify-center items-center h-screen">Loading...</div>
        </Layout>
      </I18nProvider>
    )
  }

  if (!pageData) {
    return (
      <I18nProvider>
        <Layout showSidebar={false}>
          <div className="flex justify-center items-center h-screen">Error loading data</div>
        </Layout>
      </I18nProvider>
    )
  }

  const homeworkToClassworkData = pageData.charts?.homeworkToClasswork?.data?.map((d) => ({ label: d.label, value: d.value })) || []
  const timeComparisonData = pageData.charts?.timeComparison?.data?.map((d) => ({ label: d.label, value: d.value })) || []

  // Convert leaderboard format used by admin page to our component format
  const leaderboardData = Object.keys(pageData.leaderboard || {}).map((subjectKey) => ({
    name: subjectKey,
    topics: pageData.leaderboard[subjectKey]
  }))

  const studentBarLabels = pageData.homeworkQuestions.labels || []
  const studentBarData = pageData.homeworkQuestions.data || []
  const homeworkChartData = {
    labels: studentBarLabels,
    datasets: [{
      label: 'Homework Questions',
      data: studentBarData,
      backgroundColor: '#398AC8',
      borderRadius: 4,
      barThickness: 'flex',
      maxBarThickness: 32,
    }]
  }

  const classroomChartData = {
    labels: pageData.classroomQuestions.labels || [],
    datasets: [{
      label: 'Classroom Questions',
      data: pageData.classroomQuestions.data || [],
      backgroundColor: '#398AC8',
      borderRadius: 4,
      barThickness: 'flex',
      maxBarThickness: 32,
    }]
  }

  return (
    <I18nProvider>
      <Layout showSidebar={false}>
        <div className="w-full min-h-screen bg-[#F8F9FA] px-4 py-4 sm:p-6">
          <div className="max-w-[1297px] mx-auto space-y-4 sm:space-y-6">
            <header className="flex flex-wrap justify-between items-center gap-4">
              <h1 className="font-bold text-xl sm:text-2xl" style={{ color: '#103358' }}>Teacher Analytics</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                <FilterDropdown label="Grade" value={filters.grade} onChange={(v) => handleFilterChange('grade', v)} options={GRADE_LABELS} />
                <FilterDropdown label="Subject" value={filters.subject} onChange={(v) => handleFilterChange('subject', v)} options={SUBJECT_LABELS} />
                <FilterDropdown label="Date range" value={filters.dateRange} onChange={(v) => handleFilterChange('dateRange', v)} options={DATE_RANGE_LABELS} />
              </div>
            </header>

            <main className="space-y-4 sm:space-y-6 relative">
              {loading && pageData && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                  <div className="text-base sm:text-lg font-semibold">Loading...</div>
                </div>
              )}

              <Chart
                type="bar"
                data={homeworkChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
                title={'Homework Questions'}
                showGoalLine
                goalValue={pageData.homeworkQuestions.goal}
                showAverage
                averageValue={pageData.homeworkQuestions.average}
                className="border border-black/5"
                height="350px"
              />

              <Chart
                type="bar"
                data={classroomChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
                title={'Classroom Questions'}
                showGoalLine
                goalValue={pageData.classroomQuestions.goal}
                showAverage
                averageValue={pageData.classroomQuestions.average}
                className="border border-black/5"
                height="350px"
              />

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
                  <PieChart title={'Question: Homework to Classwork'} data={homeworkToClassworkData} colors={['#398AC8', '#103358']} />
                  <PieChart title={'Time: Homework to Classwork (hour)'} data={timeComparisonData} colors={['#398AC8', '#103358']} />
                  <div className="flex flex-col items-center">
                    <h3 className="mb-2 sm:mb-4 text-center text-base sm:text-lg font-semibold" style={{ color: '#103358' }}>Teacher Engagement</h3>
                    <div className="relative w-40 h-40 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(#103358 0% ${pageData.charts?.teacherEngagement?.percentage || 0}%, #398AC8 ${pageData.charts?.teacherEngagement?.percentage || 0}% 100%)` }}>
                      <div className="absolute w-[88%] h-[88%] bg-white rounded-full flex items-center justify-center">
                        <span className="text-3xl font-semibold" style={{ color: '#103358' }}>{pageData.charts?.teacherEngagement?.percentage || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difficult Topic Leaderboard - exact same layout */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold" style={{ color: '#398AC8' }}>Difficult Topic Leaderboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
                  {Object.keys(pageData.leaderboard || {}).length > 0 ? (
                    Object.keys(pageData.leaderboard).map(subjectKey => (
                      <div key={subjectKey}>
                        <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold capitalize" style={{ color: '#103358' }}>{subjectKey}</h3>
                        <div className="space-y-2 sm:space-y-3">
                          {pageData.leaderboard[subjectKey].map((topic, idx) => (
                            <div key={`${subjectKey}-${topic.id || topic.name}-${idx}`} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-[#F0F7FF]">
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <span className="text-xs sm:text-sm text-gray-800 truncate">{topic.name}</span>
                                <div className="w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] bg-[#FF0000] flex-shrink-0" />
                              </div>
                              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
                                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="#398AC8" strokeWidth="2"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" /><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" /></svg>
                                <span className="text-xs sm:text-sm font-medium text-[#398AC8]">{topic.count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500 text-sm">No data available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-10/12 xl:w-8/12">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold" style={{ color: '#103358' }}>Default Goals For The Chosen Grade(s) And Subject(s)</h2>
                  {saveSuccess && (
                    <div className="mb-4"><SuccessMessage message={saveSuccess} /></div>
                  )}
                  {saveError && (
                    <div className="mb-4"><ErrorMessage message={saveError} /></div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-start">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block mb-1 text-sm sm:text-base font-semibold" style={{ color: '#103358' }}>Practice Time</label>
                      <p className="text-xs sm:text-sm mb-2 text-gray-800">Per week, in hours</p>
                      <input type="number" name="practiceTime" value={goals.practiceTime} onChange={handleGoalChange} className="w-full p-2 sm:p-2.5 bg-[#F9FAFB] rounded-md text-gray-900 text-sm sm:text-base border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block mb-1 text-sm sm:text-base font-semibold" style={{ color: '#103358' }}>Topics Mastered</label>
                      <p className="text-xs sm:text-sm mb-2 text-gray-800">Per week</p>
                      <input type="number" name="topicsMastered" value={goals.topicsMastered} onChange={handleGoalChange} className="w-full p-2 sm:p-2.5 bg-[#F9FAFB] rounded-md text-gray-900 text-sm sm:text-base border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block mb-1 text-sm sm:text-base font-semibold" style={{ color: '#103358' }}>Exam Date</label>
                      <p className="text-xs sm:text-sm mb-2 text-gray-800">Select exam date</p>
                      <input 
                        type="date"
                        name="examDate" 
                        value={goals.examDate} 
                        onChange={handleGoalChange} 
                        className="w-full p-2 sm:p-2.5 bg-[#F9FAFB] rounded-md text-gray-900 text-sm sm:text-base border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 flex justify-end">
                    <button type="button" onClick={handleSaveGoals} disabled={savingGoals} className={`px-4 py-2 rounded-md text-white ${savingGoals ? 'bg-[#398AC8]/60 cursor-not-allowed' : 'bg-[#398AC8] hover:bg-[#103358]'} transition-colors`}>
                      {savingGoals ? 'Saving...' : 'saveGoals'}
                    </button>
                  </div>
                  <style jsx>{`
                    input[type='date']::-webkit-calendar-picker-indicator { 
                      color: #000000;
                      cursor: pointer;
                      opacity: 1;
                    }
                    input[type='date']::-webkit-calendar-picker-indicator:hover { 
                      opacity: 0.8;
                    }
                    input[type='date'] { 
                      appearance: none; 
                      -webkit-appearance: none; 
                    }
                  `}</style>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </I18nProvider>
  )
}
