import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  ChevronRight,
  LogOut,
  Store,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/discounts', icon: Tag, label: 'Discounts' },
];

export const HeaderAdmin = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  return (
    <aside className="flex h-screen w-full flex-col bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
          <Store size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-white leading-tight">ShopAdmin</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Management</p>
        </div>
      </div>

      {/* Admin info */}
      <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/5 p-4 flex items-center gap-3 border border-white/5">
        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || 'A'}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-white truncate">{user?.name || 'Admin'}</p>
          <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@shop.com'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Menu</p>
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all group ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'} />
                <span className="text-sm font-medium">{label}</span>
                <ChevronRight size={14} className={isActive ? 'text-white/60' : 'text-gray-600'} />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => navigate('/')}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Back to Shop</span>
        </button>
      </div>
    </aside>
  );
};
