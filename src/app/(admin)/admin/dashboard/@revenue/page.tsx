"use client";
import StatCard from "@/app/(admin)/admin_components/Card";
import { DollarSign } from "lucide-react";

function Page() {
  return (
    <>
      <StatCard
        title="Total Revenue"
        value="$3200"
        details="+20.1% from last month"
        detailsClassName="text-green-600"
        icon={<DollarSign className="w-5 h-5" />}
      />
    </>
  );
}

export default Page;
