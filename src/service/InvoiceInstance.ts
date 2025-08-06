import { Pagination } from "@/types/share.type";
import axiosInstance from "./AxiosInstance";

export const invoiceApi = {
    createInvoice : () => axiosInstance.post("http://localhost:4000/invoices"),
    captureInvoice : (paypalOrderId: string) =>axiosInstance.post(`http://localhost:4000/invoices/capture/${paypalOrderId}`),
    getInvoice : (pagination : Pagination) => axiosInstance.get("http://localhost:4000/invoices" , {
        params: pagination
    })
}