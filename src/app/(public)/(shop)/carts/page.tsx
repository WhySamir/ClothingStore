"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { ItemsAddDel } from "../../../components/buttons/ItemsAddDel";
import DisableScrollRestoration from "@/app/components/DisableScroll";
import { useSelector } from "react-redux";
import { useAuth } from "@/app/auth-context";
import Cart from "@/app/api/cart/cart";

export default function ShoppingCart() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state: any) => state.cartItems?.items || []);

  useEffect(() => {
    async function fetchCartItems() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        await Cart.fetchCart();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCartItems();
  }, [user]);

  const handleRemoveProduct = async (cartId: string) => {
    try {
      await Cart.deleteCartItem(cartId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuantityChange = async (cartId: string, newQty: number) => {
    try {
      await Cart.updateCartItem(cartId, newQty);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DisableScrollRestoration />
      {loading ? (
        <div className="p-6 text-center text-gray-600">
          Loading your cart...
        </div>
      ) : !user ? (
        <div className="p-6 text-center text-gray-600">
          Please login to view your cart.
        </div>
      ) : cartItems.length === 0 ? (
        <div className="p-6 text-center text-gray-600">
          No products in cart.
        </div>
      ) : (
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
              <h3 className="col-span-3 md:col-span-2 font-semibold text-gray-900 text-center">
                Subtotal
              </h3>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white">
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                className="grid grid-cols-12 md:gap-4 items-center py-6 px-2 md:px-6 border-b border-gray-100"
              >
                <div className="col-span-3 md:col-span-4 flex flex-col sm:flex-row items-center gap-4">
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

                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500 hidden sm:block">
                      Color: {item.color.color} | Size: {item.size.size}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  ${Number(item.product.sellingPrice).toFixed(2)}
                </div>

                <div className="col-span-4 flex justify-center">
                  <ItemsAddDel
                    id={item.id}
                    value={item.itemQty}
                    onChange={(id, qty) => handleQuantityChange(id, qty)}
                  />
                </div>

                <div className="col-span-3 md:col-span-2 text-center">
                  $
                  {(Number(item.product.sellingPrice) * item.itemQty).toFixed(
                    2,
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
