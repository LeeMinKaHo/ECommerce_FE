import { CenterScreenLoader } from '@/components/CenterScreenLoader';
import { ProductImage } from '@/components/product/image/ProductImage';
import { ProductBox } from '@/components/product/productBox/ProductBox';
import { QuantityInput } from '@/components/QuantityInput/QuantityInput';
import { setCart } from '@/redux/slice/cartSlice';
import cartApi from '@/service/CartService';
import productApi from '@/service/ProductService';
import wishlistApi from '@/service/WishlistService';
import { Product } from '@/types/product';

import React, { useEffect, useState, useMemo } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { MESSAGES as msg } from '@/constant/Message';
import { setDialog } from '@/redux/slice/dialogSlice';
import { RootState } from '@/redux/store';

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [allSizes, setAllSizes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productApi.getById(productId);
        const { product: prodData, colors: colorList, sizes: sizeList } = res.data.data;
        
        setProduct(prodData);
        setColors(colorList);
        setAllSizes(sizeList);
        
        // Default selection
        setSelectedColor(colorList?.[0] || '');
        setSelectedSize(sizeList?.[0] || '');

        // Fetch similar products
        const similarRes = await productApi.getSimilar(productId);
        setSimilarProducts(similarRes.data.data);

        // Check wishlist status
        if (user?._id) {
          const wishRes = await wishlistApi.checkStatus(productId);
          setIsLiked(wishRes.data.data.isWishlisted);
        }
      } catch (err) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId, user?._id]);

  // Optimize: Pre-calculate available sizes for the current color
  const availableSizesForColor = useMemo(() => {
    if (!product) return [];
    return product.variants
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size);
  }, [product, selectedColor]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    
    // Smart Selection: Keep the size if it exists in the new color
    const sizeStillAvailable = product?.variants.some(
      (v) => v.color === color && v.size === selectedSize
    );

    if (!sizeStillAvailable) {
      // If not, pick the first available size for this color
      const firstAvailable = product?.variants.find((v) => v.color === color)?.size;
      setSelectedSize(firstAvailable || '');
    }
  };

  const handleToggleWishlist = async () => {
    if (!user?._id) {
      dispatch(setDialog('signIn'));
      return;
    }
    if (!productId) return;

    try {
      const res = await wishlistApi.toggle(productId);
      setIsLiked(res.data.data.action === 'added');
      toast.success(res.data.message);
    } catch (err) {
      toast.error('Could not update wishlist');
    }
  };

  const addToCart = async () => {
    if (!user?._id) {
      dispatch(setDialog('signIn'));
      toast.error(msg.AUTH.NOT_LOGGED_IN);
      return;
    }

    if (!selectedColor || !selectedSize || !product) {
      toast.error('Please select both color and size');
      return;
    }

    try {
      setLoading(true);
      const variant = product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );

      if (!variant) {
        toast.error('Selected combination is out of stock');
        return;
      }

      const res = await cartApi.addToCart({
        productId: product._id,
        quantity,
        variantId: variant._id,
      });

      toast.success(msg.CART.ADD_SUCCESS);
      dispatch(setCart(res.data.data.totalCart));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || msg.CART.ADD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) return <CenterScreenLoader />;
  if (!product) return <div className="py-20 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 md:px-8 py-24">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <FaChevronRight size={10} />
        <Link to="/products" className="hover:text-primary transition-colors">Catalog</Link>
        <FaChevronRight size={10} />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Gallery */}
        <ProductImage
          variants={product.variants}
          currentColor={selectedColor}
          setIndexColor={handleColorChange}
        />

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                {product.categoryName || 'New Arrival'}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-primary">
                {product.name}
              </h1>
            </div>
            
            <button 
              onClick={handleToggleWishlist}
              className={`p-3 rounded-full border transition-all ${
                isLiked 
                ? 'bg-red-50 border-red-100 text-red-500' 
                : 'bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100'
              }`}
            >
              {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={16} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} stroke="currentColor" />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.totalReview || 0} Customer reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-8">
            ${product.price ? product.price.toLocaleString() : '0.00'}
          </div>

          <div className="space-y-8 mb-10">
            <p className="text-gray-600 leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <p className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                Color: <span className="text-gray-500 font-normal uppercase">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: color }}
                    className={`h-10 w-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      color === selectedColor 
                      ? 'border-gray-900 scale-110 shadow-md ring-4 ring-gray-100' 
                      : 'border-transparent hover:scale-105'
                    }`}
                    title={color}
                  >
                    {color === selectedColor && (
                      <div className={`h-2 w-2 rounded-full ${color.toLowerCase() === 'white' ? 'bg-black' : 'bg-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-bold text-gray-900 mb-4">
                Select Size:
              </p>
              <div className="flex flex-wrap gap-3">
                {allSizes.map((size, index) => {
                  const isAvailable = availableSizesForColor.includes(size);
                  const isSelected = size === selectedSize;

                  return (
                    <button
                      key={index}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-[50px] px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center relative ${
                        isSelected
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                          : isAvailable
                          ? 'bg-white border-gray-100 text-gray-600 hover:border-primary/30 hover:bg-gray-50'
                          : 'bg-gray-50 border-transparent text-gray-300 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {size}
                      {!isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[80%] h-[2px] bg-gray-300 rotate-45" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6 pt-4">
              <span className="text-sm font-bold text-gray-900">Quantity:</span>
              <QuantityInput
                quantity={quantity}
                onIncrease={() => setQuantity(q => q + 1)}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              onClick={addToCart}
              className="flex-1 h-14 bg-primary text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Add to Cart
            </button>
            <button
              className="flex-1 h-14 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-[0.98]"
            >
              Buy It Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs / Content Sections */}
      <div className="mt-24 pt-20 border-t border-gray-100">
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold mb-6">Product Information</h3>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
            <p>{product.description}</p>
            <ul className="mt-6 list-disc pl-5 space-y-2">
              <li>Premium quality material and finishing</li>
              <li>Sustainably sourced fabrics</li>
              <li>Reinforced stitching for durability</li>
              <li>Care: Machine wash cold, tumble dry low</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-24 pt-20 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-2">You May Also Like</h3>
            <p className="text-gray-500">Discover other styles from our {product.categoryName} collection.</p>
          </div>
          <Link to={`/products?categoryId=${product.categoryId}`} className="text-primary font-bold hover:underline">
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {similarProducts.length > 0 ? (
            similarProducts.map((p) => (
              <ProductBox key={p._id} product={p} />
            ))
          ) : (
            [...Array(4)].map((_, i) => (
              <div key={i} className="opacity-60 grayscale-[0.5] pointer-events-none animate-pulse">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl mb-4" />
                <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-100 rounded" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
