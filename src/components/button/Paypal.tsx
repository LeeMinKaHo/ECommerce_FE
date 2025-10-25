import { CheckOutFormFields } from "@/pages/CheckOutPage";
import { invoiceApi } from "@/service/InvoiceInstance";
import { CreateInvoiceDTO } from "@/types/invoice";
import { create } from "node_modules/axios/index.cjs";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


type PaypalProps = {
  createInvoiceDTO:CreateInvoiceDTO
};
export const Paypal = (PaypalProps : PaypalProps) => {
   const paypalRef = useRef<HTMLDivElement | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      // ✅ Kiểm tra PayPal SDK đã sẵn sàng chưa
      if (!window.paypal) {
         console.error("PayPal SDK not loaded!");
         return;
      }

      const paypalButtons = window.paypal
         .Buttons({
            style: {
               layout: "vertical",
               color: "gold",
               shape: "rect",
               label: "paypal",
               height: 40,
            },

            // ✅ Tạo đơn hàng
            createOrder: async () => {
               try {
                  const res = await invoiceApi.createInvoice(PaypalProps.createInvoiceDTO);
                  const orderId = res.data?.data?.paypalOrderId;

                  if (!orderId) throw new Error("PayPal order ID missing");
                  return orderId;
               } catch (err) {
                  console.error("Create invoice error:", err);
                  throw err;
               }
            },

            // ✅ Khi thanh toán thành công
            onApprove: async (data) => {
               try {
                  const { orderID } = data;
                  const captureRes = await invoiceApi.captureInvoice(orderID);
                  const info = captureRes.data.data;

                  navigate("/payment-result", {
                     state: {
                        success: info.status === "COMPLETED",
                        orderId: info._id,
                        email: info.email,
                     },
                  });
               } catch (err) {
                  console.error("Capture invoice error:", err);
                  navigate("/payment-result", { state: { success: false } });
               }
            },

            // ✅ Nếu có lỗi từ PayPal
            onError: (err) => {
               console.error("PayPal Button Error:", err);
               navigate("/payment-result", { state: { success: false } });
            },
         });

      paypalButtons.render(paypalRef.current!);

      // ✅ Cleanup khi component bị unmount
      return () => {
         paypalButtons.close();
      };
   }, [navigate]);

   return <div ref={paypalRef}></div>;
};
