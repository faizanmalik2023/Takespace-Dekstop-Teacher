"use client"

import { ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { SidebarLoader } from "./loaders/SidebarLoader.jsx"
import { NoDataMessage } from "./loaders/NoDataMessage.jsx"

// Default fallback data
const defaultSubjects = [
  { id: "math", name: "Math", color: "bg-blue-500", icon: "📊" },
  { id: "science", name: "Science", color: "bg-green-500", icon: "🧪" },
  { id: "english", name: "English", color: "bg-orange-500", icon: "📚" },
]

const defaultGrades = [
  { id: "grade-3", name: "Grade 3", number: "3" },
  { id: "grade-4", name: "Grade 4", number: "4" },
  { id: "grade-5", name: "Grade 5", number: "5" },
  { id: "grade-6", name: "Grade 6", number: "6" },
]

// Book icons array for rotation
const bookIcons = ["/icons/book1.svg", "/icons/book2.svg", "/icons/book3.svg"]

export function DashboardSidebar({ isOpen, onClose, selectedSubject, selectedGrade, onSubjectChange, onGradeChange, subjects = defaultSubjects, grades = defaultGrades, loading = false }) {
  const [subjectOpen, setSubjectOpen] = useState(true)
  const [gradeOpen, setGradeOpen] = useState(true)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed left-0 right-0 bg-black bg-opacity-50 z-40 md:hidden"
          style={{ top: '100px', bottom: 0 }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 z-40
        w-64 bg-white border-r border-gray-200 no-scrollbar
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:translate-x-0 md:block
      `}
        style={{ top: '100px', height: 'calc(100vh - 100px)', overflowY: 'auto' }}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Subject Section */}
        <div className="space-y-2">
          <button
            onClick={() => setSubjectOpen(!subjectOpen)}
            className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-50 rounded p-2 pl-4 transition-colors relative"
          >
            {/* Dark Blue Vertical Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#103358] rounded-r"></div>
            <span className="text-[18px] font-semibold text-[#103358] ml-4">Subject</span>
            <ChevronDown
              className={`w-4 h-4 text-[#103358] transition-transform ${subjectOpen ? "rotate-0" : "-rotate-90"}`}
            />
          </button>
          {subjectOpen && (
            <div className="space-y-1">
              {loading ? (
                <div className="space-y-1">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-3 p-2 pl-4">
                      <div className="w-[26px] h-[26px] bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <div key={subject.id}>
                    <button
                      onClick={() => {
                        onSubjectChange?.(subject)
                        // Close sidebar on mobile after selection
                        if (window.innerWidth < 768) {
                          onClose?.()
                        }
                      }}
                      className={`flex items-center space-x-3 w-full p-2 pl-4 rounded transition-colors ${
                        selectedSubject && selectedSubject.id === subject.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {subject.icon ? (
                          <img 
                            src={subject.icon} 
                            alt={`${subject.name} icon`}
                            className="w-[26px] h-[26px]"
                          />
                        ) : (
                          <img 
                            src={bookIcons[index % bookIcons.length]} 
                            alt={`${subject.name} icon`}
                            className="w-[26px] h-[26px]"
                          />
                        )}
                      </div>
                      <span className="text-[16px] pl-3 text-[#4F4F4F]">{subject.name}</span>
                    </button>
                    {/* Add divider after each subject except the last one */}
                    {index < subjects.length - 1 && (
                      <div className="h-px bg-[#F2F2F2] mx-4"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4">
                  <NoDataMessage type="subjects" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Grade Section */}
        <div className="space-y-2 mt-6">
          <button
            onClick={() => setGradeOpen(!gradeOpen)}
            className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-50 rounded p-2 pl-4 transition-colors relative"
          >
            {/* Dark Blue Vertical Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#103358] rounded-r"></div>
            <span className="text-[18px] font-semibold text-[#103358] pl-4">Grade</span>
            <ChevronDown
              className={`w-4 h-4 text-[#103358] transition-transform ${gradeOpen ? "rotate-0" : "-rotate-90"}`}
            />
          </button>
          {gradeOpen && (
            <div className="space-y-1">
              {loading ? (
                <div className="space-y-1">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center space-x-3 p-2 pl-4">
                      <div className="w-[26px] h-[26px] bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : grades.length > 0 ? (
                grades.map((grade, index) => (
                  <div key={grade.id}>
                    <button
                      onClick={() => {
                        onGradeChange?.(grade)
                        // Close sidebar on mobile after selection
                        if (window.innerWidth < 768) {
                          onClose?.()
                        }
                      }}
                      className={`flex items-center space-x-3 w-full p-2 pl-4 rounded transition-colors ${
                        selectedGrade && selectedGrade.id === grade.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-[26px] h-[26px] bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-[15px] font-medium text-gray-700">{grade.id}</span>
                      </div>
                      <span className="text-[16px] pl-[8px] text-[#4F4F4F]">{grade.name}</span>
                    </button>
                    {/* Add divider after each grade except the last one */}
                    {index < grades.length - 1 && (
                      <div className="h-px bg-[#F2F2F2] mx-4"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4">
                  <NoDataMessage type="grades" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
