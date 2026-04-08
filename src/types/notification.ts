export type NotificationType =
  | 'REVIEW_LIKED'
  | 'NEW_COMMENT'
  | 'ORDER_SHIPPED'
  | 'FLASH_SALE';

export interface Notification {
  _id: string;
  type: NotificationType;
  message: string;
  icon: string;
  payload: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
}
