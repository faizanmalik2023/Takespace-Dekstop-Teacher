"use client"

export function NoDataMessage({ type = "students", subject, grade }) {
  const getMessage = () => {
    switch (type) {
      case "students":
        return {
          icon: "👥",
          title: "No Students Found",
          description: subject && grade 
            ? `No students found for ${subject} - ${grade}`
            : 'Please select a subject and grade to view students'
        }
      case "subjects":
        return {
          icon: "📚",
          title: "No Subjects Available",
          description: "Unable to load subjects. Please try again."
        }
      case "grades":
        return {
          icon: "🎓",
          title: "No Grades Available", 
          description: "Unable to load grades. Please try again."
        }
      default:
        return {
          icon: "📊",
          title: "No Data Available",
          description: "No data found for the selected criteria."
        }
    }
  }

  const message = getMessage()

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
      <div className="text-gray-400 text-6xl mb-4">{message.icon}</div>
      <div className="text-gray-600 text-xl font-medium mb-2">{message.title}</div>
      <div className="text-gray-400 text-sm text-center max-w-md px-4">
        {message.description}
      </div>
    </div>
  )
}


