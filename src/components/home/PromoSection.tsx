import React from 'react';
import { motion } from 'framer-motion';
import promoBanner from '@/assets/images/promoBanner.png';
import { Link } from 'react-router-dom';

export const PromoSection: React.FC = () => {
  return (
    <div className="mt-[150px] overflow-hidden bg-[#F1DEB4] py-20">
      <div className="mx-auto flex max-w-[1170px] items-center justify-between gap-8 px-8">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-primary text-[42px] font-semibold text-black">
            Special Promo
          </p>
          <p className="font-primary my-2 text-[52px] font-bold">
            WEEKENDS SALE
          </p>
          <p className="text-primary text-[52px] font-semibold">
            UP TO 50% OFF
          </p>
          <Link
            to="/products"
            className="font-secondary mt-6 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[16px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
          >
            Shop the Sale
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
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="w-full object-contain transition-transform duration-500 hover:scale-105"
            src={promoBanner}
            alt="Weekend sale promotion"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
};
