import DashboardRevenueChart from "@/components/chart/DashboardRevenueChart";
import reportApi from "@/service/ReportService";
import React, { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";

export const DashboardPage = () => {
   const [revenueData, setRevenueData] = useState<
      { date: string; revenue: number }[]
   >([]);
   const [overviewData, setOverviewData] = useState<any>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const fakeData = {
               data: [
                  { date: "2025-10-01", revenue: 1000000 },
                  { date: "2025-10-02", revenue: 1500000 },
                  { date: "2025-10-03", revenue: 1200000 },
                  { date: "2025-10-04", revenue: 1800000 },
                  { date: "2025-10-05", revenue: 900000 },
                  { date: "2025-10-06", revenue: 2300000 },
                  { date: "2025-10-07", revenue: 1700000 },
               ],
            };
            setRevenueData(fakeData.data);

            const res = await reportApi.overview();
            setOverviewData(res.data.data);
            setLoading(false)
         } catch (error: any) {
            console.error("Lỗi khi load dữ liệu dashboard:", error);
            if (error.response) {
               console.error("📡 Server trả về lỗi:", error.response.data);
            } else if (error.request) {
               console.error(
                  "⏳ Không nhận được phản hồi từ server:",
                  error.request
               );
            } else {
               console.error("⚙️ Lỗi khi setup request:", error.message);
            }
         }
      };
      fetchData();
   }, []);

   if (loading) {
      return (
         <div className="flex justify-center items-center h-[80vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
         </div>
      );
   }

   return (
      <div className="p-4">
         <p className="text-2xl font-semibold mb-6">Dashboard</p>

         {/* 🔹 Các ô tổng quan */}
         <div className="flex gap-8 flex-wrap">
            {/* Card 1 */}
            <div className="flex-1 min-w-[200px] bg-white p-4 rounded-md shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-gray-500 text-sm">Total Users</p>
                     <p className="text-xl font-bold">
                        {overviewData?.totalUsers ?? 0}
                     </p>
                  </div>
                  <div className="p-3 bg-[#ABA9FF] rounded-md">
                     <TbUsers size={30} />
                  </div>
               </div>
               <p className="text-sm text-green-600 mt-2">8.5% up yesterday</p>
            </div>

            {/* Card 2 */}
            <div className="flex-1 min-w-[200px] bg-white p-4 rounded-md shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-gray-500 text-sm">Total Orders</p>
                     <p className="text-xl font-bold">
                        {overviewData?.totalOrders ?? 0}
                     </p>
                  </div>
                  <div className="p-3 bg-[#FFE59A] rounded-md">
                     <TbUsers size={30} />
                  </div>
               </div>
               <p className="text-sm text-green-600 mt-2">12% up last week</p>
            </div>

            {/* Card 3 */}
            <div className="flex-1 min-w-[200px] bg-white p-4 rounded-md shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-gray-500 text-sm">Total Revenue</p>
                     <p className="text-xl font-bold">
                        {overviewData?.totalRevenue?.toLocaleString("vi-VN") ??
                           0}
                        ₫
                     </p>
                  </div>
                  <div className="p-3 bg-[#9AFFB3] rounded-md">
                     <TbUsers size={30} />
                  </div>
               </div>
               <p className="text-sm text-green-600 mt-2">5.2% up this month</p>
            </div>

            {/* Card 4 */}
            <div className="flex-1 min-w-[200px] bg-white p-4 rounded-md shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-gray-500 text-sm">Active Discounts</p>
                     <p className="text-xl font-bold">
                        {overviewData?.activeDiscounts ?? 0}
                     </p>
                  </div>
                  <div className="p-3 bg-[#FFBABA] rounded-md">
                     <TbUsers size={30} />
                  </div>
               </div>
               <p className="text-sm text-red-600 mt-2">-2% down this week</p>
            </div>
         </div>

         {/* 🔹 Biểu đồ doanh thu */}
         <div className="mt-10 bg-white p-6 rounded-md shadow-md">
            <DashboardRevenueChart data={revenueData} />
         </div>
      </div>
   );
};
