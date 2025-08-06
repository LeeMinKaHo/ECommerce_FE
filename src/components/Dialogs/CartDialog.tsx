// CartSidebar.tsx
import React, { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import axiosInstance from "@/service/AxiosInstance";
import cartApi from "@/service/CartService";
import { CartBlock, CartItem } from "../cart/CartBlock";
import PayPalButton from "../button/PaypalButton";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { decreaseCart } from "@/redux/slice/cartSlice";
import { current } from "@reduxjs/toolkit";

export default function CartDialog() {
   const [carts, setCarts] = useState<CartItem[]>([]);
   const dispatch = useDispatch();
   useEffect(() => {
      const fetchApiCart = async () => {
         try {
            console.log("Fetching cart items...");
            const res = await cartApi.getCart();
            console.log(res);
            if (res) {
               setCarts(res.data.data);
            }
         } catch (error) {
            console.error("Error fetching cart items:", error);
         }
      };

      fetchApiCart();
   }, []);

   const removeItem = async (id: string) => {
      try {
         const res = await cartApi.removeItem(id);
         setCarts((prev) => prev.filter((item) => item._id !== id));
         dispatch(decreaseCart());
         toast.success("Item removed from cart successfully");
      } catch (error) {
         toast.error("Error removing item from cart");
         console.log("Error removing item from cart:", error);
      }
   };
   return (
      <DialogContent className="w-[800px] !max-w-none mx-auto bg-white p-6 flex flex-col md:flex-row gap-6">
         <DialogTitle className="hidden">Giỏ hàng</DialogTitle>
         {/* LEFT - Cart Items */}
         <div className="w-full md:w-2/3">
            {carts &&
               carts.map((item , index) => (
                  <CartBlock
                     key={item._id}
                     cartItem={item}
                     handleRemoveItem={removeItem}
                     index={index}
                  />
               ))}
         </div>

         {/* RIGHT - Summary */}
         <div className="w-full md:w-1/3 border-l md:pl-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold">
                  Cart order total ({carts.length} items)
               </h3>
               <span className="text-xl font-bold">
                  {" "}
                  $
                  {carts.reduce((total, item) => total + item.price, 0)}
               </span>
            </div>
            <p className="text-sm text-green-600 font-medium mb-1">
               Congrats! You get Free Shipping.
            </p>
            <p className="text-xs text-gray-500 mb-6">
               Excludes furniture, mattresses & other exclusions apply.
            </p>
            <div className="space-y-3">
               <button className="w-full bg-teal-800 text-white py-3 rounded hover:bg-teal-700">
                  View Cart
               </button>
               <PayPalButton></PayPalButton>
               {/* <button className="w-full bg-yellow-400 text-black py-3 rounded hover:bg-yellow-300">
                  Check Out
               </button> */}
            </div>
         </div>
      </DialogContent>
   );
}
