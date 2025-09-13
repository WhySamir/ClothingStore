"use client";

interface ColorFilterProps {
  selectedColors: string | null;
  onChange: (colors: string | null) => void;
}

const colors = [
  { name: "Black", value: "Black", color: "#000000" },
  { name: "Brown", value: "Brown", color: "#733121" },
  { name: "Green", value: "Green", color: "#008000" },
  { name: "Red", value: "Red", color: "#FF0000" },
  { name: "Orange", value: "Orange", color: "#FFA500" },
  { name: "Blue", value: "Blue", color: "#0000FF" },
  { name: "Dark Bluish", value: "Dark Bluish", color: "#FFC0CB" },
  // { name: "White", value: "white", color: "#FFFFFF" },
];

export function ColorFilter({ selectedColors, onChange }: ColorFilterProps) {
  const handleColorChange = (colorValue: string) => {
    if (selectedColors === colorValue) {
      onChange(null);
    } else {
      onChange(colorValue);
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
                selectedColors === color.value
                  ? "ring-2 ring-black ring-offset-2"
                  : "hover:scale-110"
              }`}
              aria-label={`Select ${color.name} color`}
            />
            <span
              className={`text-sm cursor-pointer transition-colors ${
                selectedColors === color.value
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
