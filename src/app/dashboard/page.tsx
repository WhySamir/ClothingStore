// app/dashboard/page.tsx
import ShowUserData from "@/app/components/ShowUserData";

export default function DashboardPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <ShowUserData />
    </div>
  );
}
