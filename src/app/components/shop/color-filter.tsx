"use client";

interface ColorFilterProps {
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

const colors = [
  { name: "Black", value: "black", color: "bg-black" },
  { name: "Grey", value: "grey", color: "bg-gray-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Red", value: "red", color: "bg-red-500" },
  { name: "Orange", value: "orange", color: "bg-orange-500" },
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Pink", value: "pink", color: "bg-pink-500" },
  { name: "White", value: "white", color: "bg-white border border-gray-300" },
];

export function ColorFilter({ selectedColors, onChange }: ColorFilterProps) {
  const handleColorChange = (colorValue: string) => {
    if (selectedColors.includes(colorValue)) {
      onChange(selectedColors.filter((c) => c !== colorValue));
    } else {
      onChange([...selectedColors, colorValue]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Color</h3>
      <div className="space-y-3">
        {colors.map((color) => (
          <div key={color.value} className="flex items-center space-x-3">
            <button
              onClick={() => handleColorChange(color.value)}
              className={`w-4 h-4 rounded-full flex-shrink-0 transition-all ${
                color.color
              } ${
                selectedColors.includes(color.value)
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:scale-110"
              }`}
              aria-label={`Select ${color.name} color`}
            />
            <span
              className={`text-sm cursor-pointer transition-colors ${
                selectedColors.includes(color.value)
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
              onClick={() => handleColorChange(color.value)}
            >
              {color.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
