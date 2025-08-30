"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { ItemsAddDel } from "../../../components/buttons/ItemsAddDel";
import DisableScrollRestoration from "@/app/components/DisableScroll";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setCart,
  updateQty,
} from "@/redux/AddtoCart/CartSlice";
import { RootState } from "@/redux/store";
import { Decimal } from "@prisma/client/runtime/library";

interface Product {
  id: string;
  name: string;
  price: Decimal;
  mainImgUrl: string;
}

interface Color {
  id: string;
  color: string;
  hexCode: string;
}

interface Sizes {
  id: string;
  size: string;
  stockQty: number;
}

interface CartItem {
  id: string; // unique cart item id
  productId: string;
  itemQty: number;
  colorId: string;
  sizeId: string;
  product: Product;
  color: Color;
  size: Sizes;
}

export default function ShoppingCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await fetch("/api/cart");

        if (!res.ok) throw new Error("Failed to fetch cart items");
        const items = await res.json();
        console.log(items.data);
        dispatch(setCart(items.data));
      } catch (err) {
        console.error(err);
      }
    }

    fetchCartItems();
  }, [dispatch]);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [products, setProducts] = useState<CartItem[]>(cartItems);

  const handleRemoveProduct = async (cartId: string) => {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ cartId }),
    });
    dispatch(removeFromCart({ id: cartId }));
  };

  const handleQuantityChange = async (cartId: string, newQty: number) => {
    try {
      // update backend
      await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ cartId, itemQty: newQty }),
      });

      dispatch(updateQty({ id: cartId, itemQty: newQty }));
    } catch (err) {
      console.error(err);
    }
  };
  const subtotal = products.reduce(
    (sum, product) => sum + Number(product.product.price) * product.itemQty,
    0
  );

  const shipping = 0;
  const taxes = 0;
  const couponDiscount = 100;
  const total = subtotal + shipping + taxes - couponDiscount;

  return (
    <>
      <DisableScrollRestoration />
      <div className="w-full overflow-hidden">
        {/* Table Header */}
        <div className="bg-amber-300 px-2 md:px-6 py-4">
          <div className="grid grid-cols-12 gap-1 md:gap-4 items-center">
            <h3 className="col-span-3 md:col-span-4 font-semibold text-gray-900">
              Product
            </h3>
            <h3 className="col-span-2 font-semibold text-gray-900 text-center">
              Price
            </h3>
            <h3 className="col-span-4 font-semibold text-gray-900 text-center">
              Quantity
            </h3>
            <h3 className="col-span-3  md:col-span-2 font-semibold text-gray-900 text-center">
              Subtotal
            </h3>
          </div>
        </div>

        {/* Product Rows */}
        <div className="bg-white">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12  md:gap-4 items-center py-6 px-2 md:px-6 border-b border-gray-100 bg-white"
            >
              {/* Product Info with Remove Button */}
              <div className="col-span-3 md:col-span-4  flex-col flex sm:flex-row items-center gap-4">
                <button
                  onClick={() => handleRemoveProduct(item.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>

                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.product.mainImgUrl || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className=" min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 text-base mb-1">
                    {item.product.name}
                  </h4>
                  <p className="text-gray-500 text-sm hidden sm:block">
                    Color : {item.color.color} | Size : {item.size.size}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center">
                <span className="text-base font-medium text-gray-900">
                  ${Number(item.product.price).toFixed(2)}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="col-span-4 text-center items-center flex justify-center">
                <ItemsAddDel
                  id={item.id}
                  value={item.itemQty}
                  onChange={(id: string, newValue: number) =>
                    handleQuantityChange(id, newValue)
                  }
                />
              </div>
              {/* Subtotal */}
              <div className="col-span-3  md:col-span-2  text-center">
                <span className="text-base font-medium text-gray-900">
                  ${(Number(item.product.price) * item.itemQty).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
