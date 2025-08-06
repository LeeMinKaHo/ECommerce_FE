import { CenterScreenLoader } from "@/components/CenterScreenLoader";
import { invoiceApi } from "@/service/InvoiceInstance";
import React, { useEffect, useState } from "react";

export const OrderListPage = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [fillter, setFillter] = useState({
      page: 1,
      limit: 5,
   });
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            const res = await invoiceApi.getInvoice(fillter);
            setOrders(res.data.data);
         } catch (error) {
            console.error("Error fetching invoices:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);
   return (
      <div className="px-8 bg-[#f0f0f0] h-screen mt-2">
         <div className="grid grid-cols-4 gap-4 mt-2">
            {/* User block */}
            <div className="col-span-1 bg-white p-4">
               <div className="flex flex-col items-center">
                  <img
                     src="https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt=""
                     className="w-[100px] h-[100px] rounded-2xl object-cover "
                  />
                  <p>Lê Minh Khoa</p>
               </div>

               <hr className="my-2" />
               <div className="flex gap-1.5 items-center  mb-1">
                  <img
                     src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/account.svg"
                     alt=""
                  />
                  <p className="font-secondary text-[18px] text-black">
                     My Account
                  </p>
               </div>
               <div className="flex gap-1.5 items-center  mb-1">
                  <img
                     src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/orders.svg"
                     alt=""
                  />
                  <p className="font-secondary text-[18px] text-black">
                     My Orders
                  </p>
               </div>
               <div className="flex gap-1.5 items-center  mb-1">
                  <img
                     src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/notification.svg"
                     alt=""
                  />
                  <p className="font-secondary text-[18px] text-black">
                     Notifacation
                  </p>
               </div>
               <div className="flex gap-1.5 items-center  mb-1">
                  <img
                     src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/wishlist.svg"
                     alt=""
                  />
                  <p className="font-secondary text-[18px] text-black">
                     Wishlist
                  </p>
               </div>
            </div>
            {/* Order block */}
            <div className="col-span-3">
               <div className="bg-white pt-5 px-3 pb-2">
                  <h3 className="font-primary text-3xl text-black">
                     My Orders
                  </h3>
                  <div className="flex items-center justify-around mt-5">
                     <div className="flex flex-col items-center">
                        <p className="font-medium font-secondary text-black">
                           3
                        </p>
                        <p className="font-medium font-secondary text-black">
                           Tất cả
                        </p>
                     </div>
                     <div className="flex flex-col items-center">
                        <p className="font-medium font-secondary text-black">
                           3
                        </p>
                        <p className="font-medium font-secondary text-black">
                           Tất cả
                        </p>
                     </div>
                     <div className="flex flex-col items-center">
                        <p className="font-medium font-secondary text-black">
                           3
                        </p>
                        <p className="font-medium font-secondary text-black">
                           Tất cả
                        </p>
                     </div>
                     <div className="flex flex-col items-center">
                        <p className="font-medium font-secondary text-black">
                           3
                        </p>
                        <p className="font-medium font-secondary text-black">
                           Tất cả
                        </p>
                     </div>
                     <div className="flex flex-col items-center">
                        <p className="font-medium font-secondary text-black">
                           3
                        </p>
                        <p className="font-medium font-secondary text-black">
                           Tất cả
                        </p>
                     </div>
                  </div>
               </div>
               {loading ? (
                  <CenterScreenLoader></CenterScreenLoader>
               ) : (
                  orders.map((order) => {
                     return (
                        <div className="bg-white mt-2">
                           <div className="px-3 py-5">
                              <div className="flex items-center">
                                 <p className="text-[#2489f4] font-primary">
                                    {order._id}
                                 </p>
                                 <p
                                    className={`ml-4 px-5 p-1 rounded-2xl font-medium font-primary
    ${
       order.status === 2
          ? "bg-[#d3f3e1] text-[#23c16b]"
          : order.status === 1
          ? "bg-[#ffe3e3] text-[#f33a58]"
          : "bg-[#fff3cd] text-[#ff9900]"
    }`}
                                 >
                                    {order.status === 2
                                       ? "Hoàn tất"
                                       : order.status === 1
                                       ? "Đã hủy"
                                       : "Đang xử lý"}
                                 </p>
                                 <p className="ml-auto text-light font-primary">
                                    {order.updatedAt}
                                 </p>
                              </div>
                              <hr className="my-2" />
                              {order.items.map((item) => (
                                 <div>
                                    <div className="flex gap-2">
                                       <img
                                          src={item.productVariantId.imageUrl}
                                          alt=""
                                          className="max-h-[150px] mt-2"
                                       />
                                       <p>
                                          {item.productVariantId.productId.name}
                                       </p>
                                    </div>
                                 </div>
                              ))}

                              <hr />
                              <p className="my-2">Tổng tiền : {order.totalPrice}</p>
                              <div className=" flex gap-2">
                                 <p className="px-3 py-2 bg-white border-2 border-[#2489f4] text-[#2489f4] font-primary rounded-sm">
                                    Mua lại sản phẩm
                                 </p>
                                 <p className="bg-primary text-white  px-3 py-2 font-primary rounded-sm">
                                    Đánh giá sản phẩm
                                 </p>
                              </div>
                           </div>
                        </div>
                     );
                  })
               )}
            </div>
         </div>
      </div>
   );
};
