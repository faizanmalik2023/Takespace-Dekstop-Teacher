import Button from './Button';
import { useLocalization } from '../../hooks/useLocalization';

export default function PaymentSuccessModal({ isOpen, onClose }) {
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
              {/* Replace with your success image */}
              <img 
                src="/icons/payment/success.svg" 
                alt="Success"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#103358] mb-2">
            {t('payment.success')}
          </h3>
          <p className="text-[#103358] mb-6">
            {t('payment.reviewGoals')}
          </p>
        </div>
      </div>
    </div>
  );
} 