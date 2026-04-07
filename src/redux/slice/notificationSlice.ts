import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@/types/notification";

interface NotificationState {
    items: Notification[];
    unreadCount: number;
}

const initialState: NotificationState = {
    items: [],
    unreadCount: 0,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        // Khi nhận được thông báo mới từ socket
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.items.unshift(action.payload);
            state.unreadCount += 1;
        },
        // Khi load danh sách từ API
        setNotifications: (
            state,
            action: PayloadAction<{ items: Notification[]; unreadCount: number }>
        ) => {
            state.items = action.payload.items;
            state.unreadCount = action.payload.unreadCount;
        },
        // Đánh dấu tất cả đã đọc
        markAllRead: (state) => {
            state.items = state.items.map((n) => ({ ...n, isRead: true }));
            state.unreadCount = 0;
        },
        // Đánh dấu một thông báo đã đọc
        markOneRead: (state, action: PayloadAction<string>) => {
            const item = state.items.find((n) => n._id === action.payload);
            if (item && !item.isRead) {
                item.isRead = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        // Reset khi logout
        clearNotifications: () => initialState,
    },
});

export const {
    addNotification,
    setNotifications,
    markAllRead,
    markOneRead,
    clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
