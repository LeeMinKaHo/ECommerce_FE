import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, ShoppingBag, ReceiptText } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, orderId, email, amount } = location.state || { success: true, orderId: 'ORD-882192', email: 'user@example.com', amount: 99.00 }; // Fallback for preview

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="w-full max-w-lg relative">
        {/* Confetti-like elements for success */}
        {success && (
          <div className="absolute inset-x-0 -top-12 flex justify-center pointer-events-none">
            <div className="animate-bounce delay-100 w-3 h-3 bg-yellow-400 rounded-full mx-2" />
            <div className="animate-bounce delay-300 w-3 h-3 bg-primary rounded-full mx-2" />
            <div className="animate-bounce delay-500 w-3 h-3 bg-secondary rounded-full mx-2" />
          </div>
        )}

        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
          {success ? (
            <div className="animate-in fade-in zoom-in duration-700">
              <div className="relative mx-auto w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
                <div className="relative flex items-center justify-center w-24 h-24 bg-green-50 rounded-full border-4 border-white shadow-sm">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3 font-primary">
                Đơn hàng hoàn tất!
              </h1>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed text-sm">
                Cảm ơn bạn đã tin tưởng mua sắm. Đơn hàng của bạn đã được xác nhận thành công.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <ReceiptText size={16} /> Mã đơn hàng:
                  </span>
                  <span className="font-bold text-gray-900">#{orderId}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-200/50 pt-3">
                  <span className="text-gray-400">Gửi hóa đơn tới:</span>
                  <span className="font-medium text-gray-700">{email}</span>
                </div>
                {amount && (
                  <div className="flex justify-between items-center text-sm border-t border-gray-200/50 pt-3">
                    <span className="text-gray-400">Tổng thanh toán:</span>
                    <span className="font-bold text-primary">${amount}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  onClick={() => navigate('/')}
                >
                  <ShoppingBag size={18} />
                  Tiếp tục mua sắm
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={() => navigate('/orders')}
                >
                  Xem đơn hàng
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-700">
              <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-sm">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3 font-primary">
                Thanh toán chưa hoàn tất
              </h1>
              <p className="text-gray-500 mb-10 max-w-xs mx-auto leading-relaxed text-sm">
                Rất tiếc, giao dịch của bạn đã bị gián đoạn. Đừng lo, tiền của bạn vẫn an toàn.
              </p>

              <Button
                className="w-full h-14 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-xl"
                onClick={() => navigate('/cart')}
              >
                Thử thanh toán lại
              </Button>
              
              <button 
                onClick={() => navigate('/')}
                className="mt-6 text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
              >
                Quay lại trang chủ
              </button>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400">
          Bạn cần hỗ trợ? <Link to="/contact" className="text-primary hover:underline">Liên hệ bộ phận CSKH</Link>
        </p>
      </div>
    </div>
  );
};
