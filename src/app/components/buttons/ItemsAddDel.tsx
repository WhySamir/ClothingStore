import { updateQty } from "@/redux/AddtoCart/CartSlice";
import { RootState } from "@/redux/store";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface ItemsAddDelProps {
  id: string;
  value: number;
  onChange: (id: string, newValue: number) => void;
  min?: number;
  max?: number;
}

export const ItemsAddDel = ({
  id,
  value,
  onChange,
  min = 0,
  max,
}: ItemsAddDelProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={`flex items-center max-w-[9rem]  border rounded-md `}>
      <button
        onClick={() => onChange(id, value - 1)}
        className="md:p-2 hover:bg-gray-100 disabled:opacity-50"
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="px-2 md:px-4 py-2 min-w-[2.5rem] text-center">
        {value}
      </span>

      <button
        onClick={() => onChange(id, value + 1)}
        className="md:p-2 hover:bg-gray-100 disabled:opacity-50"
        disabled={max !== undefined && value >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
