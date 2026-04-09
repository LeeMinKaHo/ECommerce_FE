import { invoiceApi } from '@/service/InvoiceInstance';
import { Invoice } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  StickyNote,
  ReceiptText,
  Save,
  ShoppingBag,
  Loader2,
} from 'lucide-react';

const ALL_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed (Paid)' },
  { value: 'PROCESSING', label: 'Processing/Packed' },
  { value: 'SHIPPING', label: 'In Transit' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const STATUS_CONFIG: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-600 border-amber-200',
  CONFIRMED: 'bg-blue-50 text-blue-600 border-blue-200',
  PROCESSING: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  SHIPPING: 'bg-purple-50 text-purple-600 border-purple-200',
  COMPLETED: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  CANCELLED: 'bg-red-50 text-red-500 border-red-200',
};

export const OrderUpdatePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [status, setStatus] = useState('PENDING');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    (async () => {
      try {
        const res = await invoiceApi.getInvoiceById(orderId);
        const data = res.data.data;
        setInvoice(data);
        setStatus(data.status || 'PENDING');
      } catch {
        toast.error('Could not load order details');
      }
    })();
  }, [orderId]);

  const handleSubmit = async () => {
    if (!orderId) return;
    try {
      setSubmitting(true);
      await invoiceApi.updateInvoice(orderId, status);
      toast.success('Order updated successfully!');
      navigate('/admin/orders');
    } catch {
      toast.error('Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!invoice) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-4"
        >
          <ChevronLeft size={16} /> Back to List
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm font-mono text-gray-400 mt-0.5">#{invoice._id.toUpperCase()}</p>
          </div>
          <span className={`text-xs font-bold px-4 py-2 rounded-full border ${STATUS_CONFIG[invoice.status] || 'bg-gray-100 text-gray-500'}`}>
            {ALL_STATUSES.find((s) => s.value === invoice.status)?.label || invoice.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ─── Left: Products ─── */}
        <div className="xl:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <ShoppingBag size={18} className="text-primary" />
              <h2 className="font-bold text-gray-900">Products ({invoice.items.length})</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {invoice.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5">
                  <div className="h-20 w-20 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                    <img
                      src={item.imageUrl || ''}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.color && (
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                          Size {item.size}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">${item.price} / item</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/40 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${invoice.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping Fee</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total Payment</span>
                <span className="text-xl font-bold text-primary">${invoice.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right: Info + Update ─── */}
        <div className="space-y-5">
          {/* Shipping info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={17} className="text-primary" /> Shipping Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Mail size={15} className="text-gray-300 mt-0.5 shrink-0" />
                <span className="text-gray-700">{invoice.shippingInfo?.email || '—'}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={15} className="text-gray-300 mt-0.5 shrink-0" />
                <span className="text-gray-700">{invoice.shippingInfo?.phone || '—'}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gray-300 mt-0.5 shrink-0" />
                <span className="text-gray-700">{invoice.shippingInfo?.address || '—'}</span>
              </div>
              {invoice.shippingInfo?.note && (
                <div className="flex items-start gap-3">
                  <StickyNote size={15} className="text-gray-300 mt-0.5 shrink-0" />
                  <span className="text-gray-500 italic">{invoice.shippingInfo.note}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order meta */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ReceiptText size={17} className="text-primary" /> Order Information
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Date</span>
                <span className="font-medium text-gray-700">
                  {new Date(invoice.createdAt).toLocaleDateString('en-US')}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-50 pt-2">
                <span className="text-gray-400">Last Updated</span>
                <span className="font-medium text-gray-700">
                  {new Date(invoice.updatedAt).toLocaleDateString('en-US')}
                </span>
              </div>
            </div>
          </div>

          {/* Colorful Custom Combo Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wider flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Update Progress
            </h2>
            
            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1">
                  Select New Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`w-full appearance-none px-4 py-3.5 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/10 ${
                      status === 'PENDING' ? 'border-amber-100 bg-amber-50/30 text-amber-700' :
                      status === 'CONFIRMED' ? 'border-blue-100 bg-blue-50/30 text-blue-700' :
                      status === 'PROCESSING' ? 'border-indigo-100 bg-indigo-50/30 text-indigo-700' :
                      status === 'SHIPPING' ? 'border-purple-100 bg-purple-50/30 text-purple-700' :
                      status === 'COMPLETED' ? 'border-emerald-100 bg-emerald-50/30 text-emerald-700' :
                      'border-red-100 bg-red-50/30 text-red-700'
                    }`}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s.value} value={s.value} className="text-gray-900 bg-white font-medium py-2">
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronLeft size={16} className="-rotate-90" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || status === invoice.status}
                  className="w-full h-14 flex items-center justify-center gap-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all disabled:opacity-20 shadow-xl shadow-gray-200 active:scale-[0.98]"
                >
                  {submitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  <span className="text-sm">Confirm & Save Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
