export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  className = '' 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}