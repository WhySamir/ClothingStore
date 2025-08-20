"use client";

interface CategoryFilterProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

const categories = [
  "Men",
  "Women",
  "T-Shirts",
  "Handbags",
  "Jackets and Coats",
  "Watches",
  "Hat",
];

export function CategoryFilter({
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedCategories, category]);
    } else {
      onChange(selectedCategories.filter((c) => c !== category));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Category</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
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
