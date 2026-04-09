import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import avatar from '@/assets/images/avatar.png';

type TestimonialProps = {
  name?: string;
  date?: string;
  content?: string;
  rating?: number;
  avatarUrl?: string;
};

const defaultTestimonials: TestimonialProps[] = [
  {
    name: 'Sarah Johnson',
    date: 'March 15, 2026',
    content:
      'Amazing quality and fast shipping! The clothes fit perfectly and the material is premium. Will definitely order again.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    date: 'February 28, 2026',
    content:
      'Great customer service and beautiful products. The return process was hassle-free. This is my go-to store now.',
    rating: 4,
  },
  {
    name: 'Emily Rodriguez',
    date: 'January 10, 2026',
    content:
      'Love the variety of styles available. Found exactly what I was looking for at a great price. Highly recommend!',
    rating: 5,
  },
];

export const TesttimonialBlock: React.FC<TestimonialProps> = ({
  name,
  date,
  content,
  rating,
  avatarUrl,
}) => {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
      {/* Quote icon */}
      <div className="mb-4">
        <FaQuoteLeft className="text-primary/20 text-3xl transition-colors duration-300 group-hover:text-primary/40" />
      </div>

      {/* Content */}
      <p className="font-secondary mb-6 flex-1 text-[15px]/[24px] text-gray-600">
        {content}
      </p>

      {/* User info + rating */}
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl || avatar}
          alt={name || 'Customer'}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
          loading="lazy"
        />
        <div className="flex-1">
          <p className="font-secondary text-[15px] font-bold text-gray-900">
            {name}
          </p>
          <p className="font-secondary text-[13px] text-gray-400">{date}</p>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${i < (rating || 5) ? 'text-yellow-400' : 'text-gray-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/** Exporta default testimonials data for the HomePage to use */
export { defaultTestimonials };
