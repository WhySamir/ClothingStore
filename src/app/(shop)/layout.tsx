"use client";
import DisableScrollRestoration from "../components/DisableScroll";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import { usePathname } from "next/navigation";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const summaryData = {
    totalItems: 3,
    subtotal: 250,
    shipping: 0,
    taxes: 10,
    couponDiscount: 50,
    total: 210,
  };
  const pathname = usePathname();

  let buttonLabel = "Proceed";
  let buttonPath = "/";

  if (pathname === "/carts") {
    buttonLabel = "Shopping Cart";
    buttonPath = "carts";
  } else if (pathname === "/checkout") {
    buttonLabel = "Checkout";
    buttonPath = "checkout";
  } else if (pathname === "/payment") {
    buttonLabel = "Confirm Payment";
    buttonPath = "confirm-payment";
  }

  return (
    <>
      <DisableScrollRestoration />
      <PageHeader title={`${buttonLabel}`} path={`${buttonPath}`} />
      <div className="max-w-7xl mx-auto md:px-6 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">{children}</div>
          <div className="w-full md:w-80 md:flex-shrink-0">
            <OrderSummary {...summaryData} />
          </div>
        </div>
      </div>
    </>
  );
}
