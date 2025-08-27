"use client";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";

const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
  { name: "Jul", revenue: 3490, profit: 4300 },
];

interface CustomTooltipPayload {
  dataKey?: string;
  name?: string;
  value?: number | string;
  color?: string;
  label?: string;
  // Add other properties you expect in your payload
}
interface CustomTooltipProps
  extends Omit<TooltipProps<ValueType, NameType>, "payload" | "label"> {
  payload?: CustomTooltipPayload[];
  label?: string | number;
}
const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded-lg border border-gray-700">
        <p className="font-semibold">{label}</p>
        {payload.map((item: CustomTooltipPayload, idx: number) => (
          <p key={idx}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div className="innercard cardborder p-6 shadow-lg w-full ">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-lg font-semibold">Revenue & Profit Trends</h2>
      </div>

      <div className="flex gap-6">
        {/* Chart */}
        <div className="w-full aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#323438" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#060606"
                fill="#101720"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                // fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
