"use client"

export function CardLoader() {
  return (
    <div className="w-full mb-4">
      <div className="bg-white min-h-[110px] md:min-h-[90px] lg:min-h-[110px] rounded-[20px] w-full relative shadow-sm p-4 md:p-3 lg:p-4">
        {/* Mobile Layout Loader */}
        <div className="md:hidden">
          {/* Student Info Loader */}
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse mr-3"></div>
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Data Tags Loader */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-6 w-16 bg-gray-200 rounded-[5px] animate-pulse"></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-6 w-20 bg-gray-200 rounded-[5px] animate-pulse"></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2].map((item) => (
                <div key={item} className="h-6 w-24 bg-gray-200 rounded-[5px] animate-pulse"></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-6 w-20 bg-gray-200 rounded-[5px] animate-pulse"></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-6 w-16 bg-gray-200 rounded-[5px] animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet & Desktop Layout Loader */}
        <div className="hidden md:flex items-start gap-3 lg:gap-4">
          {/* Student Info Section Loader */}
          <div className="flex-shrink-0">
            <div className="h-[50px] w-[90px] md:h-[60px] md:w-[100px] lg:h-[60px] lg:w-[111px] bg-gray-200 rounded-xl animate-pulse"></div>
          </div>

          {/* Data Tags Section Loader */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-1.5 items-start">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
                <div key={item} className="h-6 w-16 bg-gray-200 rounded-[5px] animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CardLoaders({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <CardLoader key={index} />
      ))}
    </div>
  )
}


