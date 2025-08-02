"use client"

import { useState } from "react"
import { DashboardHeader } from "@/app/components/Header"
import { DashboardSidebar } from "@/app/components/Sidebar"
import { MainContent } from "@/app/components/MainContent"

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("science")
  const [selectedGrade, setSelectedGrade] = useState("grade-5")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          selectedSubject={selectedSubject}
          selectedGrade={selectedGrade}
          onSubjectChange={setSelectedSubject}
          onGradeChange={setSelectedGrade}
        />
        
        {/* Main Content */}
        <MainContent />
      </div>
    </div>
  )
}
