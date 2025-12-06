import React, { useContext, useEffect, useState } from "react";
import { useCartStore } from "../lib/store";

export default function QuantitySelector({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const cart = useCartStore((s) => s.cart);

  const count = cart[product.id]?.count || 0;

  return (
    <div className="flex items-center">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F3F4] border border-[#8FC792]"
        onClick={() => removeFromCart(product.id)}
      >
        <i className="fa-solid fa-minus text-[#8FC792] "></i>
      </button>

      <p className="w-6 text-center">{count}</p>

      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8FC792]"
        onClick={() => addToCart(product)}
      >
        <i className="fa-solid fa-plus text-[#f2f2f3]"></i>
      </button>
    </div>
  );
}
