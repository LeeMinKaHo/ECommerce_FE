import React, { useState } from 'react';
import { Bell, Check, Clock } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { markOneRead, markAllRead } from '@/redux/slice/notificationSlice';
import NotificationService from '@/service/NotificationService';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, unreadCount } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch = useDispatch();

  const handleMarkAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      dispatch(markOneRead(id));
    } catch (error) {
      console.error('Mark as read failed', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      dispatch(markAllRead());
    } catch (error) {
      console.error('Mark all as read failed', error);
    }
  };

  return (
    <div className="relative">
      {/* Badge Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-4">
              <h3 className="font-bold text-gray-900">Thông báo</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Check size={12} /> Đọc hết
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="mx-auto mb-2 opacity-20" size={40} />
                  <p className="text-sm">Chưa có thông báo nào</p>
                </div>
              ) : (
                items.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleMarkAsRead(notification._id)}
                    className={`flex cursor-pointer gap-3 border-b border-gray-50 p-4 transition-colors hover:bg-blue-50/30 ${
                      !notification.isRead ? 'bg-blue-50/10' : ''
                    }`}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg">
                      {notification.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm leading-snug ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}
                      >
                        {notification.message}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
                        <Clock size={10} />
                        <span>
                          {new Date(notification.createdAt).toLocaleString(
                            'vi-VN'
                          )}
                        </span>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-50 p-3 text-center">
              <button className="text-xs font-medium text-gray-500 hover:text-gray-900">
                Xem tất cả
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
