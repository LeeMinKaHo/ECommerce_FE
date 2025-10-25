import { Variant } from "@/types/variant";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ColorItem {
   image: string;
   color: string; // Tên màu để làm alt cho hình ảnh
}

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
      console.log(variants);
      return <p>No images available</p>;
   }

   const currentIndex = variants.findIndex((v) => v.color === currentColor);

   const handlePrev = () => {
      const prevIndex = (currentIndex - 1 + variants.length) % variants.length;
      setIndexColor(variants[prevIndex].color);
   };

   const handleNext = () => {
      const nextIndex = (currentIndex + 1) % variants.length;
      setIndexColor(variants[nextIndex].color);
   };

   return (
      <div className="flex-1">
         {/* Main Image */}
         <img
            className="w-full max-h-[500px] object-cover mb-4 bg-amber-300"
            src={
               variants.find((v) => v.color === currentColor)?.imageUrl ||
               variants[0].imageUrl
            }
            alt={"Product Image"}
         />

         {/* Thumbnails + Navigation */}
         <div className="flex items-center gap-3">
            <button onClick={handlePrev}>
               <FaChevronLeft />
            </button>

            <div className="flex gap-2">
               {variants.map((item, index) => (
                  <div
                     key={index}
                     className={`w-[125px] h-[125px] border-2 rounded-md cursor-pointer ${
                        item.color === currentColor
                           ? "border-primary"
                           : "border-gray-300"
                     }`}
                     onClick={() => setIndexColor(item.color)}
                  >
                     <img
                        className="w-full h-full object-cover"
                        src={item.imageUrl}
                        alt={item.color || `Color ${index + 1}`}
                     />
                  </div>
               ))}
            </div>

            <button onClick={handleNext}>
               <FaChevronRight />
            </button>
         </div>
      </div>
   );
};

