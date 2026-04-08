import { Category } from '@/types/category';
import React from 'react';
type CateogryProps = {
  category: Category;
};
export const CategoryComponent: React.FC<CateogryProps> = ({ category }) => {
  return (
    <a
      href={`http://localhost:5173/products?categoryId=${category._id}`}
      className="border-primary font-secondary flex min-w-[170px] items-center justify-center rounded-full border px-8 py-3 text-[18px]/[30px]"
    >
      {category.name}
    </a>
  );
};
