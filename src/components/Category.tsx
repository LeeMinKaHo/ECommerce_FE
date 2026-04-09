import { Category } from '@/types/category';
import React from 'react';
import { Link } from 'react-router-dom';

type CategoryProps = {
  category: Category;
};

export const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
  return (
    <Link
      to={`/products?categoryId=${category._id}`}
      className="border-primary text-primary font-secondary flex min-w-[170px] items-center justify-center rounded-full border px-8 py-3 text-[18px]/[30px] transition-all duration-300 hover:bg-primary hover:text-white"
    >
      {category.name}
    </Link>
  );
};
