export class Pagination {
   page: number;
   limit: number;

   constructor(page?: number, limit?: number) {
      this.page = page ?? 1;
      this.limit = limit ?? 12;
   }
}
export class PaginationInfo extends Pagination {
   total: number;

   constructor(page?: number, limit?: number, total?: number) {
      super(page, limit); // gọi constructor của class cha
      this.total = total ?? 0;
   }
}
export interface ApiResponse<T> {
   data: T;
   error: any;
   pagination: any;
}
