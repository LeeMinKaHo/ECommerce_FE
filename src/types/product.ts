import { Reviews } from "./reviews";
import { Pagination } from "./share.type";
import { Size } from "./size";
import { Variant } from "./variant";

// types.ts hoặc ngay trong file nếu nhỏ gọn
export interface Product {
   _id: string;
   name: string;
   imgUrl : string;
   description: string;
   price: number;
   quanlity: number;
   quanlitySold: number;
   rating : number;
   totalReview: number;
   variants : Variant[];
   colors: string[];
   sizes: Size[];
   createBy: string;
   reviews : Reviews[]
}
export interface ProductFillter extends Pagination {
   sort?: number;
   name?: string;
   categoryId?: string;
}
