"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Shipping", value: 148.4, color: "#3B82F6" }, // blue
  { name: "Mortgage", value: 824.28, color: "#F97316" }, // orange
  { name: "Packaging", value: 614.16, color: "#A855F7" }, // purple
  { name: "Food", value: 642.48, color: "#22C55E" }, // green
  { name: "Groceries", value: 178.4, color: "#38373C" }, // green
];

export default function PieChartComponent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#1B1A1D]  rounded-lg border-2 border-[#323438] p-6 shadow-lg w-full ">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-lg font-semibold">Monthly spending</h2>
        <span className="px-3 py-1 rounded-full bg-[#2A2A2A] text-sm text-green-400">
          This month
        </span>
      </div>

      <div className="flex gap-6">
        {/* Chart */}
        <div className="w-1/2 aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="20%"
                outerRadius="80%"
                paddingAngle={4}
                stroke="#1E1E1E"
                cornerRadius={5}
                cx="50%" // make sure pie is centered
                cy="50%"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#ffffff" : "#1E1E1E"}
                    strokeWidth={activeIndex === index ? 4 : 2}
                    onClick={() => setActiveIndex(index)}
                    style={{ cursor: "pointer", outline: "none" }}
                  />
                ))}
              </Pie>

              {/* Center Circle */}
              <circle
                cx="50%"
                cy="50%"
                r="6%"
                fill="none"
                stroke="#323435"
                strokeWidth="2"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Details */}
        <div className="flex  text-gra items-center justify-center">
          <div className="grid grid-cols-2 gap-4">
            {data.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-gray-400 text-sm">{item.name}</p>
                </div>
                <p className=" font-semibold">${item.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
