export interface Pagination {
   page: number;
   limit: number;
   total?: number;
}

export interface ApiResponse<T = any> {
   data: T;
   error?: {
      code: string;
      message: string;
   };
   pagination?: Pagination;
}

export type UserRole = "user" | "admin";
