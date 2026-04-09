import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import style1 from '@/assets/images/style-1.png';
import style2 from '@/assets/images/style-2.png';
import style3 from '@/assets/images/style-3.png';

const galleryItems = [
  {
    src: style1,
    alt: 'Casual style',
    label: 'Casual',
    link: '/products',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: style2,
    alt: 'Street style',
    label: 'Street',
    link: '/products',
    span: '',
  },
  {
    src: style3,
    alt: 'Formal style',
    label: 'Formal',
    link: '/products',
    span: '',
  },
];

export const StyleGallery: React.FC = () => {
  return (
    <div className="container mx-auto mt-[150px] grid h-[500px] grid-cols-1 grid-rows-3 gap-x-[30px] gap-y-[17px] px-8 md:grid-cols-2 md:grid-rows-2">
      {galleryItems.map((item, index) => (
        <motion.div
          key={item.label}
          className={`group relative overflow-hidden rounded-lg ${item.span}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link to={item.link} className="block h-full w-full">
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay with label */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
              <div className="w-full p-6">
                <p className="font-primary translate-y-4 text-2xl font-bold text-white transition-transform duration-500 group-hover:translate-y-0">
                  {item.label}
                </p>
                <p className="font-secondary translate-y-4 text-sm text-white/80 transition-transform delay-75 duration-500 group-hover:translate-y-0">
                  Explore Collection →
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
