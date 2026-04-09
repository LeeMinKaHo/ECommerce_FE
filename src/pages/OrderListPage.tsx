import { CenterScreenLoader } from '@/components/CenterScreenLoader';
import { UserSidebar } from '@/components/layout/UserSidebar';
import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, ChevronRight, ReceiptText, Clock } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  COMPLETED: { label: 'Completed', className: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red-50 text-red-500 border-red-100' },
  PENDING: { label: 'Pending', className: 'bg-amber-50 text-amber-600 border-amber-100' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-blue-50 text-blue-600 border-blue-100' },
  PROCESSING: { label: 'Packing', className: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  SHIPPING: { label: 'Shipping', className: 'bg-purple-50 text-purple-600 border-purple-100' },
};

const STATUS_TABS = [
  { label: 'All', value: '' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Packing', value: 'PROCESSING' },
  { label: 'Shipping', value: 'SHIPPING' },
  { label: 'Completed', value: 'COMPLETED' },
];

export const OrderListPage = () => {
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params: any = { page, limit: 5 };
        if (activeStatus) params.status = activeStatus;
        const res = await invoiceApi.getInvoice(params);
        setOrders(res.data.data || []);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, activeStatus]);

  const handleTabChange = (status: string) => {
    setActiveStatus(status);
    setPage(1);
  };

  const getStatus = (status: string) =>
    STATUS_CONFIG[status] || { label: status, className: 'bg-gray-50 text-gray-500 border-gray-100' };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-primary">My Account</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and account security</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <UserSidebar />

          {/* Main */}
          <div className="col-span-12 md:col-span-9 space-y-4">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">My Orders</h2>
                  <p className="text-gray-400 text-xs">Track and manage your orders</p>
                </div>
              </div>

              {/* Status tabs */}
              <div className="flex overflow-x-auto px-4 gap-1 border-b border-gray-100">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleTabChange(tab.value)}
                    className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                      activeStatus === tab.value
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders list */}
            {loading ? (
              <CenterScreenLoader />
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = getStatus(order.status);
                  return (
                    <div
                      key={order._id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      {/* Order header */}
                      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <ReceiptText size={16} className="text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900 font-mono">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={12} />
                            {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                              day: '2-digit', month: '2-digit', year: 'numeric'
                            })}
                          </div>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border ${statusInfo.className}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="px-6 py-4 space-y-4">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                              <img
                                src={item.imageUrl || ''}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.color} · {item.size} · x{item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 shrink-0">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-gray-400 pl-20">
                            +{order.items.length - 2} other products
                          </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700">
                          Total:{' '}
                          <span className="text-primary font-bold text-base">
                            ${order.totalPrice.toLocaleString()}
                          </span>
                        </p>

                        <div className="flex items-center gap-3">
                          {order.status === 'COMPLETED' && (
                            <button className="text-xs font-semibold px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 transition-all">
                              Review
                            </button>
                          )}
                          <Link
                            to={`/user/order/${order._id}`}
                            className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
                          >
                            Details <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
                <Package className="mx-auto text-gray-200 mb-4" size={56} />
                <p className="text-gray-500 font-medium">You don't have any orders yet</p>
                <Link
                  to="/products"
                  className="inline-block mt-6 px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:shadow-lg shadow-primary/20 transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            )}

            {/* Pagination */}
            {orders.length > 0 && (
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Prev
                </button>
                <span className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold">{page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={orders.length < 5}
                  className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
