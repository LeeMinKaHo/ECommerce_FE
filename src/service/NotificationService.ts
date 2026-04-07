import axiosInstance from "./AxiosInstance";
import { Notification, NotificationListResponse } from "@/types/notification";

const NotificationService = {
    getNotifications: async (page = 1, limit = 20): Promise<NotificationListResponse> => {
        const res = await axiosInstance.get(`/notifications?page=${page}&limit=${limit}`);
        return res.data.data;
    },

    countUnread: async (): Promise<number> => {
        const res = await axiosInstance.get("/notifications/unread");
        return res.data.data.count;
    },

    markAllAsRead: async (): Promise<void> => {
        await axiosInstance.patch("/notifications/read-all");
    },

    markAsRead: async (id: string): Promise<void> => {
        await axiosInstance.patch(`/notifications/${id}/read`);
    },

    likeReview: async (reviewId: string): Promise<{ liked: boolean; likesCount: number }> => {
        const res = await axiosInstance.patch(`/reviews/${reviewId}/like`);
        return res.data.data;
    },
};

export default NotificationService;
