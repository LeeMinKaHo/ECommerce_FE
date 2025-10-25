import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export const PrivateRoute = () => {
   const token = localStorage.getItem("token");

   // Nếu không có token hoặc user → redirect về trang login
   if (!token) {
      return <Navigate to="/" replace />;
   }
   const user = useSelector((state: any) => state.user);
   if (!user) {
      // Chưa login → redirect về trang login
      return <Navigate to="/" replace />;
   }

   // Đã login → render children
   return <Outlet />;
};
