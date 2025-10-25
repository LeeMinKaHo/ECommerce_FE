import { CallActionButton } from "@/components/button/CallActionButton";
import { usePayPalCheckout } from "@/hooks/usePayPalCheckout";
import React, { useEffect, useState } from "react";
import PaypalIcon from "@/assets/images/paypal.png";
import VisaIcon from "@/assets/images/visa_icon.png";
import PayPalButton from "@/components/button/PaypalButton";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceApi } from "@/service/InvoiceInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { shippingInfo } from "@/types/invoice";
import { toast } from "sonner";
import { MESSAGES as msg } from "@/constant/Message";
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
      "paypal" | "cod" | "card" | null
   >(null);
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm<CheckOutFormFields>({ resolver: zodResolver(schema) });

   const onSubmit: SubmitHandler<CheckOutFormFields> = async (data) => {
      try {
         console.log("Submitting data:", data);
         // const response = await invoiceApi.createInvoice(data)
         // toast.success(msg.CHECKOUT.SUCCESS);
         // ✅ Truyền dữ liệu sang trang Review
         navigate("/order-summary", { state: { data } });
      } catch (error) {
         console.error(error);
      } finally {
      }
   };
   const location = useLocation()
   
   return (
      <div className="container mx-auto py-4 px-6">
         <form className="mt-11" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-[130px]">
               <div className="flex-1">
                  <p className="font-secondary font-bold text-2xl">
                     Billing details
                  </p>
                  <div className="mt-11">
                     <div>
                        <input
                           {...register("email")}
                           type="text"
                           className="p-3 border border-gray-300 w-full"
                           placeholder="Your email address"
                        />
                        {errors.email && (
                           <p className="text-red-500 text-sm mt-1 font-secondary">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     <div className="mt-5">
                        <label
                           className="font-secondary font-semibold text-[18px]"
                           htmlFor=""
                        >
                           Phone
                        </label>

                        <input
                           {...register("phone")}
                           className="p-3 border border-gray-300 w-full mt-1"
                           type="text"
                        />
                        {errors.phone && (
                           <p className="text-red-500 text-sm mt-1 font-secondary">
                              {errors.phone.message}
                           </p>
                        )}
                     </div>
                     <div className="mt-5">
                        <label
                           className="font-secondary font-semibold text-[18px]"
                           htmlFor=""
                        >
                           Address
                        </label>
                        <input
                           {...register("address")}
                           className="p-3 border border-gray-300 w-full mt-1"
                           type="text"
                        />
                        {errors.address && (
                           <p className="text-red-500 text-sm mt-1 font-secondary">
                              {errors.address.message}
                           </p>
                        )}
                     </div>
                     <div className="mt-5">
                        <label
                           className="font-secondary font-semibold text-[18px]"
                           htmlFor=""
                        >
                           Order Note
                        </label>
                        <textarea
                           {...register("orderNote")}
                           className="p-3 border border-gray-300 w-full mt-1"
                        ></textarea>
                        {errors.orderNote && (
                           <p className="text-red-500 text-sm mt-1 font-secondary">
                              {errors.orderNote.message}
                           </p>
                        )}
                     </div>
                  </div>
               </div>
               <div className="flex-1">
                  <p className="font-secondary font-bold text-2xl">
                     Your Order
                  </p>
                  <hr className="my-5" />
                  <div className="flex justify-between mt-5">
                     <p className="font-secondary text-light text-[14px]">
                        Original Price
                     </p>
                     <p className="font-secondary text-[#566363] text-[14px]">
                        ${location.state?.data || '0.00'}
                     </p>
                  </div>
                  <div className="flex justify-between mt-5">
                     <p className="font-secondary text-[#566363] text-[14px]">
                         Savings
                     </p>
                     <p className="font-secondary text-[#566363] text-[14px]">
                       $0.00
                     </p>
                  </div>
                  <div className="flex justify-between mt-5">
                     <p className="font-secondary text-[#566363] text-[14px]">
                        Shipping
                     </p>
                     <p className="font-secondary text-[#566363] text-[14px]">
                       Free
                     </p>
                  </div>
                  <div className="flex justify-between mt-5">
                     <p className="font-secondary text-[#566363] text-[14px]">
                       Estimated Sales Tax
                     </p>
                     <p className="font-secondary text-[#566363] text-[14px]">
                         $0.00
                     </p>
                  </div>
                  <hr className="my-5"></hr>
                  <div className="flex justify-between mt-5">
                     <p className="font-secondary text-black text-xl">Total</p>
                     <p className="font-secondary text-black text-xl">
                         ${location.state?.data || '0.00'}
                     </p>
                  </div>
                  <p className="font-secondary font-bold text-2xl mt-10">
                     Pay with
                  </p>
                  <div
                     className="flex justify-between mt-5"
                     onClick={() => setSelectedMethod("card")}
                  >
                     <p className="font-secondary text-black text-xl">Card</p>
                     <img className="w-[100px]" src={VisaIcon} alt="" />
                  </div>{" "}
                  <div
                     onClick={() => setSelectedMethod("paypal")}
                     className={`flex justify-between mt-5 p-3 border rounded-xl cursor-pointer ${
                        selectedMethod === "paypal"
                           ? "border-blue-500 bg-blue-50"
                           : "border-gray-300"
                     }`}
                  >
                     <p className="font-secondary text-black text-xl">PayPal</p>
                     <img className="w-[100px]" src={PaypalIcon} alt="" />
                  </div>
                  {selectedMethod === "paypal" && (
                     <div className="mt-6">
                        <PayPalButton />
                     </div>
                  )}
                  {/* // <PayPalButton></PayPalButton> */}
                  <button
                     disabled={isSubmitting}
                     type="submit"
                     className={`bg-[#FFD44D] w-full py-4 flex justify-center mt-8 font-secondary font-semibold text-black }`}
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
