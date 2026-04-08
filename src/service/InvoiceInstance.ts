import { Pagination } from '@/types/share.type';
import axiosInstance from './AxiosInstance';
import { CheckOutFormFields } from '@/pages/CheckOutPage';
import { CreateInvoiceDTO } from '@/types/invoice';
import { get } from 'node_modules/axios/index.cjs';

export const invoiceApi = {
  createInvoice: (shippingInfo: CreateInvoiceDTO) =>
    axiosInstance.post('http://localhost:4000/invoices', shippingInfo, {
      headers: { 'Content-Type': 'application/json' },
    }),
  captureInvoice: (paypalOrderId: string) =>
    axiosInstance.post(
      `http://localhost:4000/invoices/capture/${paypalOrderId}`
    ),
  getInvoice: (pagination: Pagination) =>
    axiosInstance.get('http://localhost:4000/invoices', {
      params: pagination,
    }),
  getInvoiceById: (invoiceId: string) =>
    axiosInstance.get(`http://localhost:4000/invoices/${invoiceId}`),
  updateInvoice: (invoiceId: string, status: string) =>
    axiosInstance.put(`http://localhost:4000/invoices/${invoiceId}`, {
      status,
    }),
  getUserInvoices: (userId: string, pagination: Pagination) =>
    axiosInstance.get(`http://localhost:4000/invoices/user/me`, {
      params: pagination,
    }),
};
