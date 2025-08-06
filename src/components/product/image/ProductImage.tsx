import { Variant } from "@/types/variant";
import React from "react";

interface ColorItem {
   image: string;
   color: string; // Tên màu để làm alt cho hình ảnh
}

interface ProductImageProps {
   variants: Variant[];
   currentColor?: string;
   setIndexColor: (color : string) => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
   variants,
   currentColor,
   setIndexColor,
}) => {
   if (!variants || variants.length === 0) {
      return <p>No images available</p>;
   }

   return (
      <div className="flex-1">
         {/* Main Image */}
         <img
            className="w-full max-h-[500px] object-cover mb-4 bg-amber-300"
            src={variants.find((v) => v.color === currentColor)?.imageUrl || variants[0].imageUrl}
            alt={"Product Image"}
         />

         {/* Thumbnail List */}
         <div className="flex gap-2">
            {variants.map((item, index) => (
               <div
                  key={index}
                  className={`w-[125px] h-[125px] border-2 rounded-md cursor-pointer ${
                     item.color === currentColor ? "border-primary" : "border-gray-300"
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
      </div>
   );
};