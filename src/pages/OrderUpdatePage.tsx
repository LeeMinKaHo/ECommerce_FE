import { ProductBox } from '@/components/product/productBox/ProductBox';
import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const OrderUpdatePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [status, setStatus] = useState<string>('pending');
  const handleSubmit = () => {
    // Handle form submission logic here
    const res = invoiceApi.updateInvoice(orderId!, status);
    res
      .then(() => {
        navigate('/admin/orders');
        toast.success('Order updated successfully');
      })
      .catch((err) => {
        toast.error('Failed to update order');
        console.error(err);
      });
  };
  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        if (!orderId) return console.error('No orderId provided in URL params');
        const res = await invoiceApi.getInvoiceById(orderId);

        setInvoice(res.data.data);
      } catch (error) {
        console.error('Failed to fetch invoice:', error);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="grid min-h-screen grid-cols-12 gap-6 bg-gray-50 p-8">
      {/* Order Detail */}
      <div className="col-span-8 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-800">
          Order Details
        </h2>
        <div className="space-y-6">
          {invoice.items.map((product) => (
            <div
              key={product.productId}
              className="flex items-center gap-6 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
            >
              <div className="group relative">
                <img
                  src={product?.imageUrl}
                  alt={product?.name}
                  className="h-[180px] w-[200px] rounded-xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <Link
                to={`/products/${product?.productId}`}
                className="flex flex-1 flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-500">Men-Cloths</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 15 13"
                    fill="none"
                  >
                    <path
                      d="M6.7722 2.13924L7.29262 2.66919L7.81304 2.13924C8.44228 1.49847 9.44635 0.729394 10.5225 0.729394C11.5515 0.729394 12.3786 1.07587 12.9447 1.62561C13.5092 2.17384 13.8585 2.96677 13.8585 3.94788C13.8585 5.00996 13.4343 5.90551 12.7355 6.7529C12.0226 7.61733 11.0654 8.38388 10.0481 9.19474C10.048 9.19481 10.048 9.19481 10.048 9.19484L10.0311 9.20826C9.10759 9.94409 8.09023 10.7547 7.29297 11.6643C6.50355 10.7622 5.49558 9.95793 4.57993 9.22729L4.53956 9.19509L4.53927 9.19485C3.52169 8.38368 2.56459 7.61694 1.85191 6.75251C1.1533 5.90514 0.729394 5.00973 0.729394 3.94788C0.729394 2.96677 1.07868 2.17386 1.64325 1.62564C2.20938 1.0759 3.03665 0.729394 4.06604 0.729394C5.14112 0.729394 6.14239 1.49789 6.7722 2.13924Z"
                      stroke="#566363"
                      strokeWidth="1.4"
                    />
                  </svg>
                </div>

                <p className="mt-1 text-lg font-semibold text-gray-800">
                  {product?.name}
                </p>
                <p className="mt-1 text-[17px] font-medium text-green-600">
                  ${product?.price}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="ml-1 text-sm text-gray-500">100 Reviews</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-4 flex flex-col gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">
            Shipping Info
          </h3>
          <p className="mb-1 text-gray-700">
            <span className="font-medium">Email:</span>{' '}
            {invoice.shippingInfo.email}
          </p>
          <p className="mb-1 text-gray-700">
            <span className="font-medium">Phone:</span>{' '}
            {invoice.shippingInfo.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span>{' '}
            {invoice.shippingInfo.address}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">
            Payment Summary
          </h3>
          <p className="mb-2 text-gray-700">
            <span className="font-medium">Total Price:</span> $
            {invoice.totalPrice}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Notes:</span>{' '}
            {invoice.shippingInfo.note}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">
            Update Summary
          </h3>
          <select
            className="mb-4 w-full rounded-md border border-gray-300 p-2"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <button
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};
