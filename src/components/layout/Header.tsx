import { useRequireLogin } from "@/hooks/useRequireLogin";
import { closeDialog, setDialog } from "@/redux/slice/dialogSlice";
import { logout, setUser } from "@/redux/slice/userSlice";
import { RootState } from "@/redux/store";
import { DialogContent } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDialog from "../Dialogs/CartDialog";
import { SignInDialog } from "../Dialogs/SignInDialog";
import { SignUpDialog } from "../Dialogs/SignUpDialog";
import { VerifyDialog } from "../Dialogs/VerifyDialog";
import { ReviewForm } from "../form/Review";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../guard/useAuth";
import { Link } from "lucide-react";
import productApi from "@/service/ProductService";
import { Product } from "@/types/product";

export type DialogType =
   | "signIn"
   | "signUp"
   | "verify"
   | "resetPassword"
   | "cart"
   | null;

export const Header = () => {
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [suggestions, setSuggestions] = useState<Product[]>([]);
   const [searchText, setSearchText] = useState("");
   const [debouncedText, setDebouncedText] = useState("");
   const dispatch = useDispatch();
   const { checkLogin } = useAuth();
   const activeDialog = useSelector(
      (state: RootState) => state.dialog.activeDialog
   );
   const navigate = useNavigate();
   const user = useSelector((state: RootState) => state.user);
   const cart = useSelector((state: RootState) => state.cart.cartQuantity);
   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedText(searchText); // gán sau khi user dừng gõ 500ms
      }, 500);

      return () => clearTimeout(handler); // huỷ timeout cũ nếu còn đang gõ
   }, [searchText]);
   useEffect(() => {
      const fetchData = async () => {
         if (debouncedText.trim() !== "") {
            console.log("👉 Call API với:", debouncedText);
            try {
               const res = await productApi.getAll({
                  name: debouncedText,
                  page: 1,
                  limit: 3,
               });
               // console.log("✅ Kết quả:", res);
               setSuggestions(res.data.data); // nếu có suggestions
            } catch (error) {
               console.error("❌ Lỗi khi gọi API:", error);
            }
         }
      };

      fetchData(); // Gọi hàm async
   }, [debouncedText]);

   return (
      <div className=" bg-primary">
         <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-8">
            <b className="font-primary  text-2xl font-bold text-white">
               Pursuit
            </b>
            <div className="flex md:order-3  items-center gap-5 ml-auto md:ml-0">
               {/* User Icon */}
               {user?.name ? (
                  <div className="relative group cursor-pointer text-white">
                     {/* Khối User */}
                     <div className="flex flex-col items-center">
                        {user ? (
                           user.avatar ? (
                              <img src={user.avatar} alt="avatar" />
                           ) : (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M16.364 8.72692C16.364 9.88423 15.9043 10.9941 15.0859 11.8125C14.2676 12.6308 13.1577 13.0906 12.0004 13.0906C10.843 13.0906 9.73314 12.6308 8.9148 11.8125C8.09646 10.9941 7.63672 9.88423 7.63672 8.72692C7.63672 7.56961 8.09646 6.4597 8.9148 5.64136C9.73314 4.82302 10.843 4.36328 12.0004 4.36328C13.1577 4.36328 14.2676 4.82302 15.0859 5.64136C15.9043 6.4597 16.364 7.56961 16.364 8.72692ZM14.1822 8.72692C14.1822 9.30557 13.9523 9.86053 13.5431 10.2697C13.134 10.6789 12.579 10.9087 12.0004 10.9087C11.4217 10.9087 10.8667 10.6789 10.4576 10.2697C10.0484 9.86053 9.81854 9.30557 9.81854 8.72692C9.81854 8.14826 10.0484 7.59331 10.4576 7.18414C10.8667 6.77497 11.4217 6.5451 12.0004 6.5451C12.579 6.5451 13.134 6.77497 13.5431 7.18414C13.9523 7.59331 14.1822 8.14826 14.1822 8.72692Z"
                                    fill="white"
                                 />
                                 <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 0C5.37273 0 0 5.37273 0 12C0 18.6273 5.37273 24 12 24C18.6273 24 24 18.6273 24 12C24 5.37273 18.6273 0 12 0ZM2.18182 12C2.18182 14.28 2.95964 16.3789 4.26327 18.0458C5.1788 16.8435 6.35989 15.8692 7.71429 15.1989C9.06869 14.5286 10.5597 14.1805 12.0709 14.1818C13.5625 14.1804 15.0348 14.5195 16.3756 15.1732C17.7163 15.827 18.8901 16.7781 19.8076 17.9542C20.7529 16.7145 21.3893 15.2675 21.6642 13.733C21.9392 12.1985 21.8448 10.6206 21.3889 9.1298C20.933 7.63902 20.1286 6.27823 19.0423 5.16004C17.9561 4.04185 16.6192 3.19839 15.1422 2.69946C13.6653 2.20054 12.0908 2.06048 10.5489 2.29088C9.00711 2.52128 7.54232 3.11552 6.27575 4.02442C5.00918 4.93333 3.97725 6.13077 3.26534 7.51767C2.55343 8.90457 2.18202 10.4411 2.18182 12ZM12 21.8182C9.74613 21.8216 7.56029 21.0462 5.81236 19.6233C6.51592 18.6161 7.45237 17.7937 8.54203 17.2262C9.63169 16.6587 10.8423 16.3628 12.0709 16.3636C13.2842 16.3627 14.4802 16.6512 15.5596 17.2052C16.6389 17.7592 17.5706 18.5628 18.2771 19.5491C16.5156 21.0182 14.2937 21.8214 12 21.8182Z"
                                    fill="white"
                                 />
                              </svg>
                           )
                        ) : (
                           "Login"
                        )}
                     </div>

                     {/* Dropdown Box */}
                     <div className="absolute top-full pt-2 right-0 bg-white text-black shadow-md rounded-lg p-3 min-w-[150px] hidden group-hover:block z-50">
                        <button className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded">
                           Trang cá nhân
                        </button>
                        <button
                           className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
                           onClick={() => {
                              localStorage.removeItem("accessToken");
                              dispatch(logout()); // gọi action từ userSlice
                              navigate("/");
                           }}
                        >
                           logout
                        </button>
                     </div>
                  </div>
               ) : (
                  <Dialog
                     open={activeDialog === "signIn"}
                     onOpenChange={(open) =>
                        dispatch(setDialog(open ? "signIn" : null))
                     }
                  >
                     <DialogTrigger asChild>
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                     >
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M16.364 8.72692C16.364 9.88423 15.9043 10.9941 15.0859 11.8125C14.2676 12.6308 13.1577 13.0906 12.0004 13.0906C10.843 13.0906 9.73314 12.6308 8.9148 11.8125C8.09646 10.9941 7.63672 9.88423 7.63672 8.72692C7.63672 7.56961 8.09646 6.4597 8.9148 5.64136C9.73314 4.82302 10.843 4.36328 12.0004 4.36328C13.1577 4.36328 14.2676 4.82302 15.0859 5.64136C15.9043 6.4597 16.364 7.56961 16.364 8.72692ZM14.1822 8.72692C14.1822 9.30557 13.9523 9.86053 13.5431 10.2697C13.134 10.6789 12.579 10.9087 12.0004 10.9087C11.4217 10.9087 10.8667 10.6789 10.4576 10.2697C10.0484 9.86053 9.81854 9.30557 9.81854 8.72692C9.81854 8.14826 10.0484 7.59331 10.4576 7.18414C10.8667 6.77497 11.4217 6.5451 12.0004 6.5451C12.579 6.5451 13.134 6.77497 13.5431 7.18414C13.9523 7.59331 14.1822 8.14826 14.1822 8.72692Z"
                           fill="white"
                        />
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M12 0C5.37273 0 0 5.37273 0 12C0 18.6273 5.37273 24 12 24C18.6273 24 24 18.6273 24 12C24 5.37273 18.6273 0 12 0ZM2.18182 12C2.18182 14.28 2.95964 16.3789 4.26327 18.0458C5.1788 16.8435 6.35989 15.8692 7.71429 15.1989C9.06869 14.5286 10.5597 14.1805 12.0709 14.1818C13.5625 14.1804 15.0348 14.5195 16.3756 15.1732C17.7163 15.827 18.8901 16.7781 19.8076 17.9542C20.7529 16.7145 21.3893 15.2675 21.6642 13.733C21.9392 12.1985 21.8448 10.6206 21.3889 9.1298C20.933 7.63902 20.1286 6.27823 19.0423 5.16004C17.9561 4.04185 16.6192 3.19839 15.1422 2.69946C13.6653 2.20054 12.0908 2.06048 10.5489 2.29088C9.00711 2.52128 7.54232 3.11552 6.27575 4.02442C5.00918 4.93333 3.97725 6.13077 3.26534 7.51767C2.55343 8.90457 2.18202 10.4411 2.18182 12ZM12 21.8182C9.74613 21.8216 7.56029 21.0462 5.81236 19.6233C6.51592 18.6161 7.45237 17.7937 8.54203 17.2262C9.63169 16.6587 10.8423 16.3628 12.0709 16.3636C13.2842 16.3627 14.4802 16.6512 15.5596 17.2052C16.6389 17.7592 17.5706 18.5628 18.2771 19.5491C16.5156 21.0182 14.2937 21.8214 12 21.8182Z"
                           fill="white"
                        />
                     </svg> */}
                        <p className="font-semibold text-2xl text-white">
                           Login
                        </p>
                     </DialogTrigger>
                     {/* Chỉ render khi cần thiết */}
                     {activeDialog === "signIn" && (
                        <SignInDialog
                           onSignInSuccess={() => dispatch(closeDialog())}
                           onSwitchToSignUp={() =>
                              dispatch(setDialog("signUp"))
                           }
                        />
                     )}
                  </Dialog>
               )}

               {activeDialog === "signUp" && (
                  <Dialog
                     open
                     onOpenChange={(open) =>
                        dispatch(setDialog(open ? "signUp" : null))
                     }
                  >
                     <SignUpDialog
                        switchToVerify={() => dispatch(setDialog("verify"))}
                     />
                  </Dialog>
               )}

               {activeDialog === "verify" && (
                  <Dialog
                     open
                     onOpenChange={(open) =>
                        dispatch(setDialog(open ? "verify" : null))
                     }
                  >
                     <VerifyDialog />
                  </Dialog>
               )}

               {/* Wishlist Icon */}
               <div className="relative ">
                  <FaRegHeart className="text-white text-2xl"></FaRegHeart>

                  {cart >= 0 && (
                     <span className="absolute top-[-7px] right-[-5px] flex justify-center items-center w-4 h-4 bg-white text-primary text-xs font-bold rounded-full">
                        {cart}
                     </span>
                  )}
               </div>

               {/* cart icon */}
               <div
                  className="relative"
                  onClick={() => {
                     if (checkLogin()) {
                        dispatch(setDialog("cart"));
                     } else {
                        dispatch(setDialog("signIn"));
                     }
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="22"
                     height="24"
                     viewBox="0 0 22 24"
                     fill="none"
                  >
                     <path
                        d="M1.91641 9.10286C1.96195 8.53006 2.21956 7.9956 2.63793 7.6059C3.0563 7.21621 3.60473 6.99988 4.174 7H17.826C18.3953 6.99988 18.9437 7.21621 19.3621 7.6059C19.7804 7.9956 20.038 8.53006 20.0836 9.10286L20.9927 20.5314C21.0177 20.8459 20.978 21.1623 20.8759 21.4605C20.7739 21.7587 20.6118 22.0324 20.3998 22.2643C20.1879 22.4962 19.9306 22.6813 19.6443 22.8079C19.358 22.9345 19.0489 22.9999 18.7363 23H3.26372C2.95115 22.9999 2.64198 22.9345 2.35568 22.8079C2.06938 22.6813 1.81215 22.4962 1.60018 22.2643C1.38822 22.0324 1.22611 21.7587 1.12407 21.4605C1.02202 21.1623 0.982252 20.8459 1.00726 20.5314L1.91641 9.10286V9.10286Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M15 10V5C15 3.93913 14.5786 2.92172 13.8284 2.17157C13.0783 1.42143 12.0609 1 11 1C9.93913 1 8.92172 1.42143 8.17157 2.17157C7.42143 2.92172 7 3.93913 7 5V10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>

                  {/* Hiển thị số lượng trên cart icon */}
                  {cart >= 0 && (
                     <span className="absolute top-[-7px] right-[-5px] flex justify-center items-center w-4 h-4 bg-white text-primary text-xs font-bold rounded-full">
                        {cart}
                     </span>
                  )}
               </div>

               {activeDialog == "review" && (
                  <Dialog>
                     <DialogContent>
                        <ReviewForm></ReviewForm>
                     </DialogContent>
                  </Dialog>
               )}
            </div>

            {/* Search Box */}
            <div className="flex  justify-between md:justify-center basis-full md:basis-2xl md:order-2 items-center mt-5 md:mt-0">
               {/* Menu */}
               <div className="flex md:hidden gap-1 items-center ">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                  >
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.94849 6H20.0515C20.5735 6 21.0005 6.427 21.0005 6.949V7.051C21.0005 7.573 20.5735 8 20.0515 8H3.94849C3.42649 8 3.00049 7.573 3.00049 7.051V6.949C3.00049 6.427 3.42649 6 3.94849 6ZM20.0515 11H3.94849C3.42649 11 3.00049 11.427 3.00049 11.949V12.051C3.00049 12.573 3.42649 13 3.94849 13H20.0515C20.5735 13 21.0005 12.573 21.0005 12.051V11.949C21.0005 11.427 20.5735 11 20.0515 11ZM20.0515 16H3.94849C3.42649 16 3.00049 16.427 3.00049 16.949V17.051C3.00049 17.573 3.42649 18 3.94849 18H20.0515C20.5735 18 21.0005 17.573 21.0005 17.051V16.949C21.0005 16.427 20.5735 16 20.0515 16Z"
                        fill="#C4D1D0"
                     />
                  </svg>
                  <p className="font-secondary text-white text-[14px]/[20px]">
                     Menu
                  </p>
               </div>
               {/* Search block */}
               <div className="flex items-center w-[60%] relative">
                  <input
                     type="text"
                     placeholder="Search for everything"
                     onFocus={() => setShowSuggestions(true)}
                     onChange={(e) => setSearchText(e.target.value)}
                     value={searchText}
                     className="h-10 md:h-11 w-full border border-white placeholder:text-white placeholder:text-sm placeholder:font-secondary px-4"
                  />
                  <NavLink to={`/products?name=${searchText}`}>
                     <svg
                        className="h-10 md:h-11"
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                     >
                        <rect width="44" height="44" fill="#FFD44D" />
                        <path
                           d="M31 31L26.7501 26.7425M29.1053 21.0526C29.1053 23.1883 28.2569 25.2365 26.7467 26.7467C25.2365 28.2569 23.1883 29.1053 21.0526 29.1053C18.9169 29.1053 16.8687 28.2569 15.3586 26.7467C13.8484 25.2365 13 23.1883 13 21.0526C13 18.9169 13.8484 16.8687 15.3586 15.3586C16.8687 13.8484 18.9169 13 21.0526 13C23.1883 13 25.2365 13.8484 26.7467 15.3586C28.2569 16.8687 29.1053 18.9169 29.1053 21.0526V21.0526Z"
                           stroke="#005D63"
                           strokeWidth="2"
                           strokeLinecap="round"
                        />
                     </svg>
                  </NavLink>

                  {/* Suggestion Box */}
                  {suggestions && searchText && (
                     <div className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-60 overflow-y-auto z-50 rounded shadow mt-1">
                        <p className="px-4 py-2 text-gray-500 text-sm">
                           Gợi ý tìm kiếm
                        </p>
                        {suggestions.map((item, index) => (
                           <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                              onClick={() => {
                                 setSearchText(item.name);
                                 navigate(`/products/${item._id}`);
                                 setSuggestions([]);
                                 setSearchText("");
                              }}
                           >
                              {item.name}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>

            {/* Icons Section */}
         </div>
      </div>
   );
};
