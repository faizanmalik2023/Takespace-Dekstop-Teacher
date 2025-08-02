import Button from './Button';
import { useLocalization } from '../../hooks/useLocalization';

export default function PaymentFailedModal({ isOpen, onClose, onRetry }) {
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
            <div className="w-16 h-16 relative">
              {/* Replace with your failed image */}
              <img 
                src="/icons/payment/failed.svg" 
                alt="Payment Failed"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h3 className="text-lg font-medium text-[#103358] mb-2">
            {t('payment.failed')}
          </h3>
          <p className="text-[#103358] mb-6">
            {t('payment.failedMessage')}
          </p>
          <Button onClick={onRetry} className="w-full">
            {t('payment.tryAgain')}
          </Button>
        </div>
      </div>
    </div>
  );
} 