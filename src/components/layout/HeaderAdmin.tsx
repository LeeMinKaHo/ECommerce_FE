import React from "react";
import { useLocation, Link } from "react-router-dom";

export const HeaderAdmin = () => {
  const location = useLocation();

  const isActive = (path :string) => location.pathname === path;

  return (
    <div className="h-screen w-full bg-white text-black px-3">
      {/* User Block */}
      <div className="py-4 flex items-center gap-3 border-b border-gray-200">
        <img
          src="https://via.placeholder.com/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-bold">Manuel</p>
          <p className="text-sm text-gray-500">Manuel@email.com</p>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        <li>
          <Link
            to="/admin/orders"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/orders") ? "bg-gray-200 text-blue-600 font-semibold" : "hover:bg-gray-100"
            }`}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/products") ? "bg-gray-200 text-blue-600 font-semibold" : "hover:bg-gray-100"
            }`}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/admin/discounts"
            className={`block px-3 py-2 rounded ${
              isActive("/admin/discounts") ? "bg-gray-200 text-blue-600 font-semibold" : "hover:bg-gray-100"
            }`}
          >
            Discounts
          </Link>
        </li>
      </ul>
    </div>
  );
};
