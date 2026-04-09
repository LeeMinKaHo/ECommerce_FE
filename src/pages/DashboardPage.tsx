import DashboardRevenueChart from '@/components/chart/DashboardRevenueChart';
import reportApi from '@/service/ReportService';
import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, DollarSign, Tag, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STAT_CARDS = (data: any) => [
  {
    label: 'Total Users',
    value: data?.totalUsers ?? 0,
    icon: Users,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    trend: '+8.5%',
    trendUp: true,
    sub: 'vs yesterday',
  },
  {
    label: 'Total Orders',
    value: data?.totalOrders ?? 0,
    icon: ShoppingBag,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    trend: '+12%',
    trendUp: true,
    sub: 'vs last week',
  },
  {
    label: 'Total Revenue',
    value: `$${(data?.totalRevenue ?? 0).toLocaleString()}`,
    icon: DollarSign,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: '+5.2%',
    trendUp: true,
    sub: 'vs last month',
  },
  {
    label: 'Active Coupons',
    value: data?.activeDiscounts ?? 0,
    icon: Tag,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    trend: '-2%',
    trendUp: false,
    sub: 'vs last week',
  },
];

export const DashboardPage = () => {
  const [revenueData, setRevenueData] = useState<{ date: string; revenue: number }[]>([]);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await reportApi.overview();
        setOverviewData(res.data.data);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
        // placeholder chart data
        setRevenueData([
          { date: '01/04', revenue: 1000 },
          { date: '02/04', revenue: 1500 },
          { date: '03/04', revenue: 1200 },
          { date: '04/04', revenue: 1800 },
          { date: '05/04', revenue: 900 },
          { date: '06/04', revenue: 2300 },
          { date: '07/04', revenue: 1700 },
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <span className="text-sm text-gray-400 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {STAT_CARDS(overviewData).map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
                    <Icon size={22} className={card.iconColor} />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                      card.trendUp
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {card.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {card.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-400 mt-1">{card.label}</p>
                <p className="text-xs text-gray-300 mt-0.5">{card.sub}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Grid: Chart + Quick links */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Revenue (Last 7 Days)</h2>
          </div>
          <DashboardRevenueChart data={revenueData} />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              {[
                { label: 'View All Orders', to: '/admin/orders', color: 'text-amber-600 bg-amber-50' },
                { label: 'Manage Products', to: '/admin/products', color: 'text-violet-600 bg-violet-50' },
                { label: 'Add New Product', to: '/admin/products/create', color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Discount Codes', to: '/admin/discounts', color: 'text-rose-600 bg-rose-50' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 ${item.color}`}
                >
                  {item.label}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
