import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductListPage } from '@/pages/ProudctListPage';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import React from 'react';
import { ProductDetailPage } from '@/pages/ProductDetailPage';

import { AdminLayout } from '@/components/layout/AdminLayout';
import { OrdersPage } from '@/pages/OrdersPage';
import { DiscountPage } from '@/pages/DiscountPage';
import { OrderDetailPage } from '@/pages/OrderDetailPage';
import AddProductPage from '@/pages/AddProductPage';
import { OrderListPage } from '@/pages/OrderListPage';
import RequireRole from '@/components/guard/RequireRole';
import { AdminAllProductPage } from '@/pages/AdminAllProductPage';
import { CheckOutPage } from '@/pages/CheckOutPage';
import { PaymentResult } from '@/pages/PaymentResultPage';
import { OrderSummary } from '@/pages/OrderSummary';
import { PrivateRoute } from './PrivateRoute';
import { DashboardPage } from '@/pages/DashboardPage';
import { AccountPage } from '@/pages/AccountPage';
import { OrderUpdatePage } from '@/pages/OrderUpdatePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },

      // ✅ Route yêu cầu đăng nhập
      {
        element: <PrivateRoute />, // bọc nhóm route private
        children: [
          { path: 'user/order', element: <OrderListPage /> },
          { path: 'checkout', element: <CheckOutPage /> },
          { path: 'order-summary', element: <OrderSummary /> },
          { path: 'payment-result', element: <PaymentResult /> },
          { path: 'account', element: <AccountPage /> },
        ],
      },
    ],
  },

  // ✅ Route cho Admin
  {
    path: '/admin',
    element: (
      <RequireRole allowedRoles={['admin']}>
        <AdminLayout />
      </RequireRole>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:orderId', element: <OrderDetailPage /> },
      { path: 'discounts', element: <DiscountPage /> },
      { path: 'products', element: <AdminAllProductPage /> },
      { path: 'products/create', element: <AddProductPage /> },
      { path: 'orders/update/:orderId', element: <OrderUpdatePage /> },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);
