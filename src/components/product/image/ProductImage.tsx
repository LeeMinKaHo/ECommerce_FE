import { Variant } from '@/types/variant';
import React, { useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductImageProps {
  variants: Variant[];
  currentColor?: string;
  setIndexColor: (color: string) => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  variants,
  currentColor,
  setIndexColor,
}) => {
  if (!variants || variants.length === 0) {
    return <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">No images available</div>;
  }

  // Optimize: Only show unique images in the gallery to avoid duplicates from multiple sizes
  const uniqueColorVariants = useMemo(() => {
    const seenColors = new Set();
    return variants.filter((v) => {
      if (seenColors.has(v.color)) return false;
      seenColors.add(v.color);
      return true;
    });
  }, [variants]);

  const currentIndex = uniqueColorVariants.findIndex((v) => v.color === currentColor);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + uniqueColorVariants.length) % uniqueColorVariants.length;
    setIndexColor(uniqueColorVariants[prevIndex].color);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % uniqueColorVariants.length;
    setIndexColor(uniqueColorVariants[nextIndex].color);
  };

  const displayImage = variants.find((v) => v.color === currentColor)?.imageUrl || variants[0].imageUrl;

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image with smooth transition effect */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50 group">
        <img
          className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
          src={displayImage}
          alt={'Product gallery main image'}
        />
      </div>

      {/* Thumbnails + Navigation */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePrev} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
          disabled={uniqueColorVariants.length <= 1}
        >
          <FaChevronLeft size={14} />
        </button>

        <div className="flex flex-wrap gap-3 flex-1 justify-center">
          {uniqueColorVariants.map((item, index) => (
            <div
              key={index}
              className={`h-20 w-16 cursor-pointer overflow-hidden rounded-lg transition-all border-2 ${
                item.color === currentColor
                  ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-md'
                  : 'border-transparent hover:border-gray-200 grayscale-[0.5] hover:grayscale-0'
              }`}
              onClick={() => setIndexColor(item.color)}
            >
              <img
                className="h-full w-full object-cover"
                src={item.imageUrl}
                alt={item.color || `Select color ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={handleNext} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
          disabled={uniqueColorVariants.length <= 1}
        >
          <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
