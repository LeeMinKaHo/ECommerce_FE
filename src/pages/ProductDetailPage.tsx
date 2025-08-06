import { CenterScreenLoader } from "@/components/CenterScreenLoader";
import { ProductImage } from "@/components/product/image/ProductImage";
import { ProductBox } from "@/components/product/productBox/ProductBox";
import { QuantityInput } from "@/components/QuantityInput/QuantityInput";
import { setCart } from "@/redux/slice/cartSlice";
import cartApi from "@/service/CartService";
import productApi from "@/service/ProductService";
import { Product } from "@/types/product";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ProductDetailPage = () => {
   const [product, setProduct] = useState<Product>();
   const { productId } = useParams();
   const [selectedColor, setSelectedColor] = useState<string>("");
   const [selectedSize, setSelectedSize] = useState<string >("");
   const [colorsPro, setColorsPro] = useState<string[]>([]); // ✅ sửa ở đây
   const [sizes, setSizes] = useState<string[]>([]); // ✅ thêm state cho sizes
   const [quantity, setQuantity] = useState(1);
   const dispatch = useDispatch();
   const user = useSelector((state: any) => state.user);
   
   const [selectedVariant , setSelectedVariant] = useState<any>(null);

   useEffect(() => {
      if (!productId) return;

      const getProduct = async () => {
         try {
            setLoading(true);
            const res = await productApi.getById(productId);
            const { product, colors, sizes } = res.data.data;
            setProduct(product);
            setColorsPro(colors);
            setSizes(sizes); // ✅ lưu sizes vào state
            setSelectedColor(colors?.[0] || null);
            setSelectedSize(sizes?.[0] || null);
         } finally {
            setLoading(false);
         }
      };

      getProduct();
   }, [productId]);
   const addToCart = async () => {
      if (loading) return;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
         toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
         return;
      }
      try {
         if (selectedColor === "") {
            toast.error("Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng.");
            return;
         }

         if (selectedSize === "") {
            toast.error("Vui lòng chọn size trước khi thêm vào giỏ hàng.");
            return;
         }

         if (!product?._id) {
            toast.error("Sản phẩm không hợp lệ.");
            return;
         }

         setLoading(true);

         const res = await cartApi.addToCart({
            productId: product._id,
            quantity,
            color: selectedColor,
            size: selectedSize,
         });

         toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
         dispatch(setCart(res.data.data.totalCart));
      } catch (error : any) {
         console.error("Error adding to cart:", error);
         toast.error(
            error?.response?.data?.message ||
               "Lỗi khi thêm sản phẩm vào giỏ hàng."
         );
      } finally {
         setLoading(false);
      }
   };

   const increaseQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
   };

   // Hàm giảm số lượng
   const decreaseQuantity = () => {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Không cho giảm dưới 1
   };

   const [loading, setLoading] = useState<boolean>(false);
   return loading && product ? (
      <CenterScreenLoader />
   ) : (
      <div className="container px-8 mx-auto ">
         <div className="flex flex-col md:flex-row gap-[20px] md:gap-[100px] mt-[100px]">
            <div className="flex-1">
               

               <ProductImage
                  variants={product?.variants || []}
                  currentColor={selectedColor}
                  setIndexColor={(color) => {
                     setSelectedColor(color);
                     setSelectedSize(""); // Reset size when color changes
                     const variant = product?.variants.find(
                        (v) => v.color === color
                     );
                     setSelectedVariant(variant);
                  }}
               />
            </div>

            <div className="flex-1  md:pt-5">
               <h1 className="font-primary text-4xl md:text-[58px] font-bold text-dark">
                  {product?.name || "Product Name"}
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
                     <p className="font-secondary text-light">
                        (3 Customer reviews)
                     </p>
                  </div>

                  <div className="text-primary text-[20px] font-bold font-secondary mb-5">
                     ${product?.price || "0.00"}
                  </div>
                  <p className="mb-7 font-secondary text-light text-[16px]/[28px]">
                     {product?.description ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do."}
                  </p>
                  <div className="flex flex-col gap-4">
                     {/* COLOR */}
                     <div className="flex items-center gap-3">
                        <p className="w-[60px] font-secondary font-semibold text-[18px]">
                           Color:
                        </p>
                        <div className="flex gap-2">
                           {colorsPro.map((color, index) => (
                              <div
                                 onClick={() => {
                                    setSelectedColor(color);
                                    setSelectedSize("")
                                 }}
                                 key={index}
                                 style={{ backgroundColor: color }}
                                 className="w-6 h-6 flex items-center justify-center text-sm leading-none font-medium border-1"
                              >
                                 {color === selectedColor && (
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 24 24"
                                       fill={
                                          color === "white" ? "black" : "white"
                                       }
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
                           {/* {product?.variants.map((variant: Variant, index) => (
                              <div
                                 key={index}
                                 style={{ backgroundColor: variant.color }}
                                 className="w-6 h-6 flex items-center justify-center text-sm leading-none font-medium border-1"
                              >
                                 {selectedItem?._id === variant._id && (
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 24 24"
                                       fill={
                                          variant.color === "white"
                                             ? "black"
                                             : "white"
                                       }
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
                           ))} */}
                        </div>
                     </div>

                     {/* SIZE */}
                     {/* SIZE */}
                     <div className="flex items-center gap-3">
                        <p className="w-[60px] font-secondary font-semibold text-[18px]">
                           Size:
                        </p>
                        <div className="flex gap-2">
                           {sizes.map((size, index) => {
                              const isAvailable = product?.variants.some(
                                 (variant) =>
                                    variant.color === selectedColor &&
                                    variant.size === size
                              );

                              return (
                                 <div
                                    key={index}
                                    className={`text-light border-[#C4D1D0] border-1 w-6 h-6 flex items-center justify-center text-sm leading-none font-medium 
                                       ${
                                          size == selectedSize
                                             ? "bg-primary text-white"
                                             : ""
                                       }
                                       ${
                                          isAvailable
                                             ? "cursor-pointer hover:bg-gray-200"
                                             : "bg-gray-300 cursor-not-allowed"
                                       }`}
                                    onClick={() => {
                                       if (isAvailable) {
                                          setSelectedSize(size);
                                       } else {
                                          toast.error(
                                             `Size ${size} is not available for the selected color.`
                                          );
                                       }
                                    }}
                                 >
                                    {size}
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
                        onClick={() => {
                           addToCart();
                        }}
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
         </div>
         <div className="hidden md:block">
            <p className="font-secondary text-black font-bold text-[20px]">
               About this product
            </p>
            <p className="font-secondary text-light text-[18px]/[30px] mt-4">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
               enim ad minim veniam, nostrud ipsum consectetur sed do. Lorem
               ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
               dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit
               amet, consectetur adipiscing elit
            </p>
            <p className="mt-7 font-secondary text-[18px] text-light">
               <b>Note:</b>
               Note: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
               sed do eiusmod tempor incididunt ut labore et dolore magna
               aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed
               do.
            </p>
         </div>
         <div></div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* {product?.reviews.map((review) => {
               return <ReviewBlock review={review}></ReviewBlock>;
            })} */}
         </div>
         <div className="mt-10">
            <p className="font-secondary text-[42px]/[52px] font-bold ">
               Similar products
            </p>
            <div className="flex ">
               <p>
                  Browse our most popular products and make your day more
                  beautiful and glorious.
               </p>
               <button>Browse All</button>
            </div>
            <div className="w-full overflow-hidden">
               <div className="max-w-full mx-auto flex flex-wrap md:flex-nowrap overflow-x-auto md:overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory px-2">
                  {[...Array(5)].map((_, index) => (
                     <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-[300px] snap-start"
                     >
                        <ProductBox product={product} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
