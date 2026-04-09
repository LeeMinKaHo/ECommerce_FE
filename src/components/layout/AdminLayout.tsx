import React from 'react';
import { HeaderAdmin } from './HeaderAdmin';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/sonner';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      {/* Sidebar – fixed width */}
      <div className="w-64 shrink-0">
        <HeaderAdmin />
      </div>

      {/* Main content – scrollable */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
        <Toaster richColors />
      </div>
    </div>
  );
};
