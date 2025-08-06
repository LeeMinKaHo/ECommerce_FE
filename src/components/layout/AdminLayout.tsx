import React from "react";
import { HeaderAdmin } from "./HeaderAdmin";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
   return (
      <div className="px-8 grid grid-cols-12 gap-3 bg-[#E5E5E5]">
         <div className="col-span-3">
            <HeaderAdmin />
         </div>
         <div className="col-span-9 ">
            <Outlet></Outlet>
         </div>
      </div>
   );
};
