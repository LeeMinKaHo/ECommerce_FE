import { setCart } from "@/redux/slice/cartSlice";
import cartApi from "@/service/CartService";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useCart = (user?: any) => {
   const dispatch = useDispatch();
   const [items, setItems] = useState<any[]>([]);
   const [total, setTotal] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!user) {
         setLoading(false);
         return;
      }

      const fetchCart = async () => {
         try {
            setLoading(true);
            const res = await cartApi.getCart();
            console.log("Cart items:", res.data.data);
            const cartItems = res.data.data;
            setItems(cartItems);
            dispatch(setCart(cartItems.length));
            setTotal(
               cartItems.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
               )
            );
         } catch (err) {
            setError("Failed to load cart");
         } finally {
            setLoading(false);
         }
      };

      fetchCart();
   }, [user]);

   return { items, total, loading, error };
};
