"use client";

interface ColorFilterProps {
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

const colors = [
  { name: "Black", value: "black", color: "#000000" },
  { name: "Grey", value: "grey", color: "#808080" },
  { name: "Green", value: "green", color: "#008000" },
  { name: "Red", value: "red", color: "#FF0000" },
  { name: "Orange", value: "orange", color: "#FFA500" },
  { name: "Blue", value: "blue", color: "#0000FF" },
  { name: "Pink", value: "pink", color: "#FFC0CB" },
  { name: "White", value: "white", color: "#FFFFFF" },
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
              style={{
                backgroundColor: color.color,
              }}
              className={`w-4 h-4 rounded-full flex-shrink-0 transition-all ${
                selectedColors.includes(color.value)
                  ? "ring-2 ring-black ring-offset-2"
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
