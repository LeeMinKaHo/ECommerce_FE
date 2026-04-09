import React, { useEffect, useState } from 'react';
import productApi from '@/service/ProductService';
import { Product, ProductFillter } from '@/types/product';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Package, 
  TrendingUp, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminAllProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ProductFillter>({
    page: 1,
    limit: 12,
    sort: 0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productApi.getAll(filter);
      setProducts(res.data.data);
    } catch {
      toast.error('Could not load product list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter((f: ProductFillter) => ({ ...f, name: search, page: 1 }));
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Total <span className="font-semibold text-gray-600">{products.length}</span> products
          </p>
        </div>
        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
          />
        </form>
        <select
          className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
          value={filter.sort}
          onChange={(e) => setFilter((f: ProductFillter) => ({ ...f, sort: Number(e.target.value), page: 1 }))}
        >
          <option value={0}>Default Sort</option>
          <option value={1}>Price: Low to High</option>
          <option value={-1}>Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-72 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
          <Package className="mx-auto text-gray-200 mb-4" size={52} />
          <p className="text-gray-400 font-medium">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/admin/products/${product._id}`}
              key={product._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.variants[0]?.imageUrl || ''}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-primary">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-primary mt-1">${product.price}</p>
                
                {/* Stats row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} className="text-emerald-500" /> {product.quantitySold} sold
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers size={12} className="text-blue-400" /> {product.quantity} left
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-3">
          <button
            onClick={() => setFilter((f: ProductFillter) => ({ ...f, page: Math.max(1, f.page! - 1) }))}
            disabled={filter.page === 1}
            className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >Prev</button>
          <span className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold">{filter.page}</span>
          <button
            onClick={() => setFilter((f: ProductFillter) => ({ ...f, page: (f.page ?? 1) + 1 }))}
            disabled={products.length < (filter.limit ?? 12)}
            className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >Next</button>
      </div>
    </div>
  );
};
