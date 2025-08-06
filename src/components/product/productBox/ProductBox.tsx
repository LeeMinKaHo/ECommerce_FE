import { Product } from "@/types/product";
import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
type ProductBoxProps = {
   product?: Product;
};
export const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
   return (
      <div>
         <img
            src={product?.imgUrl || "src/assets/images/0ee00a5705283e6b91df280343754c20f1a86423.png"}
            alt=""
            className="rounded-[18px] w-full h-[274px] object-cover"
         ></img>
         <Link to={`/products/${product?._id}`}>
            <div className="flex items-center justify-between">
               <p className="text-light font-secondary">Men-Cloths</p>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
               >
                  <path
                     d="M6.7722 2.13924L7.29262 2.66919L7.81304 2.13924C8.44228 1.49847 9.44635 0.729394 10.5225 0.729394C11.5515 0.729394 12.3786 1.07587 12.9447 1.62561C13.5092 2.17384 13.8585 2.96677 13.8585 3.94788C13.8585 5.00996 13.4343 5.90551 12.7355 6.7529C12.0226 7.61733 11.0654 8.38388 10.0481 9.19474C10.0481 9.19478 10.048 9.19481 10.048 9.19484L10.0311 9.20826C9.10759 9.94409 8.09023 10.7547 7.29297 11.6643C6.50355 10.7622 5.49558 9.95793 4.57993 9.22729L4.53956 9.19509L4.53927 9.19485C3.52169 8.38368 2.56459 7.61694 1.85191 6.75251C1.1533 5.90514 0.729394 5.00973 0.729394 3.94788C0.729394 2.96677 1.07868 2.17386 1.64325 1.62564C2.20938 1.0759 3.03665 0.729394 4.06604 0.729394C5.14112 0.729394 6.14239 1.49789 6.7722 2.13924Z"
                     stroke="#566363"
                     stroke-width="1.45879"
                  />
               </svg>
            </div>
            <p className="text-dark font-secondary text-[18px] font-semibold">
               {product?.name}
            </p>
            <p className="font-medium text-dark">${product?.price}</p>
            <div className="flex gap-3">
               <div className="flex gap-1">
                  
                  <FaStar></FaStar>
                  <FaStar></FaStar>
                  <FaStar></FaStar>
                  <FaStar></FaStar>
                  <FaStar></FaStar>
               </div>
               <p className="font-secondary text-[14px] text-light">
                  {product?.totalReview} Reviews
                  
               </p>
            </div>
         </Link>
      </div>
   );
};
