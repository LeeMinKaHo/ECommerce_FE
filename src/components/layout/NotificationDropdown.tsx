import React, { useState } from "react";
import { Bell, Check, Clock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { markOneRead, markAllRead } from "@/redux/slice/notificationSlice";
import NotificationService from "@/service/NotificationService";

export const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { items, unreadCount } = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();

    const handleMarkAsRead = async (id: string) => {
        try {
            await NotificationService.markAsRead(id);
            dispatch(markOneRead(id));
        } catch (error) {
            console.error("Mark as read failed", error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await NotificationService.markAllAsRead();
            dispatch(markAllRead());
        } catch (error) {
            console.error("Mark all as read failed", error);
        }
    };

    return (
        <div className="relative">
            {/* Badge Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
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
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform origin-top-right transition-all">
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Thông báo</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
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
                                        className={`p-4 border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer flex gap-3 ${!notification.isRead ? "bg-blue-50/10" : ""
                                            }`}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
                                            {notification.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm leading-snug ${!notification.isRead ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                                                <Clock size={10} />
                                                <span>{new Date(notification.createdAt).toLocaleString("vi-VN")}</span>
                                            </div>
                                        </div>
                                        {!notification.isRead && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-3 text-center border-t border-gray-50">
                            <button className="text-xs text-gray-500 hover:text-gray-900 font-medium">
                                Xem tất cả
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
