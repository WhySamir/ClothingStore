import React from "react";

interface RecentSearchProps {
  terms: string[];
  onSearch: (term: string) => void;
  onClear: () => void;
}

export const RecentSearch: React.FC<RecentSearchProps> = ({
  terms,
  onSearch,
  onClear,
}) => {
  if (terms.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">Recent Searches</p>
        <button onClick={onClear} className="text-xl text-gray-600">
          X
        </button>
      </div>
      <div className="space-y-2">
        {terms.map((term, idx) => (
          <button
            key={idx}
            onClick={() => onSearch(term)}
            className="block text-left text-black text-base"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};
