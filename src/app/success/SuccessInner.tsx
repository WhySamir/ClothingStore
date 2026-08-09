"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessInner() {
  const searchParams = useSearchParams();
  const pidx = searchParams.get("pidx");
  const router = useRouter();

  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    if (!pidx) {
      router.push("/");
      return;
    }

    async function verify() {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pidx }),
        });

        const data = await res.json();

        if (data.status !== "Completed") {
          setStatus("Payment failed. Redirecting to home...");
          setTimeout(() => {
            router.push("/");
          }, 1200);
          return;
        }

        const orderRes = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalAmount: data.totalAmount / 100,
            status: "SHIPPED",
            productName: data.purchase_order_name,
            transactionId: data.transaction_id,
          }),
        });

        const orderData = await orderRes.json();

        if (orderRes.ok) {
          setStatus("Payment Verified & Order Created");
          router.push(`/ordercompleted?id=${orderData.data.id}`);
        } else {
          setStatus("Payment verified, but order failed. Redirecting to home...");
          setTimeout(() => {
            router.push("/");
          }, 1200);
        }
      } catch (err) {
        setStatus("Payment verification error. Redirecting to home...");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    }

    verify();
  }, [pidx, router]);

  return <div className="p-10 text-center text-xl font-medium">{status}</div>;
}

