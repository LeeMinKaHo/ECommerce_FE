import categoryApi from "@/service/category.service";
import { Category } from "@/types/category";
import React, { useEffect, useState } from "react";
interface CategoryListProps {
   onCategoryChange: (categoryId: string) => void;
   selectedCategoryId?: string; // Optional prop to highlight selected category
}
export const CategoryList: React.FC<CategoryListProps> = ({
   onCategoryChange,
   selectedCategoryId,
}) => {
   const [categoryList, setCategoryList] = useState<Category[]>([]);
   useEffect(() => {
      const fetchCategories = async () => {
         const res = await categoryApi.getAll();
         const { data } = res.data;
         setCategoryList(data);
      };

      fetchCategories();
   }, []);

   return (
      <div className=" w-full px-5 py-[25px] border-[#E5E5E5] border-1 rounded-2xl">
         <p className="font-secondary text-[20px] font-bold mb-[20px]">
            Catagories
         </p>
         <ul>
            {Array.isArray(categoryList) &&
               categoryList.length > 0 &&
               categoryList.map((category: Category) => (
                  <React.Fragment key={category._id}>
                     <li
                        className={`font-secondary text-[18px] cursor-pointer px-2 py-1 rounded ${
                           selectedCategoryId === category._id
                              ? "bg-primary text-white font-semibold"
                              : "hover:bg-gray-100"
                        }`}
                        onClick={() => onCategoryChange(category._id)}
                     >
                        {category.name} ({category.totalProduct})
                     </li>
                     <hr className="my-1" />
                  </React.Fragment>
               ))}
            <li
               className={`font-secondary text-[18px] cursor-pointer px-2 py-1 rounded ${
                  !selectedCategoryId
                     ? "bg-primary text-white font-semibold"
                     : "hover:bg-gray-100"
               }`}
               onClick={() => onCategoryChange("")}
            >
               All Products
            </li>
            <hr className="my-1" />
         </ul>
      </div>
   );
};
