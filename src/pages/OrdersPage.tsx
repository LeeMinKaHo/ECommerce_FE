import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await invoiceApi.getInvoice({ page, limit: 10 });
        setOrders(res.data.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  // 🎯 Hàm format status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPING':
        return 'bg-purple-100 text-purple-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <span className="text-sm text-gray-500">Page {page}</span>
      </div>

      {loading ? (
        <p className="animate-pulse text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="font-medium text-red-600">{error}</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="cursor-pointer transition-all hover:bg-gray-50"
                    onClick={() =>
                      navigate(`/admin/orders/update/${order._id}`)
                    }
                  >
                    <td className="border-b p-4 font-medium text-gray-800">
                      {order._id}
                    </td>
                    <td className="border-b p-4 text-gray-600">
                      {order.userId}
                    </td>
                    <td className="border-b p-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border-b p-4 font-semibold text-gray-800">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="border-b p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination (đơn giản) */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`rounded-lg border px-4 py-2 ${
            page === 1
              ? 'cursor-not-allowed border-gray-200 text-gray-400'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          Prev
        </button>
        <span className="font-medium text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};
