import { CallActionButton } from '@/components/button/CallActionButton';
import { usePayPalCheckout } from '@/hooks/usePayPalCheckout';
import React, { useEffect, useState } from 'react';
import PaypalIcon from '@/assets/images/paypal.png';
import VisaIcon from '@/assets/images/visa_icon.png';
import PayPalButton from '@/components/button/PaypalButton';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceApi } from '@/service/InvoiceInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { shippingInfo } from '@/types/invoice';
import { toast } from 'sonner';
import { MESSAGES as msg } from '@/constant/Message';
export type CheckOutFormFields = z.infer<typeof schema>;
const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  address: z.string().min(5),
  orderNote: z.string().optional(),
});
export const CheckOutPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<
    'paypal' | 'cod' | 'card' | null
  >(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckOutFormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<CheckOutFormFields> = async (data) => {
    try {
      console.log('Submitting data:', data);
      // const response = await invoiceApi.createInvoice(data)
      // toast.success(msg.CHECKOUT.SUCCESS);
      // ✅ Truyền dữ liệu sang trang Review
      navigate('/order-summary', { state: { data } });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const location = useLocation();

  return (
    <div className="container mx-auto px-6 py-4">
      <form className="mt-11" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-[130px]">
          <div className="flex-1">
            <p className="font-secondary text-2xl font-bold">Billing details</p>
            <div className="mt-11">
              <div>
                <input
                  {...register('email')}
                  type="text"
                  className="w-full border border-gray-300 p-3"
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="font-secondary mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label
                  className="font-secondary text-[18px] font-semibold"
                  htmlFor=""
                >
                  Phone
                </label>

                <input
                  {...register('phone')}
                  className="mt-1 w-full border border-gray-300 p-3"
                  type="text"
                />
                {errors.phone && (
                  <p className="font-secondary mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label
                  className="font-secondary text-[18px] font-semibold"
                  htmlFor=""
                >
                  Address
                </label>
                <input
                  {...register('address')}
                  className="mt-1 w-full border border-gray-300 p-3"
                  type="text"
                />
                {errors.address && (
                  <p className="font-secondary mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label
                  className="font-secondary text-[18px] font-semibold"
                  htmlFor=""
                >
                  Order Note
                </label>
                <textarea
                  {...register('orderNote')}
                  className="mt-1 w-full border border-gray-300 p-3"
                ></textarea>
                {errors.orderNote && (
                  <p className="font-secondary mt-1 text-sm text-red-500">
                    {errors.orderNote.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-secondary text-2xl font-bold">Your Order</p>
            <hr className="my-5" />
            <div className="mt-5 flex justify-between">
              <p className="font-secondary text-light text-[14px]">
                Original Price
              </p>
              <p className="font-secondary text-[14px] text-[#566363]">
                ${location.state?.data || '0.00'}
              </p>
            </div>
            <div className="mt-5 flex justify-between">
              <p className="font-secondary text-[14px] text-[#566363]">
                Savings
              </p>
              <p className="font-secondary text-[14px] text-[#566363]">$0.00</p>
            </div>
            <div className="mt-5 flex justify-between">
              <p className="font-secondary text-[14px] text-[#566363]">
                Shipping
              </p>
              <p className="font-secondary text-[14px] text-[#566363]">Free</p>
            </div>
            <div className="mt-5 flex justify-between">
              <p className="font-secondary text-[14px] text-[#566363]">
                Estimated Sales Tax
              </p>
              <p className="font-secondary text-[14px] text-[#566363]">$0.00</p>
            </div>
            <hr className="my-5"></hr>
            <div className="mt-5 flex justify-between">
              <p className="font-secondary text-xl text-black">Total</p>
              <p className="font-secondary text-xl text-black">
                ${location.state?.data || '0.00'}
              </p>
            </div>
            <p className="font-secondary mt-10 text-2xl font-bold">Pay with</p>
            <div
              className="mt-5 flex justify-between"
              onClick={() => setSelectedMethod('card')}
            >
              <p className="font-secondary text-xl text-black">Card</p>
              <img className="w-[100px]" src={VisaIcon} alt="" />
            </div>{' '}
            <div
              onClick={() => setSelectedMethod('paypal')}
              className={`mt-5 flex cursor-pointer justify-between rounded-xl border p-3 ${
                selectedMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <p className="font-secondary text-xl text-black">PayPal</p>
              <img className="w-[100px]" src={PaypalIcon} alt="" />
            </div>
            {selectedMethod === 'paypal' && (
              <div className="mt-6">
                <PayPalButton />
              </div>
            )}
            {/* // <PayPalButton></PayPalButton> */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`font-secondary } mt-8 flex w-full justify-center bg-[#FFD44D] py-4 font-semibold text-black`}
            >
              Place Order
            </button>
            {/* <CallActionButton
                  text="Place Order"
                  onClick={() => {}} // Thêm hàm xử lý đặt hàng ở đây
                  customStyle="mt-8"
               /> */}
          </div>
        </div>
      </form>
    </div>
  );
};
