import ChatBox from "@/components/form/ChatBox";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import { setCart } from "@/redux/slice/cartSlice";
import cartApi from "@/service/CartService";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { CenterScreenLoader } from "../CenterScreenLoader";
import { useCart } from "@/hooks/useCart";
import { DialogManager } from "../Dialogs/DialogManager";
import { Footer } from "./Footer";
export const MainLayout = () => {

   const { user, loading: authLoading } = useAuth(); // 👈 rename rõ ràng hơn
   const dispatch = useDispatch();
   const { items, total, loading: cartLoading, error } = useCart(user);
   console.log(authLoading, cartLoading);

   // Chờ cả auth + cart xong rồi mới render layout
   if (authLoading || cartLoading) return <CenterScreenLoader />;
   console.log("user:", user);
   console.log("cartLoading:", cartLoading);
   return (
      <div>
         <DialogManager />
         <Header />
         <Outlet />
         <Toaster richColors />
         💬
         <Footer />
      </div>
   );
};
