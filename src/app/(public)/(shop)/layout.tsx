"use client";
import { useDispatch, useSelector } from "react-redux";
import DisableScrollRestoration from "../../components/DisableScroll";
import OrderSummary from "../../components/OrderSummary";
import PageHeader from "../../components/PageHeader";
import { usePathname } from "next/navigation";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import {
  regenerateTransactionId,
  setAmount,
} from "@/redux/Payment/PaymentSlice";
import { useAuth } from "@/app/auth-context";
import { setCart } from "@/redux/AddtoCart/CartSlice";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.itemQty, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.sellingPrice) * item.itemQty,
    0
  );
  const taxes = subtotal * 0.1; // example: 10% tax
  const couponDiscount = 0;
  const total = subtotal + taxes - couponDiscount;

  useEffect(() => {
    async function fetchCart() {
      if (!user) return;

      try {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        dispatch(setCart(data.data));
      } catch (err) {
        console.log("Cart fetch failed", err);
      }
    }

    fetchCart();
  }, [user, dispatch]);

  useEffect(() => {
    // update amount
    dispatch(setAmount(String(Math.round(total * 141.81))));

    // generate transactionId only on first load
    dispatch(regenerateTransactionId());
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
