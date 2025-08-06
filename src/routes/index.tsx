import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProductListPage } from "@/pages/ProudctListPage";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import React from "react";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import AdminPage from "@/pages/AdminPage";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrdersPage } from "@/pages/OrdersPage";
import { DiscountPage } from "@/pages/DiscountPage";
import { OrderDetailPage } from "@/pages/OrderDetailPage";
import AddProductPage from "@/pages/AddProductPage";
import { OrderListPage } from "@/pages/OrderListPage";
import RequireRole from "@/components/guard/RequireRole";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "user/order", element: <OrderListPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireRole allowedRoles={["admin"]}>
        <AdminLayout />
      </RequireRole>
    ),
    children: [
      { index: true, element: <AdminPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "discounts", element: <DiscountPage /> },
      { path: "orders/:orderId", element: <OrderDetailPage /> },
      { path: "products/create", element: <AddProductPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
