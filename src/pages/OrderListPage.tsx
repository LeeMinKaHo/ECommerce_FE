import { CenterScreenLoader } from "@/components/CenterScreenLoader";
import { invoiceApi } from "@/service/InvoiceInstance";
import { Invoice } from "@/types/invoice";
import React, { useEffect, useState } from "react";

export const OrderListPage = () => {
   const [orders, setOrders] = useState<Invoice[]>([]);
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
            console.log(res);
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
      <div className="px-8 bg-[#f0f0f0] mt-2">
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
                  <CenterScreenLoader />
               ) : orders.length > 0 ? (
                  orders.map((order) => {
                     // Xử lý hiển thị trạng thái đơn hàng
                     const getStatusInfo = (status: number) => {
                        switch (status) {
                           case 2:
                              return {
                                 text: "Hoàn tất",
                                 className: "bg-[#d3f3e1] text-[#23c16b]",
                              };
                           case 1:
                              return {
                                 text: "Đã hủy",
                                 className: "bg-[#ffe3e3] text-[#f33a58]",
                              };
                           default:
                              return {
                                 text: "Đang xử lý",
                                 className: "bg-[#fff3cd] text-[#ff9900]",
                              };
                        }
                     };

                     const statusInfo = getStatusInfo(order.status);

                     return (
                        <div
                           key={order._id}
                           className="bg-white mt-2 rounded-md shadow-sm"
                        >
                           <div className="px-4 py-5">
                              {/* Header đơn hàng */}
                              <div className="flex items-center">
                                 <p className="text-[#2489f4] font-primary font-medium">
                                    #{order._id}
                                 </p>

                                 <span
                                    className={`ml-4 px-4 py-1 rounded-2xl text-sm font-medium font-primary ${statusInfo.className}`}
                                 >
                                    {statusInfo.text}
                                 </span>

                                 <p className="ml-auto text-gray-500 text-sm font-primary">
                                    {new Date(
                                       order.updatedAt
                                    ).toLocaleDateString("vi-VN")}
                                 </p>
                              </div>

                              <hr className="my-3" />

                              {/* Danh sách sản phẩm */}
                              <div className="space-y-2">
                                 {order.items.map((item) => (
                                    <div
                                       key={item._id}
                                       className="flex gap-3 items-start"
                                    >
                                       <img
                                          src={item.imageUrl || ''} 
                                          alt={
                                             item.name
                                          }
                                          className="w-[100px] h-[100px] object-cover rounded-md border"
                                       />
                                       <div className="flex-1">
                                          <p className="font-primary font-medium">
                                             {
                                                item.name
                                             }
                                          </p>
                                          <p className="text-gray-600 text-sm">
                                             Giá:{" "}
                                             {item.price.toLocaleString(
                                                "vi-VN"
                                             )}
                                             ₫
                                          </p>
                                          <p className="text-gray-600 text-sm">
                                             Số lượng: {item.quantity}
                                          </p>
                                       </div>
                                    </div>
                                 ))}
                              </div>

                              <hr className="my-3" />

                              {/* Tổng tiền + nút hành động */}
                              <div className="flex items-center justify-between">
                                 <p className="font-primary font-medium text-lg">
                                    Tổng tiền:{" "}
                                    <span className="text-primary font-semibold">
                                       {order.totalPrice.toLocaleString(
                                          "vi-VN"
                                       )}
                                       ₫
                                    </span>
                                 </p>

                                 <div className="flex gap-2">
                                    <button className="px-3 py-2 border-2 border-[#2489f4] text-[#2489f4] font-primary rounded-md hover:bg-[#eaf5ff] transition">
                                       Mua lại sản phẩm
                                    </button>
                                    <button className="px-3 py-2 bg-primary text-white font-primary rounded-md hover:bg-[#1e78d0] transition">
                                       Đánh giá sản phẩm
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <p className="text-center text-gray-500 font-primary mt-10">
                     Bạn chưa có đơn hàng nào.
                  </p>
               )}
            </div>
         </div>
      </div>
   );
};
