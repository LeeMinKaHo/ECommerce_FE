import { Reviews } from "@/types/reviews";
import React from "react";

interface ReviewBlockProps {
  review : Reviews
}

export const ReviewBlock: React.FC<ReviewBlockProps> = ({
   review
}) => {
   return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
         {/* Avatar và tên */}
         <div className="flex items-center gap-4 mb-4">
            <img
               src={review.user.avatar}
               
               className="w-12 h-12 rounded-full object-cover"
            />
            <div>
               <p className="font-semibold text-gray-800">{review.user.name}</p>
               {/* Hiển thị số sao */}
               <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                     <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={index < review.star ? "#FFD44D" : "#E5E7EB"} // Màu vàng cho sao được đánh giá, xám cho sao còn lại
                        className="w-5 h-5"
                     >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.173L12 18.896l-7.334 3.874 1.4-8.173L.132 9.21l8.2-1.192L12 .587z" />
                     </svg>
                  ))}
               </div>
            </div>
         </div>

         {/* Tiêu đề */}
         <p className="font-semibold text-lg text-gray-900 mb-2">{review.headline}</p>

         {/* Nội dung đánh giá */}
         <p className="text-gray-600 text-sm">{review.content}</p>
      </div>
   );
};