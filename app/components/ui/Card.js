export default function Card({ 
  children, 
  className = '',
  padding = 'default'
}) {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}