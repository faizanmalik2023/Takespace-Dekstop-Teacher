// components/ui/Toggle.jsx
export default function Toggle({ 
  isOn = false, 
  onToggle,
  size = 'default',
  color = '#103358',
  className = '',
  disabled = false 
}) {
  const sizes = {
    small: { 
      width: '40px', 
      height: '22px', 
      circle: '18px',
      translate: '18px'
    },
    default: { 
      width: '50px', 
      height: '28px', 
      circle: '24px',
      translate: '22px'
    },
    large: { 
      width: '60px', 
      height: '34px', 
      circle: '30px',
      translate: '26px'
    }
  };

  const currentSize = sizes[size];

  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      style={{
        width: currentSize.width,
        height: currentSize.height,
        background: isOn ? color : '#E5E7EB',
        borderRadius: currentSize.height,
        focusRingColor: color
      }}
    >
      {/* Toggle Circle */}
      <div
        className="bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out"
        style={{
          width: currentSize.circle,
          height: currentSize.circle,
          transform: isOn ? `translateX(${currentSize.translate})` : 'translateX(2px)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      />
    </button>
  );
}