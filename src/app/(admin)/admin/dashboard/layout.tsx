import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  header: ReactNode;
  revenue: ReactNode;
  cogs: ReactNode;
  orders: ReactNode;
  customer: ReactNode;
  revenuegraph: ReactNode;
  spendingraph: ReactNode;
}

export default function DashboardLayout({
  children,
  header,
  revenue,
  cogs,
  orders,
  customer,
  revenuegraph,
  spendingraph,
}: DashboardLayoutProps) {
  return (
    <>
      <div className="flex flex-col space-y-3 mx-4  ">
        {header}

        <div className=" my-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {revenue}
          {cogs}
          {orders}
          {customer}
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2  gap-4 lg:gap-6">
          {revenuegraph}
          {spendingraph}
        </div>
        {children}
      </div>
    </>
  );
}
