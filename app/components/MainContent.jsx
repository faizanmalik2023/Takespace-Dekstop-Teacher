"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// Helper function to generate avatar initials
const getAvatarInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Helper function to get random background color
const getRandomBgColor = () => {
  const colors = [
    "bg-[#ffe0eb]",
    "bg-[#e0f2fe]", 
    "bg-[#f3e5f5]",
    "bg-[#e8f5e8]",
    "bg-[#fff3e0]",
    "bg-[#f0f4ff]",
    "bg-[#fef7e0]",
    "bg-[#f0fdf4]"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Helper function to format student data from API
const formatStudentData = (student) => {
  const id = student.student_id ?? student.id;
  const name = student.student_name 
    ?? (student.name || ((student.first_name && student.last_name) ? `${student.first_name} ${student.last_name}` : undefined)) 
    ?? 'Unknown Student';
  return {
    id,
    name,
    avatar: getAvatarInitials(name),
    status: student.status || 'Active',
    mastery: 
      student.percentage_of_mastery ?? student.mastery ?? student.mastery_score ?? 0,
    skill: 
      student.red_topic_percentage ?? student.skill ?? student.skill_score ?? 0,
    depth: 
      student.depth_of_mastery ?? student.depth ?? student.depth_score ?? 0,
    markOut: 
      student.mark_goal ?? student.mark_out ?? 0,
    predicted: student.predicted_mark ?? '-',
    timeToEarn: student.time_to_exam ?? student.time_to_earn ?? 0,
    predicted2: student.predicted_time ?? 0,
    timePracticed: student.time_practiced ?? '0h 00m',
    timePracticed2: student.time_practiced_goal ?? '0h 00m',
    topicsMaximized: student.topics_mastered ?? 0,
    topicsMaximized2: student.topics_mastered_goal ?? 0,
    aptitude: student.aptitude ?? 0,
    memory: student.memory ?? 0,
    creativity: student.creativity ?? 0,
    quest: student.quest_count ?? student.quest ?? student.quests_completed ?? 0,
    bgColor: getRandomBgColor(),
  };
};

const imgGroup = "/4244c285388eb776fa80dc8d941b5eac78ab94cd.svg"

const sortOptions = [
  "Mastery",
  "Mastery+", 
  "Homework (questions)",
  "Homework (time)",
  "Homework (days)",
  "Red",
  "Depth",
  "Mark Goal",
  "Predicted Mark",
  "Time to Exam", 
  "Predicted Time",
  "Time Practiced",
  "Time Practiced Goal",
  "Topics Mastered",
  "Aptitude",
  "Memory",
  "Creativity",
  "Quest",
  "Streak",
  "Name Color"
]

// Student Card Component
function StudentCard({ student }) {
  const router = useRouter()
  
  const handleCardClick = () => {
    router.push(`/student/${student.id}`)
  }
  
  return (
    <div className="w-full mb-4" id={`student-${student.id}`}>
      <div 
        className="bg-white min-h-[110px] md:min-h-[90px] lg:min-h-[110px] rounded-[20px] w-full relative shadow-sm p-4 md:p-3 lg:p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={handleCardClick}
      >
        
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Student Info */}
          <div className="flex items-center mb-4">
            <div className={`${student.bgColor} h-12 w-12 rounded-xl flex items-center justify-center mr-3`}>
              <span className="text-sm font-medium text-gray-800">{student.avatar}</span>
            </div>
            <div>
              <p className="font-medium text-base text-black" style={{ fontFamily: 'Poppins' }}>
                {student.name}
              </p>
              <p className="italic text-xs text-black" style={{ fontFamily: 'Poppins' }}>
                {student.status}
              </p>
            </div>
          </div>
          
          {/* Mobile Data Tags - Stacked */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <DataTag label="Mastery" value={student.mastery} unit="%" />
              <DataTag label="Red" value={student.skill} unit="%" />
              <DataTag label="Depth" value={student.depth} />
              <DataTag label="Mark Goal" value={student.markOut} unit="%" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <DataTag label="Predicted Mark" value={student.predicted} />
              <DataTag label="Time to Exam" value={student.timeToEarn} />
              <DataTag label="Predicted Time" value={student.predicted2} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <DataTag label="Time Practiced" value={student.timePracticed} />
              <DataTag label="Time Practiced Goal" value={student.timePracticed2} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <DataTag label="Topics Mastered" value={student.topicsMaximized} />
              <DataTag label="Topics Mastered Goal" value={student.topicsMaximized2} />
              <DataTag label="Aptitude" value={student.aptitude} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <DataTag label="Memory" value={student.memory} />
              <DataTag label="Creativity" value={student.creativity} />
              <DataTag label="Quests" value={student.quest} />
            </div>
          </div>
        </div>

        {/* Tablet & Desktop Layout */}
        <div className="hidden md:flex items-start gap-3 lg:gap-4">
          {/* Student Info Section - Responsive */}
          <div className="flex-shrink-0">
            <div className={`${student.bgColor} h-[50px] w-[90px] md:h-[60px] md:w-[100px] lg:h-[60px] lg:w-[111px] rounded-xl flex items-center justify-center relative`}>
              <div className="text-center">
                <p className="font-medium text-[12px] md:text-[14px] lg:text-[16px] mb-0 text-black leading-tight" style={{ fontFamily: 'Poppins' }}>
                  {student.name}
                </p>
                <p className="italic text-[8px] md:text-[9px] lg:text-[10px] text-black leading-tight" style={{ fontFamily: 'Poppins' }}>
                  {student.status}
                </p>
              </div>
            </div>
          </div>

          {/* Data Tags Section - Flexible Layout */}
          <div className="flex-1 min-w-0">
            {/* All Tags - Responsive Grid/Wrap */}
            <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-1.5 items-start">
              <DataTag label="Mastery" value={student.mastery} unit="%" />
              <DataTag label="Red" value={student.skill} unit="%" />
              <DataTag label="Depth" value={student.depth} />
              <DataTag label="Mark Goal" value={student.markOut} unit="%" />
              <DataTag label="Predicted Mark" value={student.predicted} />
              <DataTag label="Time to Exam" value={student.timeToEarn} />
              <DataTag label="Predicted Time" value={student.predicted2} />
              <DataTag label="Time Practiced" value={student.timePracticed} />
              <DataTag label="Time Practiced Goal" value={student.timePracticed2} />
              <DataTag label="Topics Mastered" value={student.topicsMaximized} />
              <DataTag label="Topics Mastered Goal" value={student.topicsMaximized2} />
              <DataTag label="Aptitude" value={student.aptitude} />
              <DataTag label="Memory" value={student.memory} />
              <DataTag label="Creativity" value={student.creativity} />
              <DataTag label="Quests" value={student.quest} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Data Tag Component - Responsive Sizing
function DataTag({ label, value, unit = "" }) {
  return (
    <div className="bg-[rgba(57,138,200,0.12)] rounded-[5px] shrink-0 border-[0.5px] border-[rgba(57,138,200,0.12)]">
      <div className="flex flex-row gap-0.5 items-center justify-center overflow-clip px-1.5 md:px-2 lg:px-2.5 py-1 md:py-1 lg:py-1.5">
        <div className="text-[9px] md:text-[10px] lg:text-[12px] leading-[12px] md:leading-[14px] lg:leading-[16px] text-black whitespace-nowrap">
          <span className="font-normal">{label} </span>
          <span className="font-bold">{value}</span>
          {unit && <span className="font-normal">{unit}</span>}
        </div>
      </div>
    </div>
  )
}

export function MainContent({ selectedSubject, selectedGrade, students = [], loading = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [sortBy, setSortBy] = useState("Name")
  
  // Format students data for display
  const formattedStudents = students.map(formatStudentData);

  return (
    <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          {selectedSubject && selectedGrade 
            ? `${selectedSubject.name} ${selectedGrade.name}` 
            : 'Select Subject and Grade'
          }
        </h1>
        
        {/* Figma-styled Dropdown */}
        <div className="relative w-full sm:w-auto">
          <div
            className="bg-white box-border content-stretch flex flex-col gap-2 items-start justify-center px-0 py-[5px] relative rounded-[10px] cursor-pointer w-full sm:w-auto"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ 
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.05)"
            }}
          >
            <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-2 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0">
                <div className="box-border content-stretch flex flex-col gap-0.5 items-start justify-start p-0 relative shrink-0">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] font-semibold ml-0 mt-0 not-italic relative text-[#103358] text-[12px] md:text-[14px] text-left text-nowrap">
                      <p className="block leading-[18px] md:leading-[20px] whitespace-pre">{`Sort by: ${sortBy}  `}</p>
                    </div>
                    <div className="[grid-area:1_/_1] h-[9px] ml-[160px] md:ml-[197px] mt-1.5 overflow-clip relative w-[15px]">
                      <div className="absolute bottom-[6.25%] left-[1.875%] right-[1.875%] top-[6.25%]">
                        <img
                          alt="dropdown arrow"
                          className="block max-w-none size-full"
                          src={imgGroup}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-[249px] bg-white rounded-bl-[10px] rounded-br-[10px] z-20"
                 style={{ 
                   border: "1px solid rgba(0,0,0,0.05)",
                   boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.05)"
                 }}>
              <div className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full pb-3 max-h-64 overflow-y-auto">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-[6px] relative shrink-0 w-full"
                  >
                    <div
                      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2.5 py-1 relative rounded shrink-0 w-full hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSortBy(option)
                        setIsDropdownOpen(false)
                      }}
                    >
                      <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#1d1d1d] text-[12px] md:text-[14px] text-left text-nowrap">
                        <p className="block leading-[18px] md:leading-[20px] whitespace-pre">{option}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Student Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-[#103358]">Loading students...</div>
          </div>
        ) : formattedStudents.length > 0 ? (
          formattedStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <div className="text-gray-400 text-4xl mb-2">👥</div>
            <div className="text-gray-500 text-lg mb-1">No Students Found</div>
            <div className="text-gray-400 text-sm text-center">
              {selectedSubject && selectedGrade 
                ? `No students found for ${selectedSubject.name} - ${selectedGrade.name}`
                : 'Please select a subject and grade to view students'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
