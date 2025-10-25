import { Pagination } from "@/types/share.type";
import axiosInstance from "./AxiosInstance";
import { CheckOutFormFields } from "@/pages/CheckOutPage";
import { CreateInvoiceDTO } from "@/types/invoice";

export const invoiceApi = {
   createInvoice: (shippingInfo: CreateInvoiceDTO) =>
      axiosInstance.post("http://localhost:4000/invoices", shippingInfo, {
         headers: { "Content-Type": "application/json" },
      }),
   captureInvoice: (paypalOrderId: string) =>
      axiosInstance.post(
         `http://localhost:4000/invoices/capture/${paypalOrderId}`
      ),
   getInvoice: (pagination: Pagination) =>
      axiosInstance.get("http://localhost:4000/invoices", {
         params: pagination,
      }),
};
