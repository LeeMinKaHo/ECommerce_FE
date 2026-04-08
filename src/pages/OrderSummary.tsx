import { Paypal } from '@/components/button/Paypal';
import { CartBlock, CartItem } from '@/components/cart/CartBlock';
import { decreaseCart } from '@/redux/slice/cartSlice';
import cartApi from '@/service/CartService';
import { CreateInvoiceDTO } from '@/types/invoice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const OrderSummary = () => {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [carts, setCarts] = useState<CartItem[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingInfo = state?.data;

  const createInvoiceDTO: CreateInvoiceDTO = {
    shippingInfo: {
      email: shippingInfo.email,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
    },
    paymentMethod: 'paypal',
  };

  const fetchApiCart = async () => {
    try {
      const res = await cartApi.getCart();
      setCarts(res.data.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiCart();
  }, []);
  useEffect(() => {
    if (!shippingInfo) navigate('/checkout/shipping');
  }, [shippingInfo, navigate]);
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
    <div className="container mx-auto px-6 py-4">
      <h3 className="font-secondary text-2xl font-semibold">Order Summary</h3>
      <div className="grid grid-cols-2 gap-25">
        <div>
          <p className="font-secondary text-xl font-medium">Items:</p>
          {carts &&
            carts.map((item, index) => (
              <CartBlock
                key={item._id}
                cartItem={item}
                handleRemoveItem={removeItem}
                index={index}
              />
            ))}
        </div>
        <div>
          <div>
            <p className="font-secondary text-xl font-medium">Order info</p>
            <p className="font-secondary mt-[1] font-medium">
              Email :{shippingInfo.email}{' '}
            </p>
            <p className="font-secondary my-[3px] font-medium">
              Phone :{shippingInfo.phone}
            </p>
            <p className="font-secondary font-medium">
              Address :{shippingInfo.address}
            </p>
          </div>
          <div className="my-3">
            <p className="font-secondary text-xl font-medium">Shipping info</p>
            <p className="font-secondary my-[3px] font-medium">
              Total : ${carts.reduce((total, item) => total + item.price, 0)}
            </p>
            <p className="font-secondary my-[3px] font-medium">
              Payment: Paypal
            </p>
          </div>
          <Paypal createInvoiceDTO={createInvoiceDTO} />
        </div>
      </div>
    </div>
  );
};
