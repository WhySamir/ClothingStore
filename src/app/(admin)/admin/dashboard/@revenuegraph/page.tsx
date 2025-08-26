"use client";
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
  { name: "Jul", revenue: 3490, profit: 4300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded-lg border border-gray-700">
        <p className="font-semibold">{label}</p>
        {payload.map((item: any) => (
          <p key={item.dataKey}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PieChartComponent() {
  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-lg w-full ">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-lg font-semibold">Revenue & Profit Trends</h2>
      </div>

      <div className="flex gap-6">
        {/* Chart */}
        <div className="w-full aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#060606"
                fill="#2b2556"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
