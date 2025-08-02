"use client"

import { useState } from "react"
import { DashboardHeader } from "@/app/components/Header"
import { DashboardSidebar } from "@/app/components/Sidebar"
import UnitsAndTopicsComponent from "@/app/components/UnitsAndTopicsComponent"

export default function LearningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("science")
  const [selectedGrade, setSelectedGrade] = useState("grade-5")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          selectedSubject={selectedSubject}
          selectedGrade={selectedGrade}
          onSubjectChange={setSelectedSubject}
          onGradeChange={setSelectedGrade}
        />
        
        {/* Main Content - Full Screen Units and Topics */}
        <div className="flex-1 overflow-hidden">
          <UnitsAndTopicsComponent 
            fullScreen={true}
            subject={selectedSubject}
            grade={selectedGrade}
          />
        </div>
      </div>
    </div>
  )
}
