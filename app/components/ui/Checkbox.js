export default function Checkbox({
  checked,
  onChange,
  label,
  className = '',
  error
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-[#103358] bg-white border-gray-300 rounded focus:ring-[#103358] focus:ring-2 checked:bg-[#103358] checked:border-[#103358] accent-[#103358]"
      />
      {label && (
        <label className="ml-2 text-sm text-[#103358]">
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-sm text-[#C8393B]">{error}</p>}
    </div>
  );
}