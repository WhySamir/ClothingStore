import { usePathname, useRouter } from "next/navigation";

interface OrderSummaryProps {
  totalItems: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  couponDiscount: number;
  total: number;
}

const OrderSummary = ({
  totalItems,
  subtotal,
  shipping,
  taxes,
  couponDiscount,
  total,
}: OrderSummaryProps) => {
  const router = useRouter();
  const pathname = usePathname();

  let buttonLabel = "Proceed";
  let buttonPath = "/";

  if (pathname === "/carts") {
    buttonLabel = "Proceed to Checkout";
    buttonPath = "/checkout";
  } else if (pathname === "/checkout") {
    buttonLabel = "Continue to Payment";
    buttonPath = "/payment";
  } else if (pathname === "/payment") {
    buttonLabel = "Confirm Payment";
    buttonPath = "/ordercompleted";
  }

  return (
    <div className="bg-white mx-1 border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Items</span>
          <span className="font-medium text-gray-900">{totalItems}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Sub Total</span>
          <span className="font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            ${shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Coupon Discount</span>
          <span className="font-medium text-gray-900">
            -${couponDiscount.toFixed(2)}
          </span>
        </div>

        <hr className="border-gray-200 my-4" />

        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => router.push(buttonPath)}
        className="w-full mt-6 bg-orange-950 hover:bg-amber-800 text-white py-3 text-base font-medium"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default OrderSummary;
