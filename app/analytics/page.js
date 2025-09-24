"use client"

import { useState, useEffect } from 'react'
import Layout from "../components/layout/Layout"
import I18nProvider from "../components/providers/I18nProvider"
import FilterDropdown from "../components/common/FilterDropdown"
import Chart from "../components/ui/Chart"
import DifficultTopicsLeaderboard from "../components/DifficultTopicsLeaderboard"
import PieChart from "../components/analytics/PieChart"
import GoalsComponent from "../components/GoalsComponent"
import { api } from "../lib/api"

export default function AnalyticsPage() {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ grade: 'All grades', subject: 'All subjects', dateRange: 'Last 30 days' })

  const fetchData = async (currentFilters) => {
    if (pageData) setLoading(true)
    try {
      const data = await api.getTeacherAnalyticsPageData(currentFilters)
      setPageData(data)
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
                <FilterDropdown label="Grade" value={filters.grade} onChange={(v) => handleFilterChange('grade', v)} options={['All grades', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']} />
                <FilterDropdown label="Subject" value={filters.subject} onChange={(v) => handleFilterChange('subject', v)} options={['All subjects', 'Math', 'Science', 'English', 'Geography']} />
                <FilterDropdown label="Date range" value={filters.dateRange} onChange={(v) => handleFilterChange('dateRange', v)} options={['Last 30 days', 'Last 7 days', 'Last 90 days', 'All time', 'Last year', 'Today', 'Yesterday']} />
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

              <DifficultTopicsLeaderboard data={leaderboardData} />

              <div className="w-full lg:w-10/12 xl:w-8/12">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold" style={{ color: '#103358' }}>Default Goals For The Chosen Grade(s) And Subject(s)</h2>
                  <GoalsComponent />
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </I18nProvider>
  )
}
