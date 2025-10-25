import { invoiceApi } from "@/service/InvoiceInstance";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PayPalButton = () => {
   const paypalRef = useRef<HTMLDivElement>(null);
   const naivigate = useNavigate();
   useEffect(() => {
      const PAYPAL_SCRIPT_SRC =
         "https://www.paypal.com/sdk/js?client-id=&components=buttons";

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
                        console.log(
                           "Create invoice response:",
                           response.data.data
                        );
                        console.log(
                           "👉 Order ID returned to PayPal SDK:",
                           response.data.data.paypalOrderId
                        );
                        return response.data.data.paypalOrderId;
                     } catch (err) {
                        console.error("Create invoice error:", err);
                        throw err;
                     }
                  },
                  onApprove: async (res) => {
                     try {
                        console.log("👉 onApprove full response:", res); // log toàn bộ object
                        const { orderID } = res;
                        console.log("Order ID:", orderID);
                        const captureRes = await invoiceApi.captureInvoice(
                           orderID
                        );
                        const { status, message } = captureRes.data.data;
                        console.log("Capture invoice response:", captureRes);
                        console.log("Status:", status);
                        naivigate("/payment-result", {
                           state: {
                              success: status === "COMPLETED",
                              orderId: captureRes.data.data._id,
                              email: captureRes.data.data.email,
                           },
                        });
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
