import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pidx } = await req.json();

  const res = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pidx }),
  });

  const data = await res.json();

  // Return lookup result to client
  return NextResponse.json({
    status: data.status,
    totalAmount: data.total_amount,
    purchase_order_name: data.purchase_order_name,
    purchase_order_id: data.purchase_order_id,
    transaction_id: data.transaction_id,
  });
}
