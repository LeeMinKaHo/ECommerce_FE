import React, { useState } from "react";

export const ReviewForm: React.FC = () => {
   const [rating, setRating] = useState(0); // Lưu số sao được chọn
   const [headline, setHeadline] = useState(""); // Lưu tiêu đề đánh giá
   const [review, setReview] = useState(""); // Lưu nội dung đánh giá

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log({ rating, headline, review });
      // Thực hiện logic gửi đánh giá (API call)
   };

   return (
      <form
         onSubmit={handleSubmit}
         className=" rounded-lg p-6 w-full mt-[55px]"
      >
         {/* Đánh giá sao */}
         <div className="mb-4">
            <p className="font-semibold text-gray-800 mb-2">
               How would you rate this?
            </p>
            <div className="flex gap-1">
               {Array.from({ length: 5 }, (_, index) => (
                  <svg
                     key={index}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill={index < rating ? "#FFD44D" : "#E5E7EB"} // Màu vàng cho sao được chọn
                     className="w-6 h-6 cursor-pointer"
                     onClick={() => setRating(index + 1)} // Cập nhật số sao khi click
                  >
                     <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.173L12 18.896l-7.334 3.874 1.4-8.173L.132 9.21l8.2-1.192L12 .587z" />
                  </svg>
               ))}
            </div>
         </div>

         {/* Tiêu đề đánh giá */}
         <div className="mb-4">
            <label
               htmlFor="headline"
               className="block font-semibold text-gray-800 mb-2"
            >
               Add a headline
            </label>
            <input
               type="text"
               id="headline"
               value={headline}
               onChange={(e) => setHeadline(e.target.value)}
               placeholder="Write a summary of your review"
               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
         </div>

         {/* Nội dung đánh giá */}
         <div className="mb-4">
            <label
               htmlFor="review"
               className="block font-semibold text-gray-800 mb-2"
            >
               Write a review
            </label>
            <textarea
               id="review"
               value={review}
               onChange={(e) => setReview(e.target.value)}
               placeholder="Tell us what you think"
               rows={4}
               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
         </div>

         {/* Nút gửi đánh giá */}
         <button
            type="submit"
            className="bg-primary text-white font-semibold py-4 px-9 rounded-lg  hover:bg-primary-dark transition"
         >
            Submit Review
         </button>
      </form>
   );
};