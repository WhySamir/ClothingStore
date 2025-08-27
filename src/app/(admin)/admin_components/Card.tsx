// components/StatCard.tsx
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  details: string;
  detailsClassName?: string;
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
  details,
  detailsClassName = "",
  icon,
}: StatCardProps) {
  return (
    <div className=" flex flex-col  w-full outercard cardborder">
      <div className="innercard shadow-md p-5  w-full">
        <div className="flex justify-between items-start space-y-6">
          <h3 className=" text-sm font-medium">{title}</h3>
          {icon && <div className=" ">{icon}</div>}
        </div>
        <div className="text-3xl font-semibold ">{value}</div>
      </div>
      <div className={`text-sm    px-5 py-4 ${detailsClassName}`}>
        {details}
      </div>
    </div>
  );
}
