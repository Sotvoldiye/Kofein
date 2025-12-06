import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: {},

  addToCart: (product) =>
    set((state) => ({
      cart: {
        ...state.cart,
        [product.id]: {
          ...product,
          count: (state.cart[product.id]?.count || 0) + 1
        }
      }
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        [id]: {
          ...state.cart[id],
          count: Math.max(0, (state.cart[id]?.count || 0) - 1)
        }
      }
    })),

  removeFrom: (id) =>
    set((state) => {
      const updatedCart = { ...state.cart };
      delete updatedCart[id]; 
      return { cart: updatedCart };
    }),

      clearCart: () => set({ cart: {} })  
}));
