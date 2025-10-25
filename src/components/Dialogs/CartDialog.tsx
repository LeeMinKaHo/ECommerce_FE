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
import { useNavigate } from "react-router-dom";
import { setDialog } from "@/redux/slice/dialogSlice";

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
            {carts.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-sm">
                  <img
                     src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-1800917.png"
                     alt="Empty cart"
                     className="w-40 h-40 opacity-90 mb-6"
                  />
                  <h2 className="text-2xl font-semibold text-gray-700">
                     Your cart is empty 🛒
                  </h2>
                  <p className="text-gray-500 mt-2 mb-6 max-w-sm">
                     Looks like you haven’t added anything yet. Start exploring
                     our latest products!
                  </p>
                  <a
                     href="/products"
                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
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
         <div className="w-full md:w-1/3 border-l md:pl-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold">
                  Cart order total ({carts.length} items)
               </h3>
               <span className="text-xl font-bold">
                  {" "}
                  ${carts.reduce((total, item) => total + item.price, 0)}
               </span>
            </div>
            <p className="text-sm text-green-600 font-medium mb-1">
               Congrats! You get Free Shipping.
            </p>
            <p className="text-xs text-gray-500 mb-6">
               Excludes furniture, mattresses & other exclusions apply.
            </p>
            <div className="space-y-3">
               <button
                  className={`w-full py-3 rounded text-white transition 
    ${
       carts.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-teal-800 hover:bg-teal-700"
    }`}
                  disabled={carts.length === 0}
                  onClick={() => {
                     if (carts.length === 0) return; // ✅ đảm bảo an toàn
                     dispatch(setDialog(false));
                     navigate("/checkout", {
                        state: {
                           data: carts.reduce(
                              (total, item) => total + item.price,
                              0
                           ),
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
