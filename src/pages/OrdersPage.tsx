import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await invoiceApi.getInvoice({ page, limit: 10 });
        setOrders(res.data.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  // 🎯 Hàm format status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "SHIPPING":
        return "bg-purple-100 text-purple-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <span className="text-sm text-gray-500">Page {page}</span>
      </div>

      {loading ? (
        <p className="text-gray-600 animate-pulse">Loading orders...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Total</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => navigate(`/admin/orders/update/${order._id}`)}
                  >
                    <td className="p-4 border-b font-medium text-gray-800">{order._id}</td>
                    <td className="p-4 border-b text-gray-600">{order.userId}</td>
                    <td className="p-4 border-b text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 border-b font-semibold text-gray-800">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="p-4 border-b">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(
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
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border ${
            page === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          Prev
        </button>
        <span className="text-gray-600 font-medium">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};