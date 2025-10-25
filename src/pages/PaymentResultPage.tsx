import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
interface PaymentResultProps {
   success: boolean;
   orderId?: string;
   email?: string;
}

export const PaymentResult = () => {
   const location = useLocation();
   const { success, orderId, email } = location.state || {};
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
         <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
            {success ? (
               <>
                  <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                  <h1 className="text-2xl font-semibold mt-4 text-green-600">
                     Thanh toán thành công!
                  </h1>
                  <p className="mt-2 text-gray-700">
                     Cảm ơn bạn đã mua gói dịch vụ. Mã đơn hàng:
                     <span className="font-semibold"> #{orderId}</span>
                  </p>
                  <p className="text-gray-500 mt-2">
                     Email xác nhận đã được gửi đến <b>{email}</b>.
                  </p>
                  <Button
                     className="mt-6 w-full"
                     onClick={() => (window.location.href = "/")}
                  >
                     Tiếp tục nghe nhạc
                  </Button>
               </>
            ) : (
               <>
                  <XCircle className="text-red-500 w-16 h-16 mx-auto" />
                  <h1 className="text-2xl font-semibold mt-4 text-red-600">
                     Thanh toán thất bại!
                  </h1>
                  <p className="mt-2 text-gray-700">
                     Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại
                     sau.
                  </p>
                  <Button
                     className="mt-6 w-full"
                     onClick={() => (window.location.href = "/cart")}
                  >
                     Quay lại giỏ hàng
                  </Button>
               </>
            )}
         </div>
      </div>
   );
};
