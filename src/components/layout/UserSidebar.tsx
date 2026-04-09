import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const navItems = [
  { to: '/account', icon: User, label: 'My Profile' },
  { to: '/user/order', icon: ShoppingBag, label: 'My Orders' },
  { to: '/wishlist', icon: Heart, label: 'My Wishlist' },
];

export const UserSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <aside className="col-span-12 md:col-span-3 lg:col-span-3">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden sticky top-[100px]">
        {/* Profile summary */}
        <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xl">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 truncate">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all group ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'} />
                  <span className="flex-1 font-medium text-sm">{label}</span>
                  <ChevronRight size={14} className={`${isActive ? 'text-white/70' : 'text-gray-300'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className="p-3 pt-0 border-t border-gray-100 mt-1">
          <button
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
