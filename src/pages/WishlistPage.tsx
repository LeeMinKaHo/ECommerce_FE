import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import wishlistApi from '@/service/WishlistService';
import { Product } from '@/types/product';
import { UserSidebar } from '@/components/layout/UserSidebar';
import { CenterScreenLoader } from '@/components/CenterScreenLoader';
import { Heart, ShoppingBag, Trash2, ArrowRight, FolderOpen } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'sonner';

interface WishlistItem {
  _id: string;
  product: Product;
}

export const WishlistPage = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await wishlistApi.getAll();
      setItems(res.data.data || []);
    } catch {
      toast.error('Could not load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      setRemovingId(productId);
      await wishlistApi.toggle(productId);
      setItems((prev) => prev.filter((item) => item.product._id !== productId));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('An error occurred');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-primary">My Account</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and account security</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <UserSidebar />

          <div className="col-span-12 md:col-span-9">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <Heart size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">My Wishlist</h2>
                    <p className="text-gray-400 text-xs">
                      {items.length > 0 ? `${items.length} saved products` : 'No products yet'}
                    </p>
                  </div>
                </div>
                {items.length > 0 && (
                  <Link
                    to="/products"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Explore more <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <CenterScreenLoader />
            ) : items.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-24 text-center">
                <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5">
                  <FolderOpen size={36} className="text-red-200" />
                </div>
                <p className="text-gray-500 font-medium text-lg">Your wishlist is empty</p>
                <p className="text-gray-400 text-sm mt-2 mb-8">
                  Click the heart icon ♡ on products to save them here!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  <ShoppingBag size={16} /> Start Shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map(({ _id, product }) => (
                  <div
                    key={_id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                  >
                    {/* Image */}
                    <Link to={`/products/${product._id}`} className="block relative overflow-hidden">
                      <img
                        src={product.defaultImage}
                        alt={product.name}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(product._id);
                        }}
                        disabled={removingId === product._id}
                        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 text-red-400 hover:bg-red-500 hover:text-white shadow-sm transition-all disabled:opacity-50"
                        title="Remove from wishlist"
                      >
                        {removingId === product._id ? (
                          <span className="h-4 w-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-primary font-semibold text-sm px-4 py-2 rounded-full shadow-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          View Details
                        </span>
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{product.categoryName || 'Product'}</p>
                      <Link to={`/products/${product._id}`}>
                        <p className="font-bold text-gray-900 line-clamp-1 hover:text-primary transition-colors">
                          {product.name}
                        </p>
                      </Link>

                      {/* Stars */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              size={12}
                              fill={i < Math.floor(product.rating || 4) ? 'currentColor' : 'none'}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({product.totalReview || 0})</span>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        <Link
                          to={`/products/${product._id}`}
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
                        >
                          Buy Now <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
