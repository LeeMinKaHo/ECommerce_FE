import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Components
import { HomePageSkeleton } from '@/components/skeletons/HomePageSkeleton';
import { HeroSection } from '@/components/home/HeroSection';
import { StyleGallery } from '@/components/home/StyleGallery';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ProductSection } from '@/components/home/ProductSection';
import { PromoSection } from '@/components/home/PromoSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { AnimatedSection } from '@/components/home/AnimatedSection';
import { CategoryComponent } from '@/components/Category';
import { ProductBox } from '@/components/product/productBox/ProductBox';
import {
  TesttimonialBlock,
  defaultTestimonials,
} from '@/components/Testimonials/TesttimonialBlock';

// Services & Types
import categoryApi from '@/service/category.service';
import productApi from '@/service/ProductService';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

// Error state component
const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-gray-300"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <p className="font-secondary text-lg text-gray-500">
      Oops! Something went wrong while loading.
    </p>
    <button
      onClick={onRetry}
      className="font-secondary bg-primary rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      Try Again
    </button>
  </div>
);

export const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);

      const [categoryRes, featuredRes, newArrivalRes] = await Promise.all([
        categoryApi.getAll(),
        productApi.getAll({ page: 1, limit: 4, sort: -1 }),
        productApi.getAll({ page: 1, limit: 4 }),
      ]);

      setCategories(categoryRes.data.data);
      setFeaturedProducts(featuredRes.data.data);
      setNewArrivals(newArrivalRes.data.data);
    } catch (err) {
      console.error('Error fetching home page data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton loading
  if (loading) return <HomePageSkeleton />;

  // Error state with retry
  if (error) return <ErrorState onRetry={fetchData} />;

  return (
    <>
      {/* ──── Hero Banner ──── */}
      <HeroSection />

      {/* ──── Style Gallery ──── */}
      <StyleGallery />

      {/* ──── Features (Delivery, Payment, Security) ──── */}
      <FeaturesSection />

      {/* ──── Browse by Category ──── */}
      <AnimatedSection className="container mx-auto mt-[150px] px-8">
        <h2 className="font-secondary text-dark mb-[70px] text-center text-[42px] font-bold">
          Browse by Category
        </h2>
        <div className="mb-[70px] flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CategoryComponent category={category} />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
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
      </AnimatedSection>

      {/* ──── Featured Products ──── */}
      <ProductSection
        title="Featured Products"
        products={featuredProducts}
        viewAllLink="/products"
      />

      {/* ──── New Arrivals ──── */}
      <ProductSection
        title="New Arrivals"
        products={newArrivals}
        viewAllLink="/products"
      />

      {/* ──── Promotion Banner ──── */}
      <PromoSection />

      {/* ──── Customer Testimonials ──── */}
      <AnimatedSection className="container mx-auto mt-[150px] px-8">
        <h2 className="font-secondary text-dark mb-[70px] text-center text-[42px] font-bold">
          Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {defaultTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TesttimonialBlock
                name={testimonial.name}
                date={testimonial.date}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* ──── Newsletter ──── */}
      <NewsletterSection />
    </>
  );
};
