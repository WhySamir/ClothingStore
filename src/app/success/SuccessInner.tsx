"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessInner() {
  const searchParams = useSearchParams();
  const pidx = searchParams.get("pidx");
  const router = useRouter();

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!pidx) return;

    async function verify() {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pidx }),
        });

        const data = await res.json();

        if (data.status !== "Completed") {
          setStatus("Payment Failed");
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
          setStatus("Payment Verified but Order Failed");
        }
      } catch (err) {
        setStatus("Verification Error");
      }
    }

    verify();
  }, [pidx]);

  return <div className="p-10 text-center text-xl">{status}</div>;
}
