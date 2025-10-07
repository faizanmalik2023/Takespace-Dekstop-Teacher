"use client"

export function SidebarLoader() {
  return (
    <div className="space-y-4 p-4">
      {/* Subject Section Loader */}
      <div className="space-y-2">
        <div className="flex items-center justify-between w-full p-2 pl-4">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-1">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-3 p-2 pl-4">
              <div className="w-[26px] h-[26px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Section Loader */}
      <div className="space-y-2 mt-6">
        <div className="flex items-center justify-between w-full p-2 pl-4">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-1">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center space-x-3 p-2 pl-4">
              <div className="w-[26px] h-[26px] bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


