export interface Reviews {
    _id: string;
    headline: string;
    star: number;
    content: string;
    user: User;
    likes?: string[]; // Thêm mảng ID của những người đã like
}

export interface User {
    name: string
    avatar: string
}