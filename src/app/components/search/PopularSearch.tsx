import React from "react";

interface PopularSearchProps {
  terms: string[];
  onSearch: (term: string) => void;
}

export const PopularSearch: React.FC<PopularSearchProps> = ({
  terms,
  onSearch,
}) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 mb-3">Popular Search Terms</p>
      <div className="flex flex-wrap gap-3">
        {terms.map((term) => (
          <button
            key={term}
            onClick={() => onSearch(term)}
            className="bg-gray-200 text-sm px-4 py-2 rounded-full"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};
