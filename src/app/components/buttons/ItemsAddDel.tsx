import { updateQty } from "@/redux/AddtoCart/CartSlice";
import { RootState } from "@/redux/store";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface ItemsAddDelProps {
  id: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

export const ItemsAddDel = ({
  id,
  value,
  onChange,
  min = 1,
  max,
}: ItemsAddDelProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = async (id: string, newQty: number) => {
    // Update Redux
    dispatch(updateQty({ id, itemQty: newQty }));

    // Optional: sync with backend
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: item.productId,
        colorId: item.colorId,
        sizeId: item.sizeId,
        itemQty: newQty,
      }),
    });
  };

  return (
    <div className={`flex items-center max-w-[9rem]  border rounded-md `}>
      <button
        onClick={() => handleQuantityChange(id, value - 1)}
        className="md:p-2 hover:bg-gray-100 disabled:opacity-50"
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="px-2 md:px-4 py-2 min-w-[2.5rem] text-center">
        {value}
      </span>

      <button
        onClick={() => handleQuantityChange(id, value + 1)}
        className="md:p-2 hover:bg-gray-100 disabled:opacity-50"
        disabled={max !== undefined && value >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
