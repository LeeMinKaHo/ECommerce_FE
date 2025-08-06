import decor from "@/assets/images/decor.png";
import subBanner from "@/assets/images/hero-img-left.png";
import banner from "@/assets/images/hero-img.png";
import style1 from "@/assets/images/style-1.png";
import style2 from "@/assets/images/style-2.png";
import style3 from "@/assets/images/style-3.png";
import { CategoryComponent } from "@/components/Category";
import { CenterScreenLoader } from "@/components/CenterScreenLoader";

import { ProductBox } from "@/components/product/productBox/ProductBox";
import categoryApi from "@/service/category.service";
import productApi from "@/service/ProductService";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import React, { useEffect } from "react";
import promoBanner from "@/assets/images/promoBanner.png";
import test from "node:test";
import { TesttimonialBlock } from "@/components/Testimonials/TesttimonialBlock";
export const HomePage = () => {
   const [categories, setCategories] = React.useState<Category[]>([]);
   const [products, setProducts] = React.useState<Product[]>([]);
   const [loading, setLoading] = React.useState(false);
   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true); // nếu bạn dùng loading
            const [categoryRes, productRes] = await Promise.all([
               categoryApi.getAll(),
               productApi.getAll({ page: 1, limit: 4 }),
            ]);

            // Cập nhật state
            setCategories(categoryRes.data.data);
            setProducts(productRes.data.data);
         } catch (error) {
            console.error("Error fetching data:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   return (
      <>
         {loading ? (
            <CenterScreenLoader></CenterScreenLoader>
         ) : (
            <>
               {" "}
               <div className="relative pb-[273px]">
                  <img
                     src={banner}
                     alt=""
                     className="w-full h-[135px] md:h-[424px] "
                  />
                  <img
                     src={subBanner}
                     alt=""
                     className="w-[155px] md:w-[550px] absolute right-0 top-[94px]"
                  />

                  <p className="absolute  left-[24px] md:left-[135px] top-[91px] md:top-[337px] font-primary font-extrabold  text-[42px]/[50px] md:text-[160px]/[180px] w-[183px] md:w-[700px] line-h">
                     Wear the best
                     <img
                        src={decor}
                        alt=""
                        className="absolute top-[177px] left-[-72px]"
                     />
                  </p>
                  {/* <p className="flex justify-center items-center font-secondary text-[18px]/[30px] text-light   md:w-[370px]">
                        The most wanted styles is waiting for you. Find the best
                        styles of modern shoes for you. Still, the second option
                        holds promised. could make the tagline.
                     </p> */}
               </div>
               <div className=" mt-[150px] grid grid-cols-1  md:grid-cols-2 grid-rows-3 md:grid-rows-2 container mx-auto px-8 gap-x-[30px] gap-y-[17px] h-[500px]">
                  <div className=" md:col-span-1 md:row-span-2">
                     <img
                        src={style1}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                     />
                  </div>
                  <div>
                     <img
                        src={style2}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                     />
                  </div>
                  <div>
                     <img
                        src={style3}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                     />
                  </div>
               </div>
               <div className="container  mx-auto px-8 flex gap-[30px] mt-[150px]">
                  <div className="flex-1 pt-[64px] pb-[34px] flex flex-col items-center bg-[#FAFAFA]">
                     <div className="p-[30px] bg-[#E5E5E5] rounded-full inline-block ">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="50"
                           height="50"
                           viewBox="0 0 50 50"
                           fill="none"
                        >
                           <path
                              d="M7.61493 36.0945H10.0151C10.3287 37.1735 10.9836 38.1216 11.8811 38.7974C12.779 39.4729 13.8714 39.8398 14.995 39.8426C16.1234 39.851 17.2232 39.4891 18.1256 38.8119C19.0282 38.1347 19.6836 37.1802 19.9911 36.0945H27.7946C28.1094 37.1768 28.767 38.1275 29.6688 38.8033C30.5706 39.4793 31.6676 39.844 32.7946 39.8426C33.9236 39.8521 35.0246 39.4902 35.9277 38.813C36.8311 38.1359 37.4871 37.1808 37.7946 36.0945H40.5508C41.0614 36.0957 41.5514 35.8934 41.9124 35.5323C42.2734 35.1713 42.4757 34.681 42.4746 34.1705V30.4866C42.4718 30.0569 42.3273 29.64 42.0633 29.3007C41.7991 28.9615 41.4305 28.719 41.0147 28.6105V28.5745H27.3947C27.0022 28.5745 26.6257 28.4188 26.3482 28.1411C26.0706 27.8635 25.9146 27.4871 25.9146 27.0946V14.5789C25.9146 14.2828 25.7971 13.9991 25.5878 13.7895C25.3786 13.5802 25.0945 13.4628 24.7988 13.4628H20.0426C18.9539 13.4695 17.9321 13.9898 17.2868 14.8668C17.2349 14.9187 17.1827 15.0227 17.1308 15.0746L13.1308 21.1106L10.3108 21.5108C9.5028 21.6218 8.76223 22.0216 8.22623 22.6366C7.69023 23.2513 7.39473 24.0393 7.39473 24.8548V29.8108C6.92458 29.8705 6.49208 30.0981 6.1768 30.4519C5.86151 30.8055 5.68433 31.2611 5.67847 31.7349V34.1707C5.67763 34.6836 5.8816 35.1755 6.24515 35.5368C6.60871 35.8981 7.10201 36.099 7.61458 36.0948L7.61493 36.0945ZM32.8149 32.0345C33.501 32.046 34.1556 32.3233 34.6408 32.8085C35.1259 33.2938 35.4036 33.9486 35.4148 34.6344C35.4148 35.3241 35.1411 35.9854 34.6534 36.4731C34.1656 36.9606 33.5044 37.2345 32.8149 37.2345C32.1252 37.2345 31.4639 36.9606 30.9765 36.4731C30.4888 35.9854 30.2148 35.3241 30.2148 34.6344C30.2148 33.945 30.4888 33.2837 30.9765 32.796C31.4639 32.3085 32.1252 32.0345 32.8149 32.0345ZM14.9949 32.0384C15.681 32.0499 16.3356 32.3275 16.8208 32.8127C17.306 33.2977 17.5836 33.9525 17.5948 34.6386C17.5928 35.3275 17.3183 35.9877 16.8311 36.4748C16.344 36.9617 15.6839 37.2365 14.9949 37.2385C14.3088 37.2273 13.6542 36.9497 13.1691 36.4644C12.6839 35.9792 12.4062 35.3244 12.3951 34.6386C12.397 33.9497 12.6716 33.2895 13.1587 32.8024C13.6459 32.3152 14.306 32.0407 14.9949 32.0384ZM28.4149 24.9827V11.2627C28.4149 10.9753 28.5293 10.6996 28.7324 10.4962C28.9359 10.2928 29.2115 10.1787 29.4989 10.1787H34.6587L34.659 14.2108C34.659 14.4008 34.813 14.5548 35.003 14.5548H37.7151H37.7148C37.8061 14.5548 37.8937 14.5185 37.9581 14.4541C38.0226 14.3894 38.0589 14.302 38.0589 14.2108V10.1787H43.219C43.5064 10.1787 43.7821 10.2928 43.9854 10.4962C44.1888 10.6996 44.303 10.9753 44.303 11.2627V24.9827C44.303 25.27 44.1888 25.5457 43.9854 25.7491C43.782 25.9522 43.5064 26.0666 43.219 26.0666H29.4947C29.2079 26.0655 28.9333 25.9508 28.7308 25.7477C28.5285 25.5446 28.4147 25.2695 28.4147 24.9826L28.4149 24.9827Z"
                              fill="#005D63"
                           />
                        </svg>
                     </div>
                     <p className="font-secondary font-bold text-center w-[242px] text-[25px]/[35px]">
                        Super Fast and Free Delivery
                     </p>
                  </div>
                  <div className="flex-1 pt-[64px] pb-[34px] flex flex-col items-center bg-[#FAFAFA]">
                     <div className="p-[30px] bg-[#E5E5E5] rounded-full inline-block ">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="50"
                           height="50"
                           viewBox="0 0 50 50"
                           fill="none"
                        >
                           <path
                              d="M37.4445 12.2284C36.4767 11.4353 35.2517 11 33.9822 11H15.3039C14.0344 11 12.8003 11.4348 11.8416 12.2284L9.1875 14.4117H40.0905L37.4445 12.2284Z"
                              fill="#005D63"
                           />
                           <path
                              d="M43.2853 19.3935C43.2853 18.5833 43.0812 17.7901 42.6726 17.0396C42.3619 16.4765 41.7583 16.1182 41.0925 16.1182H8.18369C7.51788 16.1182 6.91426 16.4765 6.61232 17.0393C6.20411 17.7898 6 18.5833 6 19.3936V34.8829C6 37.7059 8.38821 40.0005 11.3265 40.0005H37.9592C40.8975 40.0005 43.2857 37.7059 43.2857 34.8829L43.2853 19.3935ZM37.9588 29.7652C37.9588 30.7035 37.1598 31.4711 36.1833 31.4711H23.7547C22.7782 31.4711 21.9792 30.7035 21.9792 29.7652V22.9418C21.9792 22.0035 22.7782 21.2359 23.7547 21.2359H36.1833C37.1598 21.2359 37.9588 22.0035 37.9588 22.9418V29.7652Z"
                              fill="#005D63"
                           />
                           <path
                              d="M25.5303 24.6465H34.4078V28.0582H25.5303V24.6465Z"
                              fill="#005D63"
                           />
                        </svg>
                     </div>
                     <p className="font-secondary font-bold text-center w-[242px] text-[25px]/[35px]">
                        Money back Guaranteed
                     </p>
                  </div>
                  <div className="flex-1 pt-[64px] pb-[34px] flex flex-col items-center bg-[#FAFAFA]">
                     <div className="p-[30px] bg-[#E5E5E5] rounded-full inline-block ">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="41"
                           height="41"
                           viewBox="0 0 41 41"
                           fill="none"
                        >
                           <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.5415 3.41699C5.71105 3.41699 3.4165 5.71153 3.4165 8.54199V32.4587C3.4165 35.2891 5.71104 37.5837 8.5415 37.5837H32.4582C35.2886 37.5837 37.5832 35.2891 37.5832 32.4587V15.3753C37.5832 13.1439 36.157 11.2455 34.1665 10.5419V8.54199C34.1665 5.71153 31.872 3.41699 29.0415 3.41699H8.5415ZM8.5415 6.83366C7.59802 6.83366 6.83317 7.59851 6.83317 8.54199C6.83317 9.48548 7.59802 10.2503 8.5415 10.2503H30.7498V8.54199C30.7498 7.59851 29.985 6.83366 29.0415 6.83366H8.5415ZM29.0415 20.5003C27.1545 20.5003 25.6248 22.03 25.6248 23.917C25.6248 25.804 27.1545 27.3337 29.0415 27.3337H32.4582C33.4017 27.3337 34.1665 26.5688 34.1665 25.6253V22.2087C34.1665 21.2652 33.4017 20.5003 32.4582 20.5003H29.0415Z"
                              fill="#005D63"
                           />
                        </svg>
                     </div>
                     <p className="font-secondary font-bold text-center w-[242px] text-[25px]/[35px]">
                        Super Secure Payment System
                     </p>
                  </div>
               </div>
               {/* clothes and cateogry  */}
               <div className="container px-8 mt-[150px] mx-auto">
                  <div className="flex justify-center gap-2 mb-[70px]">
                     {categories.map((category) => (
                        <CategoryComponent
                           key={category._id}
                           category={category}
                        ></CategoryComponent>
                     ))}
                  </div>
                  <div className="flex gap-[30px] justify-center items-center">
                     {products.map((product) => (
                        <div className="flex-1">
                           <ProductBox
                              key={product._id}
                              product={product}
                           ></ProductBox>
                        </div>
                     ))}
                  </div>
               </div>
               {/* Featured product section */}
               <div className="container mx-auto mt-[150px] px-8">
                  <p className="font-secondary text-[42px] text-dark mb-[70px] font-bold">
                     Featured Products
                  </p>
                  <div className="flex gap-[30px] justify-center items-center">
                     {products.map((product) => (
                        <div className="flex-1">
                           <ProductBox
                              key={product._id}
                              product={product}
                           ></ProductBox>
                        </div>
                     ))}
                  </div>
                  <div className="mt-[70px] text-center">
                     <div className="px-9 py-4 bg-primary text-white font-secondary inline-flex items-center justify-center">
                        View All
                     </div>
                  </div>
               </div>
               {/* New Arrival product */}
               <div className="container mx-auto mt-[150px] px-8">
                  <p className="font-secondary text-[42px] text-dark mb-[70px] font-bold">
                     New Arrivals
                  </p>
                  <div className="flex gap-[30px] justify-center items-center">
                     {products.map((product) => (
                        <div className="flex-1">
                           <ProductBox
                              key={product._id}
                              product={product}
                           ></ProductBox>
                        </div>
                     ))}
                  </div>
                  <div className="mt-[70px] text-center">
                     <div className="px-9 py-4 bg-primary text-white font-secondary inline-flex items-center justify-center">
                        View All
                     </div>
                  </div>
               </div>
               {/* promotion section */}
               <div className="bg-[#F1DEB4] py-20 mt-[150px]">
                  <div className="max-w-[1170px] mx-auto px-8 flex justify-between items-center gap-8">
                     <div className="flex-1">
                        <p className="text-[42px] font-semibold font-primary text-black">Special Promo</p>
                        <p className="text-[52px] font-bold my-2 font-primary ">WEEKENDS SALE</p>
                        <p className="text-[52px] font-semibold text-primary">UP TO 50% OFF</p>
                     </div>
                     <div className="flex-1">
                        <img
                           className="w-full object-contain"
                           src={promoBanner}
                           alt="Promo Banner"
                        />
                     </div>
                  </div>
               </div>
               {/* Customer Testimonials */}
               <div className="container mx-auto mt-[150px] px-8">
                  <p>Customer Testimonials</p>
                  <div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                        <TesttimonialBlock></TesttimonialBlock>
                        <TesttimonialBlock></TesttimonialBlock>
                        <TesttimonialBlock></TesttimonialBlock>
                     </div>
                  </div>
               </div>
               <div className="px-8 bg-primary py-[100px] mt-[150px]">
                  <div className="container mx-auto flex flex-col  gap-[30px] max-w-[570px]">
                     <p className="font-secondary text-[42px]/[52px] text-white font-bold">
                        Subscribe our newsletter to get latest product updates
                     </p>
                     <div className="flex gap-4">
                        <input
                           type="text"
                           name=""
                           id=""
                           placeholder="Enter your email"
                           className="px-5 py-4 rounded-xl border-white border-[1px] w-full outline-none"
                        />
                        <button className="px-9 py-4 bg-[#FFD44D] text-primary font-secondary text-[18px] rounded-xl font-medium">
                           Subcribe
                        </button>
                     </div>
                  </div>
               </div>
               <div className="bg-black text-white py-[100px] container px-8 flex gap-[88px]">
                  <div>
                     <p>Coach</p>
                     <p className="text-secondary text-[42px]/[52px] max-w-[370px]">
                        Ready to find your coach?
                     </p>
                     <button>Find My Coach</button>
                  </div>
                  <div className="grid grid-cols-3 gap-5">
                     <ul className="text-light font-secondary">
                        Credit Card
                        <li className="mt-[26px] mb-[18px] text-white">
                           Gift Cards
                        </li>
                        <li className="mb-[18px] text-white">
                           Gift Cards Balance
                        </li>
                        <li className="mb-[18px] text-white">
                           Shop with Points
                        </li>
                        <li className="mb-[18px] text-white">
                           Reload Your Balance
                        </li>
                     </ul>
                     <ul className="text-light font-secondary">
                        About Us
                        <li className="mt-[26px] mb-[18px] text-white">
                           Gift Cards
                        </li>
                        <li className="mb-[18px] text-white">
                           Gift Cards Balance
                        </li>
                        <li className="mb-[18px] text-white">
                           Shop with Points
                        </li>
                        <li className="mb-[18px] text-white">
                           Reload Your Balance
                        </li>
                     </ul>
                     <ul className="text-light font-secondary">
                        Credit Card
                        <li className="mt-[26px] mb-[18px] text-white">
                           Gift Cards
                        </li>
                        <li className="mb-[18px] text-white">
                           Gift Cards Balance
                        </li>
                        <li className="mb-[18px] text-white">
                           Shop with Points
                        </li>
                        <li className="mb-[18px] text-white">
                           Reload Your Balance
                        </li>
                     </ul>
                  </div>
               </div>
            </>
         )}
      </>
   );
};
