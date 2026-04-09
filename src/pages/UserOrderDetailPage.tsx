import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import { UserSidebar } from '@/components/layout/UserSidebar';
import { CenterScreenLoader } from '@/components/CenterScreenLoader';
import {
  ChevronLeft,
  Package,
  MapPin,
  Phone,
  Mail,
  StickyNote,
  ReceiptText,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ShoppingBag,
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-600 border-amber-200',
    icon: <Clock size={16} />,
  },
  CONFIRMED: {
    label: 'Order Confirmed',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: <CheckCircle2 size={16} />,
  },
  PROCESSING: {
    label: 'Packing & Processing',
    className: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    icon: <Package size={16} />,
  },
  SHIPPING: {
    label: 'In Transit',
    className: 'bg-purple-50 text-purple-600 border-purple-200',
    icon: <Truck size={16} />,
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    icon: <CheckCircle2 size={16} />,
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-500 border-red-200',
    icon: <XCircle size={16} />,
  },
};

const STEPS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPING', 'COMPLETED'];

export const UserOrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await invoiceApi.getInvoiceById(orderId);
        setOrder(res.data.data);
      } catch {
        setError('Could not load order information.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const getStatus = (status: string) =>
    STATUS_CONFIG[status] || { label: status, className: 'bg-gray-50 text-gray-500 border-gray-200', icon: null };

  const currentStepIndex = order ? STEPS.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link
            to="/user/order"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-4"
          >
            <ChevronLeft size={16} /> Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          {order && (
            <p className="text-gray-400 text-sm mt-1 font-mono">
              #{order._id.toUpperCase()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <UserSidebar />

          <div className="col-span-12 md:col-span-9 space-y-5">
            {loading ? (
              <CenterScreenLoader />
            ) : error ? (
              <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">
                <XCircle className="mx-auto text-red-300 mb-3" size={48} />
                <p className="text-gray-500">{error}</p>
              </div>
            ) : order ? (
              <>
                {/* ─── Status Timeline ─── */}
                {order.status !== 'CANCELLED' && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <Truck size={18} className="text-primary" /> Delivery Progress
                    </h2>
                    <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-0">
                      {/* Horizontal connecting line for desktop */}
                      <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-gray-100 z-0" />
                      <div 
                        className="hidden md:block absolute top-5 h-0.5 bg-primary z-0 transition-all duration-1000"
                        style={{ 
                          width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
                          left: 0
                        }}
                      />

                      {STEPS.map((step, idx) => {
                        const isDone = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;
                        const cfg = STATUS_CONFIG[step];

                        return (
                          <div key={step} className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10 md:flex-1">
                            {/* Circle indicator */}
                            <div
                              className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-white ${
                                isCurrent
                                  ? 'border-primary text-primary ring-4 ring-primary/10 shadow-lg'
                                  : isDone
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-gray-200 text-gray-300'
                              }`}
                            >
                              {isDone && !isCurrent ? <CheckCircle2 size={18} /> : cfg.icon}
                            </div>
                            
                            {/* Label */}
                            <div className="text-left md:text-center">
                              <p className={`text-xs font-bold leading-tight ${isDone ? 'text-gray-900' : 'text-gray-300'}`}>
                                {cfg.label}
                              </p>
                              {isCurrent && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full animate-pulse">
                                  Current Step
                                </span>
                              )}
                            </div>

                            {/* Vertical line for mobile */}
                            {idx !== STEPS.length - 1 && (
                                <div className={`md:hidden absolute top-10 left-5 w-0.5 h-8 ${isDone ? 'bg-primary' : 'bg-gray-100'}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ─── Cancelled banner ─── */}
                {order.status === 'CANCELLED' && (
                  <div className="flex items-center gap-3 p-5 bg-red-50 rounded-2xl border border-red-100">
                    <XCircle className="text-red-400 shrink-0" size={24} />
                    <p className="text-red-600 font-semibold">This order has been cancelled.</p>
                  </div>
                )}

                {/* ─── Order Summary + Shipping ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                      <ReceiptText size={18} className="text-primary" /> Order Information
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Order ID</span>
                        <span className="font-mono font-bold text-gray-900">
                          #{order._id.slice(-10).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-50 pt-3">
                        <span className="text-gray-400">Order Date</span>
                        <span className="font-medium text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-50 pt-3 items-center">
                        <span className="text-gray-400">Status</span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatus(order.status).className}`}>
                          {getStatus(order.status).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                      <MapPin size={18} className="text-primary" /> Shipping Information
                    </h2>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-3">
                        <Mail size={15} className="text-gray-300 mt-0.5 shrink-0" />
                        <span>{order.shippingInfo?.email || '—'}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={15} className="text-gray-300 mt-0.5 shrink-0" />
                        <span>{order.shippingInfo?.phone || '—'}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={15} className="text-gray-300 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{order.shippingInfo?.address || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Items ─── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <ShoppingBag size={18} className="text-primary" />
                    <h2 className="font-bold text-gray-900">Products ({order.items.length})</h2>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-5">
                        <div className="h-20 w-20 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                          <img src={item.imageUrl || ''} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {item.color && (
                                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                    {item.color}
                                </span>
                            )}
                            {item.size && (
                                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                    Size {item.size}
                                </span>
                            )}
                            <span className="text-[10px] text-gray-400">× {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400">${item.price.toLocaleString()} / item</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-gray-50/40 space-y-3">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>${order.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shipping Fee</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-bold text-gray-900">Total Amount</span>
                      <span className="text-xl font-bold text-primary">${order.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* ─── Actions ─── */}
                <div className="flex items-center justify-between gap-4 pt-4">
                  <Link
                    to="/user/order"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft size={16} /> Back
                  </Link>
                  {order.status === 'COMPLETED' && (
                    <button className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                      Write a Review
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
