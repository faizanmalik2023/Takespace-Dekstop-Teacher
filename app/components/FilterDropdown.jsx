import { useState } from "react"

// Individual Dropdown Component
const imgGroup = "/c8c0fee716a27772f1443d814e6c1e60aa4adee0.svg"

export default function FilterDropdown({ label, value, options, onChange, width }) {
    const [isOpen, setIsOpen] = useState(false)
    
    const selectedOption = options.find(opt => opt.id === value) || options[0]
  
    return (
      <div className="relative">
        <div
          className={`bg-white box-border content-stretch flex flex-col gap-2 items-start justify-center px-0 py-[5px] relative rounded-[10px] shrink-0 cursor-pointer ${width || 'w-auto'}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.05)"
          }}
        >
          <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-2 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-0.5 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="font-semibold text-[#103358] text-[14px] flex-1 pr-3">
                    <p className="leading-[20px]" style={{ fontFamily: 'Poppins' }}>
                      <span>{label}: </span>
                      <span className="font-normal">{selectedOption.label}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-[12px] h-[12px] flex items-center justify-center">
                    <img
                      alt="dropdown arrow"
                      className="w-[11.83px] h-[6.726px]"
                      src={imgGroup}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute top-full mt-2 bg-white rounded-[10px] z-20 w-full min-w-[200px]"
            style={{
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.05)"
            }}
          >
            <div className="py-2">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    onChange(option.id)
                    setIsOpen(false)
                  }}
                >
                  <span className="text-[14px] text-[#103358]" style={{ fontFamily: 'Poppins' }}>
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }