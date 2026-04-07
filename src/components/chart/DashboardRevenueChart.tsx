// src/components/DashboardRevenueChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";

// ✅ đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
   data: { date: string; revenue: number }[];
}

const DashboardRevenueChart: React.FC<Props> = ({ data }) => {
   const chartData = {
      labels: data.map((d) => d.date),
      datasets: [
         {
            label: "Doanh thu (VNĐ)",
            data: data.map((d) => d.revenue),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
         },
      ],
   };

   const options = {
      responsive: true,
      plugins: {
         legend: { position: "top" as const },
         title: { display: true, text: "Doanh thu theo ngày" },
      },
   };

   return <Bar data={chartData} options={options} />;
};

export default DashboardRevenueChart;
