"use client";

import { Range, getTrackBackground } from "react-range";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({
  priceRange,
  onChange,
}: PriceRangeFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Price</h3>
      <div className="space-y-4">
        <div className="flex w-[80%] flex-col justify-between text-sm text-muted-foreground">
          <Range
            step={20}
            min={0}
            max={2000}
            values={priceRange}
            onChange={(values) => onChange(values as [number, number])}
            renderTrack={({ props, children }) => (
              <div
                className="ml-1"
                {...props}
                style={{
                  ...props.style,
                  height: "4px",
                  width: "100%",
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ["#ccc", "#441306", "#ccc"],
                    min: 0,
                    max: 2000,
                  }),
                  borderRadius: "2px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "16px",
                  width: "16px",
                  backgroundColor: "#441306",
                  border: "2px solid #ffffff",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 4px #AAA",
                }}
              />
            )}
          />
          <div className="flex mt-2 justify-between">
            <span>${priceRange[0]} </span>
            <span>${priceRange[1]} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
