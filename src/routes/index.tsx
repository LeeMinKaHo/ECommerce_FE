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
import { AdminAllProductPage } from "@/pages/AdminAllProductPage";
import { CheckOutPage } from "@/pages/CheckOutPage";
import { PaymentResult } from "@/pages/PaymentResultPage";
import { OrderSummary } from "@/pages/OrderSummary";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { index: true, element: <HomePage /> },
         { path: "products", element: <ProductListPage /> },
         { path: "products/:productId", element: <ProductDetailPage /> },

         // ✅ Route yêu cầu đăng nhập
         {
            element: <PrivateRoute />, // bọc nhóm route private
            children: [
               { path: "user/order", element: <OrderListPage /> },
               { path: "checkout", element: <CheckOutPage /> },
               { path: "order-summary", element: <OrderSummary /> },
               { path: "payment-result", element: <PaymentResult /> },
            ],
         },
      ],
   },

   // ✅ Route cho Admin
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
         { path: "orders/:orderId", element: <OrderDetailPage /> },
         { path: "discounts", element: <DiscountPage /> },
         { path: "products", element: <AdminAllProductPage /> },
         { path: "products/create", element: <AddProductPage /> },
      ],
   },

   // 404
   { path: "*", element: <NotFoundPage /> },
]);
