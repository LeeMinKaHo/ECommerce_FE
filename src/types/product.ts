import { Reviews } from "./reviews";
import { Pagination } from "./share.type";
import { Size } from "./size";
import { Variant } from "./variant";
export interface Product {
   _id: string;
   name: string;
   description: string;
   price: number;
   categoryId: string;
   quantity: number;
   quantitySold: number;
   defaultImage : string ;
   variants: Variant[];
   categoryName: string;
   totalReview : number;
}
// types.ts hoặc ngay trong file nếu nhỏ gọn
export interface ProductDetailPage {
   _id: string;
   product: Product;

   colors: string[];
   sizes: string[];
   createBy: string;
   reviews: Reviews[];
}
export interface ProductFillter extends Pagination {
   sort?: number;
   name?: string;
   categoryId?: string;
}
