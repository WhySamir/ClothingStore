"use client";

import { Suspense } from "react";
import OrderCompletedInner from "./OrderCompletedInner";

export default function OrderConfirmed() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center text-xl">Loading order...</div>}
    >
      <OrderCompletedInner />
    </Suspense>
  );
}
