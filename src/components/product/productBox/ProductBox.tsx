import cartApi from '@/service/CartService';
import wishlistApi from '@/service/WishlistService';
import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAuth } from '../../guard/useAuth';

type ProductBoxProps = {
  product?: Product;
};

export const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { checkLogin } = useAuth();

  useEffect(() => {
    if (user?._id && product?._id) {
      wishlistApi.checkStatus(product._id).then((res) => {
        setIsLiked(res.data.data.isWishlisted);
      });
    }
  }, [user?._id, product?._id]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!checkLogin()) return;

    if (product?._id) {
      try {
        const res = await wishlistApi.toggle(product._id);
        const action = res.data.data.action;
        setIsLiked(action === 'added');
        toast.success(res.data.message);
      } catch (error) {
        toast.error('Có lỗi xảy ra khi thực hiện thao tác này');
      }
    }
  };

  return (
    <div className="group relative rounded-xl border border-transparent p-2 transition-all hover:border-gray-100 hover:shadow-md">
      <div className="relative overflow-hidden rounded-lg">
        <Link to={`/products/${product?._id}`}>
          <img
            src={product?.defaultImage}
            alt={product?.name || 'Product'}
            className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Heart Icon (Tym) */}
        <button 
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 animate-in zoom-in duration-300" size={18} />
          ) : (
            <FaRegHeart size={18} />
          )}
        </button>

        {/* Optional: Add a simple overlay or keep it clean */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-premium group-hover:opacity-100">
           <span className="bg-white/80 px-4 py-2 rounded-full text-sm font-semibold text-primary shadow-sm hover:bg-white transition-all">
             View Details
           </span>
        </div>
      </div>

      <Link to={`/products/${product?._id}`} className="mt-3 block">
        <div className="flex items-center justify-between">
          <p className="font-secondary text-sm text-light">{product?.categoryName || 'General'}</p>
        </div>
        <p className="font-secondary mt-1 text-[17px] font-bold text-dark line-clamp-1 group-hover:text-primary transition-colors">
          {product?.name}
        </p>
        <p className="mt-1 font-bold text-primary">${product?.price}</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex gap-0.5 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={13} fill={i < 4 ? "currentColor" : "none"} stroke="currentColor"></FaStar>
            ))}
          </div>
          <p className="font-secondary text-[12px] text-light">
            ({product?.totalReview || 0} reviews)
          </p>
        </div>
      </Link>
    </div>
  );
};
