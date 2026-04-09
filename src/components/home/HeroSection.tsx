import React from 'react';
import { motion } from 'framer-motion';
import banner from '@/assets/images/hero-img.png';
import subBanner from '@/assets/images/hero-img-left.png';
import decor from '@/assets/images/decor.png';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden pb-[273px]">
      {/* Background banner image */}
      <img
        src={banner}
        alt="Hero background"
        className="h-[135px] w-full object-cover md:h-[424px]"
        loading="eager"
      />

      {/* Right side model image with entrance animation */}
      <motion.img
        src={subBanner}
        alt="Fashion model"
        className="absolute top-[94px] right-0 w-[155px] md:w-[550px]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Headline with staggered text animation */}
      <motion.div
        className="absolute top-[91px] left-[24px] w-[183px] md:top-[337px] md:left-[135px] md:w-[700px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-primary text-[42px]/[50px] font-extrabold md:text-[160px]/[180px]">
          Wear the best
        </p>
        <img
          src={decor}
          alt=""
          className="absolute top-[177px] left-[-72px]"
          aria-hidden="true"
        />

        {/* Subtitle + CTA */}
        <motion.div
          className="mt-4 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="font-secondary text-text-light mb-6 max-w-[370px] text-[18px]/[30px]">
            Discover the most wanted styles. Find the best of modern fashion,
            curated just for you.
          </p>
          <Link
            to="/products"
            className="bg-primary font-secondary inline-flex items-center gap-2 rounded-full px-8 py-4 text-[16px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
        </motion.div>
      </motion.div>
    </div>
  );
};
