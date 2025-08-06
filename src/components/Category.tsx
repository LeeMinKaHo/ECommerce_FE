import { Category } from "@/types/category";
import React from "react";
type CateogryProps = {
   category: Category;
};
export const CategoryComponent: React.FC<CateogryProps> = ({ category }) => {
   return (
      <a
         href={`http://localhost:5173/products?categoryId=${category._id}`}
         className="flex items-center justify-center min-w-[170px] px-8 py-3 border border-primary font-secondary text-[18px]/[30px] rounded-full"
      >
         {category.name}
      </a>
   );
};
