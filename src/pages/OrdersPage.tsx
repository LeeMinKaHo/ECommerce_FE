import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-amber-50 text-amber-600 border border-amber-200' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-blue-50 text-blue-600 border border-blue-200' },
  SHIPPING: { label: 'Shipping', className: 'bg-purple-50 text-purple-600 border border-purple-200' },
  COMPLETED: { label: 'Completed', className: 'bg-emerald-50 text-emerald-600 border border-emerald-200' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red-50 text-red-500 border border-red-100' },
};

export const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await invoiceApi.getInvoice({ page, limit: 10 });
        setOrders(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  const getStatus = (status: string) =>
    STATUS_CONFIG[status] || { label: status, className: 'bg-gray-100 text-gray-500 border border-gray-200' };

  const filtered = search
    ? orders.filter(
        (o) =>
          o._id.toLowerCase().includes(search.toLowerCase()) ||
          o.shippingInfo?.email?.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-400 mt-0.5">View and update order status</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <ShoppingBag size={18} className="text-amber-600" />
            </div>
            <span className="font-bold text-gray-900">Order List</span>
          </div>
          <div className="sm:ml-auto relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, Email..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 w-full bg-gray-100 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((order) => {
                  const statusCfg = getStatus(order.status);
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{order.shippingInfo?.email || '—'}</p>
                        <p className="text-xs text-gray-400">{order.shippingInfo?.phone || ''}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US')}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${statusCfg.className}`}>
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/admin/orders/update/${order._id}`)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all"
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-400">Page {page}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
              {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={orders.length < 10}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
