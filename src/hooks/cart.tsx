import { useReducer, createContext, Dispatch, useContext } from "react";

import Asset from "../types/asset";
import { State } from "../types/cart";

import { cartReducer, cartInitialState } from "../helpers/cart";

const CartContext = createContext<{
  state: State;
  dispatch: Dispatch<{
    type: string;
    payload: Asset;
  }>;
} | null>(null);

export const CartProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
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
