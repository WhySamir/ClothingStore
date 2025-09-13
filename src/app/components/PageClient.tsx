"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductOrg } from "./productcard/productType";
import Modal from "./Modal";

const PageClient = () => {
  const { productId } = useParams<{ productId: string }>();

  const [products, setProducts] = useState<ProductOrg[]>([]);
  useEffect(() => {
    const productFech = async () => {
      const res = await fetch(`/api/products/${productId}`);
      const products = await res.json();
      setProducts(products.data);
    };
    productFech();
  }, [productId]);

  const selectedImg = Object.values(products).find((img: ProductOrg) => {
    return img.id === Number(productId);
  });
  if (!selectedImg) {
    return <div>Image not found</div>;
  }

  return (
    <>
      <Modal id={selectedImg.id}>
        <div className="relative w-120 h-fit mb-4">
          <p className="text-5xl ">
            <img src={selectedImg.mainImgUrl} alt="" />
          </p>
        </div>
      </Modal>
    </>
  );
};
export default PageClient;
