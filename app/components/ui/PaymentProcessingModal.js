import { useLocalization } from '../../hooks/useLocalization';

export default function PaymentProcessingModal({ isOpen, onClose }) {
  const { t } = useLocalization();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Light overlay background */}
      <div 
        className="fixed inset-0 backdrop-blur-sm" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-26 h-26 relative">
              {/* Replace with your processing image */}
              <img 
                src="/icons/payment/processing.svg" 
                alt="Processing"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h3 className="text-lg font-medium text-[#103358] mb-2">
            {t('payment.processing')}
          </h3>
      
        </div>
      </div>
    </div>
  );
} 