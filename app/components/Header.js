'use client';

export default function Header() {
  return (
    <header className="mt-[40px] ml-[40px] mr-[40px]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl lg:text-3xl font-bold">
          <span className="text-[#103358]">TAKE</span>
          <span className="text-[#398AC8]">SPACE</span>
        </div>
      </div>
    </header>
  );
}

// Export DashboardHeader for compatibility with existing pages
export function DashboardHeader({ onMenuClick }) {
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
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/takespace-logo.png" alt="logo" className="w-[180px] h-[60px] mb-2" />
          </div>
        </div>

        {/* Search Bar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
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
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Navigation buttons */}
          <button className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors font-medium" onClick={() => window.location.href = '/learning'}>
            <span className="hidden sm:inline">Learning</span>
            <span className="sm:hidden text-xs">Learn</span>
          </button>
          <button className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors font-medium" onClick={() => window.location.href = '/analytics'}>
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden text-xs">Stats</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar - Shows below header on small screens */}
      <div className="sm:hidden mt-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for something..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </header>
  );
}
