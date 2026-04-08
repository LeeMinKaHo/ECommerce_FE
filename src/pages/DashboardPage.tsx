import DashboardRevenueChart from '@/components/chart/DashboardRevenueChart';
import reportApi from '@/service/ReportService';
import React, { useEffect, useState } from 'react';
import { TbUsers } from 'react-icons/tb';

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
            { date: '2025-10-01', revenue: 1000000 },
            { date: '2025-10-02', revenue: 1500000 },
            { date: '2025-10-03', revenue: 1200000 },
            { date: '2025-10-04', revenue: 1800000 },
            { date: '2025-10-05', revenue: 900000 },
            { date: '2025-10-06', revenue: 2300000 },
            { date: '2025-10-07', revenue: 1700000 },
          ],
        };
        setRevenueData(fakeData.data);

        const res = await reportApi.overview();
        setOverviewData(res.data.data);
        setLoading(false);
      } catch (error: any) {
        console.error('Lỗi khi load dữ liệu dashboard:', error);
        if (error.response) {
          console.error('📡 Server trả về lỗi:', error.response.data);
        } else if (error.request) {
          console.error(
            '⏳ Không nhận được phản hồi từ server:',
            error.request
          );
        } else {
          console.error('⚙️ Lỗi khi setup request:', error.message);
        }
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="mb-6 text-2xl font-semibold">Dashboard</p>

      {/* 🔹 Các ô tổng quan */}
      <div className="flex flex-wrap gap-8">
        {/* Card 1 */}
        <div className="min-w-[200px] flex-1 rounded-md bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-bold">
                {overviewData?.totalUsers ?? 0}
              </p>
            </div>
            <div className="rounded-md bg-[#ABA9FF] p-3">
              <TbUsers size={30} />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-600">8.5% up yesterday</p>
        </div>

        {/* Card 2 */}
        <div className="min-w-[200px] flex-1 rounded-md bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold">
                {overviewData?.totalOrders ?? 0}
              </p>
            </div>
            <div className="rounded-md bg-[#FFE59A] p-3">
              <TbUsers size={30} />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-600">12% up last week</p>
        </div>

        {/* Card 3 */}
        <div className="min-w-[200px] flex-1 rounded-md bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold">
                {overviewData?.totalRevenue?.toLocaleString('vi-VN') ?? 0}₫
              </p>
            </div>
            <div className="rounded-md bg-[#9AFFB3] p-3">
              <TbUsers size={30} />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-600">5.2% up this month</p>
        </div>

        {/* Card 4 */}
        <div className="min-w-[200px] flex-1 rounded-md bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Discounts</p>
              <p className="text-xl font-bold">
                {overviewData?.activeDiscounts ?? 0}
              </p>
            </div>
            <div className="rounded-md bg-[#FFBABA] p-3">
              <TbUsers size={30} />
            </div>
          </div>
          <p className="mt-2 text-sm text-red-600">-2% down this week</p>
        </div>
      </div>

      {/* 🔹 Biểu đồ doanh thu */}
      <div className="mt-10 rounded-md bg-white p-6 shadow-md">
        <DashboardRevenueChart data={revenueData} />
      </div>
    </div>
  );
};
