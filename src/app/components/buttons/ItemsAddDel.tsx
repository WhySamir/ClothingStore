import { Minus, Plus } from "lucide-react";

interface ItemsAddDelProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

export const ItemsAddDel = ({
  value,
  onChange,
  min = 1,
  max,
}: ItemsAddDelProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (max === undefined || value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`flex items-center max-w-[9rem]  border rounded-md `}>
      <button
        onClick={handleDecrement}
        className="md:p-2 hover:bg-gray-100 disabled:opacity-50"
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="px-2 md:px-4 py-2 min-w-[2.5rem] text-center">
        {value}
      </span>

      <button
        onClick={handleIncrement}
        className="md:p-2 hover:bg-gray-100 disabled:opacity-50"
        disabled={max !== undefined && value >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
