"use client";

interface CategoryFilterProps {
  selectedCategories: string | null;
  onChange: (categories: string | null) => void;
}

const categories = ["Dresses", "T-Shirts", "Coats", "Oversized"];

export function CategoryFilter({
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onChange(category);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Category</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <input
              className="accent-orange-950 bg-orange-950"
              type="checkbox"
              id={category}
              checked={selectedCategories === category}
              onChange={(e) => handleCategoryChange(category, e.target.checked)}
            />
            <label
              htmlFor={category}
              className="text-sm font-normal cursor-pointer"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
