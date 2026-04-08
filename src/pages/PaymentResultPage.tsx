import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
interface PaymentResultProps {
  success: boolean;
  orderId?: string;
  email?: string;
}

export const PaymentResult = () => {
  const location = useLocation();
  const { success, orderId, email } = location.state || {};
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {success ? (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-2xl font-semibold text-green-600">
              Thanh toán thành công!
            </h1>
            <p className="mt-2 text-gray-700">
              Cảm ơn bạn đã mua gói dịch vụ. Mã đơn hàng:
              <span className="font-semibold"> #{orderId}</span>
            </p>
            <p className="mt-2 text-gray-500">
              Email xác nhận đã được gửi đến <b>{email}</b>.
            </p>
            <Button
              className="mt-6 w-full"
              onClick={() => (window.location.href = '/')}
            >
              Tiếp tục nghe nhạc
            </Button>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-2xl font-semibold text-red-600">
              Thanh toán thất bại!
            </h1>
            <p className="mt-2 text-gray-700">
              Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.
            </p>
            <Button
              className="mt-6 w-full"
              onClick={() => (window.location.href = '/cart')}
            >
              Quay lại giỏ hàng
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
