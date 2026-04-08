// CartSidebar.tsx
import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle } from '../ui/dialog';
import axiosInstance from '@/service/AxiosInstance';
import cartApi from '@/service/CartService';
import { CartBlock, CartItem } from '../cart/CartBlock';
import PayPalButton from '../button/PaypalButton';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { decreaseCart } from '@/redux/slice/cartSlice';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { setDialog } from '@/redux/slice/dialogSlice';

export default function CartDialog() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApiCart = async () => {
      try {
        const res = await cartApi.getCart();
        setCarts(res.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchApiCart();
  }, []);

  const removeItem = async (id: string) => {
    try {
      const res = await cartApi.removeItem(id);
      setCarts((prev) => prev.filter((item) => item._id !== id));
      dispatch(decreaseCart());
      toast.success('Item removed from cart successfully');
    } catch (error) {
      toast.error('Error removing item from cart');
      console.log('Error removing item from cart:', error);
    }
  };
  return (
    <DialogContent className="mx-auto flex w-[800px] !max-w-none flex-col gap-6 bg-white p-6 md:flex-row">
      <DialogTitle className="hidden">Giỏ hàng</DialogTitle>
      {/* LEFT - Cart Items */}
      <div className="w-full md:w-2/3">
        {carts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-sm">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-1800917.png"
              alt="Empty cart"
              className="mb-6 h-40 w-40 opacity-90"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Your cart is empty 🛒
            </h2>
            <p className="mt-2 mb-6 max-w-sm text-gray-500">
              Looks like you haven’t added anything yet. Start exploring our
              latest products!
            </p>
            <a
              href="/products"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Browse Products
            </a>
          </div>
        ) : (
          carts.map((item, index) => (
            <CartBlock
              key={item._id}
              cartItem={item}
              handleRemoveItem={removeItem}
              index={index}
            />
          ))
        )}
      </div>

      {/* RIGHT - Summary */}
      <div className="w-full border-l md:w-1/3 md:pl-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Cart order total ({carts.length} items)
          </h3>
          <span className="text-xl font-bold">
            {' '}
            ${carts.reduce((total, item) => total + item.price, 0)}
          </span>
        </div>
        <p className="mb-1 text-sm font-medium text-green-600">
          Congrats! You get Free Shipping.
        </p>
        <p className="mb-6 text-xs text-gray-500">
          Excludes furniture, mattresses & other exclusions apply.
        </p>
        <div className="space-y-3">
          <button
            className={`w-full rounded py-3 text-white transition ${
              carts.length === 0
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-teal-800 hover:bg-teal-700'
            }`}
            disabled={carts.length === 0}
            onClick={() => {
              if (carts.length === 0) return; // ✅ đảm bảo an toàn
              dispatch(setDialog(false));
              navigate('/checkout', {
                state: {
                  data: carts.reduce((total, item) => total + item.price, 0),
                },
              });
            }}
          >
            Check Out
          </button>

          {/* <PayPalButton></PayPalButton> */}
          {/* <button className="w-full bg-yellow-400 text-black py-3 rounded hover:bg-yellow-300">
                  Check Out
               </button> */}
        </div>
      </div>
    </DialogContent>
  );
}
