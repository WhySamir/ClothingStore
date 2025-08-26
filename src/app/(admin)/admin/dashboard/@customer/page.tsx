import StatCard from "@/app/(admin)/admin_components/Card";
import { Users } from "lucide-react";

function Page() {
  return (
    <>
      {" "}
      <StatCard
        title="Total Customer"
        value="$3200"
        details="+20.1% from last month"
        detailsClassName="text-green-500"
        icon={<Users className="w-5 h-5" />}
      />
    </>
  );
}

export default Page;
