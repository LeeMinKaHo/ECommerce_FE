import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProductBox } from '@/components/product/productBox/ProductBox';
import { Product } from '@/types/product';
import { AnimatedSection } from './AnimatedSection';

type ProductSectionProps = {
  title: string;
  products: Product[];
  viewAllLink?: string;
};

export const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  viewAllLink = '/products',
}) => {
  return (
    <AnimatedSection className="container mx-auto mt-[150px] px-8">
      <h2 className="font-secondary text-dark mb-[70px] text-[42px] font-bold">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductBox product={product} />
          </motion.div>
        ))}
      </div>
      <div className="mt-[70px] text-center">
        <Link
          to={viewAllLink}
          className="bg-primary font-secondary inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </AnimatedSection>
  );
};
