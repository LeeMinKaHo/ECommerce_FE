import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, setNotifications } from "@/redux/slice/notificationSlice";
import { RootState } from "@/redux/store";
import NotificationService from "@/service/NotificationService";
import { toast } from "sonner";

/**
 * ✅ Hook quản lý thông báo realtime
 * - Kết nối socket namespace /notifications
 * - Tự động fetch thông báo khi mount
 * - Lắng nghe sự kiện notification:new
 */
export const useNotification = () => {
    const dispatch = useDispatch();
    const socketRef = useRef<Socket | null>(null);
    const user = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem("accessToken");

    // 1. Fetch danh sách ban đầu
    useEffect(() => {
        if (user?._id && token) {
            const fetchData = async () => {
                try {
                    const data = await NotificationService.getNotifications();
                    const unreadCount = await NotificationService.countUnread();
                    dispatch(setNotifications({
                        items: data.notifications,
                        unreadCount: unreadCount
                    }));
                } catch (error) {
                    console.error("Failed to fetch notifications", error);
                }
            };
            fetchData();
        }
    }, [user?._id, token, dispatch]);

    // 2. Setup Socket connection
    useEffect(() => {
        if (!user?._id || !token) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        // Kết nối tới namespace /notifications
        const socket = io("http://localhost:4000/notifications", {
            auth: { token },
            transports: ["websocket"],
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("🔔 Connected to Notification Socket");
        });

        // Lắng nghe thông báo mới
        socket.on("notification:new", (notification) => {
            console.log("📩 New Notification received:", notification);

            // Cập nhật Redux
            dispatch(addNotification(notification));

            // Hiển thị Toast thông báo nhanh
            toast(notification.message, {
                icon: notification.icon,
                description: new Date(notification.createdAt).toLocaleString(),
                action: {
                    label: "Xem",
                    onClick: () => console.log("Navigate to details", notification.payload),
                },
            });
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Notification Socket Error:", err.message);
        });

        return () => {
            if (socket.connected) {
                socket.disconnect();
            }
        };
    }, [user?._id, token, dispatch]);

    return {
        socket: socketRef.current,
    };
};
