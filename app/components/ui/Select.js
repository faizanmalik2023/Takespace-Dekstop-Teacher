export default function Select({ 
  options = [], 
  value, 
  onChange, 
  placeholder, 
  error,
  className = '' 
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#398AC8] focus:border-transparent appearance-none bg-white text-[#103358] ${error ? 'border-red-500' : ''} ${className}`}
      >
        {placeholder && <option value="" className="text-gray-400">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value} className="text-[#103358]">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="mt-1 text-sm text-[#C8393B]">{error}</p>}
    </div>
  );
}