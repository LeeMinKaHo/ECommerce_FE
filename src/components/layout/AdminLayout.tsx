import React from "react";
import { HeaderAdmin } from "./HeaderAdmin";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import { useLayout } from "./LayoutContext";
export const AdminLayout = () => {
   
   return (
      <div className=" grid grid-cols-12 gap-3 bg-[#E5E5E5]">
         <div className="col-span-3">
            <HeaderAdmin />
           
         </div>
         <div className="col-span-9 ">
            <Outlet></Outlet>
            <Toaster richColors />
         </div>
      </div>
   );
};
