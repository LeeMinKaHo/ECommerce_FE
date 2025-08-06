import { invoiceApi } from "@/service/InvoiceInstance";
import React, { useRef } from "react";
import { useEffect } from "react";


const PayPalButton = () => {
   const paypalRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const PAYPAL_SCRIPT_SRC =
         "https://www.paypal.com/sdk/js?client-id=AYBDGpA4Kf4kUZYeLd5-3A8RUlTpfCyrG8U0MrTq1rL8kEAxNDk1jqqX-UHre1WsGTIjA2l3zkE9wgR7&components=buttons";

      const existingScript = document.querySelector(
         `script[src="${PAYPAL_SCRIPT_SRC}"]`
      );

      const renderButtons = () => {
         if (window.paypal && paypalRef.current) {
            window.paypal
               .Buttons({
                  style: {
                     layout: "vertical",
                     color: "gold",
                     shape: "rect",
                     label: "paypal",
                     height: 40,
                  },
                  createOrder: async () => {
                     try {
                        const response = await invoiceApi.createInvoice();
                        return response.data.data.paypalOrderId;
                     } catch (err) {
                        console.error("Create invoice error:", err);
                        throw err;
                     }
                  },
                  onApprove: async (res) => {
                     try {
                        const { orderID } = res;
                        const captureRes = await invoiceApi.captureInvoice(orderID);
                        const { status, message } = captureRes.data.data;
                        alert(status ? "Thanh toán thành công!" : "Thanh toán thất bại: " + message);
                     } catch (err) {
                        console.error("Capture invoice error:", err);
                        alert("Lỗi khi xác nhận thanh toán! " + err);
                     }
                  },
                  onError: (err) => {
                     console.error("PayPal Button Error:", err);
                  },
               })
               .render(paypalRef.current);
         }
      };

      if (!existingScript) {
         const script = document.createElement("script");
         script.src = PAYPAL_SCRIPT_SRC;
         script.async = true;
         script.onload = renderButtons;
         document.body.appendChild(script);

         return () => {
            if (document.body.contains(script)) {
               document.body.removeChild(script);
            }
            if (paypalRef.current) {
               paypalRef.current.innerHTML = "";
            }
         };
      } else {
         renderButtons();
         return () => {
            if (paypalRef.current) {
               paypalRef.current.innerHTML = "";
            }
         };
      }
   }, []);

   return <div ref={paypalRef} />;
};

export default PayPalButton;


