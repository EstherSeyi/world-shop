import { useReducer, createContext, Dispatch, useContext } from "react";

import { CartItemType, State } from "../types/cart";

import { cartReducer, cartInitialState } from "../helpers/cart";

const CartContext = createContext<{
  state: State;
  dispatch: Dispatch<{
    type: string;
    cartItem?: CartItemType;
    cartQuantity?: number;
  }>;
} | null>(null);

const cartStateinitializer = () => {
  if (typeof window !== "undefined") {
    const cartString = localStorage.getItem("cart");

    const cart = cartString && JSON.parse(cartString);
    return cart
      ? { cartItems: cart.items, totalNoOfItems: cart.totalNoOfItems }
      : cartInitialState;
  }

  return cartInitialState;
};

export const CartProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    cartInitialState,
    cartStateinitializer
  );
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
