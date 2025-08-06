import axiosInstance from "@/service/AxiosInstance";
import { Product } from "@/types/product";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart, setCart } from "@/redux/slice/cartSlice"; // Action Redux để thêm sản phẩm vào giỏ hàng
import { set } from "react-hook-form";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import { QuantityInput } from "@/components/QuantityInput/QuantityInput";
interface DetailProductProps {
   product: Product;
}
export const DetailProduct = ({ product }: DetailProductProps) => {
   const [quantity, setQuantity] = useState(1);

   // Hàm tăng số lượng
   const increaseQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
   };

   // Hàm giảm số lượng
   const decreaseQuantity = () => {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Không cho giảm dưới 1
   };
   const checkLogin = useRequireLogin();
   const dispatch = useDispatch();

   const handleAddToCart = async () => {
      if (!checkLogin()) return;

      try {
         if (indexSize === null) {
            toast.error("Please select size!");
            return;
         }
         console.log(colorList[indexColor]);
         console.log(sizeList[indexSize]);
         const res = await axiosInstance.post("/carts", {
            productId: product?._id,
            color: colorList[indexColor],
            sizeId: sizeList[indexSize].id,
            quantity: 1,
         });
         console.log(res);
         if (res.data.data) {
            toast.success("Add to cart successfully!");
            dispatch(setCart(res.data.data.totalItems));
         } else toast.error("Add to cart failed!");
      } catch (error) {
         console.log(error);
      }
   };
   const colorList = [...new Set(product.variants.map((v) => v.color))];
   const sizeList = [
      ...new Map(
         product.variants.map((v) => [v.size, { size: v.size, id: v.sizeId }])
      ).values(),
   ];

   return (
      <div className="flex-1 pt-5">
         <h1 className="font-primary text-[58px] font-bold text-dark">
            Modern Yellow Sweater
         </h1>
         <div>
            <div className="flex gap-2 mt-6 mb-4">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="106"
                  height="18"
                  viewBox="0 0 106 18"
                  fill="none"
               >
                  <path
                     d="M9 0L12 6L18 6.75L13.88 11.37L15 18L9 15L3 18L4.13 11.37L0 6.75L6 6L9 0Z"
                     fill="#FFD44D"
                  />
                  <path
                     d="M31 0L34 6L40 6.75L35.88 11.37L37 18L31 15L25 18L26.13 11.37L22 6.75L28 6L31 0Z"
                     fill="#FFD44D"
                  />
                  <path
                     d="M53 0L56 6L62 6.75L57.88 11.37L59 18L53 15L47 18L48.13 11.37L44 6.75L50 6L53 0Z"
                     fill="#FFD44D"
                  />
                  <path
                     d="M75 0L78 6L84 6.75L79.88 11.37L81 18L75 15L69 18L70.13 11.37L66 6.75L72 6L75 0Z"
                     fill="#FFD44D"
                  />
                  <path
                     d="M97 0L100 6L106 6.75L101.88 11.37L103 18L97 15L91 18L92.13 11.37L88 6.75L94 6L97 0Z"
                     fill="#FFD44D"
                  />
               </svg>
               <p className="font-secondary text-light">(3 Customer reviews)</p>
            </div>

            <div className="text-primary text-[20px] font-bold font-secondary mb-5">
               $100.00
            </div>
            <p className="mb-7 font-secondary text-light text-[16px]/[28px]">
               Occaecati doloribus et laborum magnam conse qua tur enim
               temporibus cumque commodi tempora est tempora odio.
            </p>
            <div className="flex flex-col gap-4">
               {/* COLOR */}
               <div className="flex items-center gap-3">
                  <p className="w-[60px] font-secondary font-semibold text-[18px]">
                     Color:
                  </p>
                  <div className="flex gap-2">
                     {colorList.map((color, index) => (
                        <div
                           key={index}
                           style={{ backgroundColor: color }}
                           onClick={() => {
                              setIndexColor(index);
                              setIndexSize(null); // Reset size selection when color changes
                           }}
                           className="w-6 h-6 flex items-center justify-center text-sm leading-none font-medium border-1"
                        >
                           {indexColor === index && (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill={color === "white" ? "black" : "white"}
                                 className="w-5 h-5"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M20.292 5.292a1 1 0 011.416 1.416l-11 11a1 1 0 01-1.416 0l-5-5a1 1 0 011.416-1.416L10 15.586l10.292-10.294z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               {/* SIZE */}
               {/* SIZE */}
               <div className="flex items-center gap-3">
                  <p className="w-[60px] font-secondary font-semibold text-[18px]">
                     Size:
                  </p>
                  <div className="flex gap-2">
                     {sizeList.map((size, index) => {
                        const selectedColor = colorList[indexColor];

                        // Kiểm tra size có hợp lệ với màu đang chọn không
                        const isAvailable = product.variants.some(
                           (variant) =>
                              variant.color === selectedColor &&
                              variant.size === size.size &&
                              variant.quantity > 0 // optional
                        );

                        return (
                           <div
                              key={index}
                              onClick={() => {
                                 if (!isAvailable) return; // Không cho chọn nếu không hợp lệ
                                 setIndexSize(index);
                              }}
                              className={`text-light border-[#C4D1D0] border-1 w-6 h-6 flex items-center justify-center text-sm leading-none font-medium 
                  ${index === indexSize ? "bg-primary text-white" : ""}
                  ${
                     !isAvailable
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200 cursor-pointer"
                  }
               `}
                           >
                              {size.size}
                           </div>
                        );
                     })}
                  </div>
               </div>
               {/* Quanlity */}
               <div className="flex items-center gap-3">
                  <p className="w-[60px] font-secondary font-semibold text-[18px]">
                     Qty:
                  </p>
                  <QuantityInput
                     quantity={quantity}
                     onIncrease={increaseQuantity}
                     onDecrease={decreaseQuantity}
                  />
               </div>
            </div>

            <div className="flex flex-col mt-7 text-[18px] gap-4">
               <div
                  onClick={handleAddToCart}
                  className="w-full py-3 h-[56px] bg-primary text-white font-secondary flex items-center justify-center"
               >
                  Add to cart
               </div>
               <div className="w-full py-3 h-[56px] bg-[#FFD44D] text-black font-secondary flex items-center justify-center">
                  Check out
               </div>
            </div>
         </div>
      </div>
   );
};
