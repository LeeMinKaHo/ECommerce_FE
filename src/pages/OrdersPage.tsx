import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';


export const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await invoiceApi.getInvoice({ page, limit: 10 });
        setOrders(res.data.data); // giả sử API trả { data: [...] }
      } catch (err: any) {
        console.log(err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  return (
    <div className="pr-4">
      <p className="text-2xl font-semibold mb-4">Orders</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border-b">Order ID</th>
              <th className="text-left p-2 border-b">Customer</th>
              <th className="text-left p-2 border-b">Date</th>
              <th className="text-left p-2 border-b">Total</th>
              <th className="text-left p-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{order._id}</td>
                <td className="p-2 border-b">{order.userId}</td>
                <td className="p-2 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border-b">${order.totalPrice.toFixed(2)}</td>
                <td className={`p-2 border-b ${order.status === 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
