import StatCard from "@/app/(admin)/admin_components/Card";
import { ParkingMeter } from "lucide-react";

function Page() {
  return (
    <>
      <StatCard
        title="Total Cost of Goods Sold"
        value="$3200"
        details="+20.1% from last month"
        detailsClassName="text-green-600"
        icon={<ParkingMeter className="w-5 h-5" />}
      />
    </>
  );
}

export default Page;
