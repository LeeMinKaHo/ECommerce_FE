import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productApi from '@/service/ProductService';
import { Product } from '@/types/product';
import { 
  ChevronLeft, 
  Save, 
  Trash2, 
  BarChart3, 
  Edit3, 
  Package, 
  TrendingUp, 
  Info,
  Layers,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'edit'>('overview');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await productApi.getById(productId!);
      const p = res.data.data.product;
      setProduct(p);
      setFormData({
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        description: p.description,
      });
    } catch {
      toast.error('Could not load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productApi.update(productId!, formData);
      toast.success('Product updated successfully');
      fetchProduct(); // Refresh data
    } catch {
      toast.error('Failed to update product');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading product...</div>;
  if (!product) return <div className="p-8 text-center text-red-500">Product not found</div>;

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/products')}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-400">Manage your product details and insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
                <Trash2 size={16} /> Delete Product
            </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-8 w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'overview' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <BarChart3 size={18} /> Overview
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'edit' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Edit3 size={18} /> Edit Details
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' ? (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Items Sold</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{product.quantitySold}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Layers size={20} />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Current Stock</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{product.quantity}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Est. Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">${(product.price * product.quantitySold).toLocaleString()}</p>
                </div>
              </div>

              {/* Product Info Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center gap-2">
                    <Info size={18} className="text-primary" />
                    <h2 className="font-bold text-gray-900">Product Information</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Description</p>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {product.description || 'No description provided for this product.'}
                        </p>
                    </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
            {/* Visual Preview */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-2">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-50">
                    <img 
                        src={product.variants[0]?.imageUrl || ''} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-primary font-bold mt-1">${product.price}</p>
                    <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                        {product.variants.map((v, i) => (
                            <div key={i} className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                                <img src={v.imageUrl} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inventory Status */}
            <div className="bg-gray-900 rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                    <h2 className="flex items-center gap-2 font-bold mb-4 opacity-70 text-sm">
                        <Package size={16} /> Inventory Status
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-1.5 font-bold uppercase tracking-wider opacity-60">
                                <span>Stock Efficiency</span>
                                <span>{Math.round((product.quantitySold / (product.quantity + product.quantitySold)) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${(product.quantitySold / (product.quantity + product.quantitySold)) * 100}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            * Based on total items produced vs items sold. Higher percentage indicates better demand.
                        </p>
                    </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/20 rounded-full blur-3xl" />
            </div>
        </div>
      </div>
    </div>
  );
};
