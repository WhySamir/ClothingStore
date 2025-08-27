import type { ReactNode } from "react";

interface ProductLayoutProps {
  children: ReactNode;
  addproducts: ReactNode;
  cards: ReactNode;
  allproduct: ReactNode;
}

export default function ProductLayout({
  children,
  addproducts,
  cards,
  allproduct,
}: ProductLayoutProps) {
  return (
    <>
      <div className="flex flex-col space-y-3 mx-4  ">
        {addproducts}

        <div className=" my-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cards}
        </div>
        <div className=" grid grid-cols-1  gap-4 lg:gap-6">{allproduct}</div>
        {children}
      </div>
    </>
  );
}
