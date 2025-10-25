// hooks/usePayPalCheckout.ts
import { invoiceApi } from "@/service/InvoiceInstance";
import { useRef } from "react";


export const usePayPalCheckout = () => {
  const paypalRef = useRef<HTMLDivElement>(null);

  const openPayPal = async () => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AYBDGpA4Kf4kUZYeLd5-3A8RUlTpfCyrG8U0MrTq1rL8kEAxNDk1jqqX-UHre1WsGTIjA2l3zkE9wgR7&components=buttons";
      script.async = true;

      await new Promise((resolve) => {
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }

    if (paypalRef.current) {
      paypalRef.current.innerHTML = ""; // clear old
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
            const response = await invoiceApi.createInvoice();
            console.log("✅ Created invoice:", response.data.data);
            return response.data.data.paypalOrderId;
          },
          onApprove: async (res) => {
            console.log("👉 onApprove:", res);
            const { orderID } = res;
            const captureRes = await invoiceApi.captureInvoice(orderID);
            const { status, message } = captureRes.data.data;
            alert(status ? "✅ Payment successful!" : "❌ " + message);
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
          },
        })
        .render(paypalRef.current);

      // 🔥 Quan trọng: PayPal chỉ mở popup khi có click user,
      // nên ta trigger click ngay sau render
      const paypalButton = paypalRef.current.querySelector("iframe") as HTMLElement;
      paypalButton?.click();
    }
  };

  return { paypalRef, openPayPal };
};
