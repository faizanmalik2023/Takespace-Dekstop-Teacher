import { Search, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardHeader({ onMenuClick }) {
  const router = useRouter();
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/takespace-logo.png" alt="logo" className="w-[180px] h-[60px] mb-2" />
          </div>
        </div>

        {/* Search Bar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 " />
            <input
              type="text"
              placeholder="Search for something..."
              className="w-full pl-10 pr-4 py-2 bg-[#398AC8]/10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px] text-gray-400"
            />
          </div>
        </div>

        {/* Navigation Buttons - Right Side */}
        <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
          {/* Mobile search button */}
          <button className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Navigation buttons */}
          <button className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors font-medium" onClick={() => router.push('/learning')}>
            <span className="hidden sm:inline">Learning</span>
            <span className="sm:hidden text-xs">Learn</span>
          </button>
          <button className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors font-medium" onClick={() => router.push('/analytics')}>
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden text-xs">Stats</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar - Shows below header on small screens */}
      <div className="sm:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for something..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </header>
  )
}
