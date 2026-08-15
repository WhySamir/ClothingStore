"use client";

import { useDispatch } from "react-redux";
import DisableScrollRestoration from "../../components/DisableScroll";
import OrderSummary from "../../components/OrderSummary";
import PageHeader from "../../components/PageHeader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/auth-context";
import { useGetCartQuery } from "@/redux/modules/cart/cart.api";
import {
  setPaymentAmount,
  regeneratePaymentTransactionId,
} from "@/redux/modules/payment/payment.slice";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  // RTK Query: fetch cart (only when logged in)
  const { data: cartItems = [] } = useGetCartQuery(undefined, {
    skip: !user,
  });

  const totalItems = cartItems.reduce(
    (sum: number, item: any) => sum + item.itemQty,
    0,
  );
  const subtotal = cartItems.reduce(
    (sum: number, item: any) =>
      sum + Number(item.product.sellingPrice) * item.itemQty,
    0,
  );
  const taxes = subtotal * 0.1; // example: 10% tax
  const couponDiscount = 0;
  const total = subtotal + taxes - couponDiscount;

  useEffect(() => {
    // update amount
    dispatch(setPaymentAmount(String(Math.round(total * 141.81))));

    // generate transactionId only on first load
    dispatch(regeneratePaymentTransactionId());
  }, [total, dispatch]);

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
            <OrderSummary
              totalItems={totalItems}
              subtotal={subtotal}
              taxes={taxes}
              couponDiscount={couponDiscount}
              total={total}
            />
          </div>
        </div>
      </div>
    </>
  );
}
