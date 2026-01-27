"use client";
import { useSelector } from "react-redux";
import DisableScrollRestoration from "../../components/DisableScroll";
import OrderSummary from "../../components/OrderSummary";
import PageHeader from "../../components/PageHeader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/auth-context";
import Cart from "@/app/api/cart/cart";
import Payment from "@/app/api/payment/payment";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const cartItems = useSelector((state: any) => state.cartItems?.items || []);

  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.itemQty, 0);
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + Number(item.product.sellingPrice) * item.itemQty,
    0
  );
  const taxes = subtotal * 0.1; // example: 10% tax
  const couponDiscount = 0;
  const total = subtotal + taxes - couponDiscount;

  useEffect(() => {
    async function fetchCart() {
      if (!user) return;

      try {
        await Cart.fetchCart();
      } catch (err) {
        console.log("Cart fetch failed", err);
      }
    }

    fetchCart();
  }, [user]);

  useEffect(() => {
    // update amount
    Payment.setPaymentAmount(String(Math.round(total * 141.81)));

    // generate transactionId only on first load
    Payment.regeneratePaymentTransactionId();
  }, [total]);

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
