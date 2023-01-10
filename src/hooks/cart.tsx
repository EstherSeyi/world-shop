import {
  useReducer,
  createContext,
  Dispatch,
  useContext,
  useEffect,
} from "react";

import { CartActionType, State } from "../types/cart";

import { cartReducer, cartInitialState } from "../helpers/cart";

const CartContext = createContext<{
  state: State;
  dispatch: Dispatch<CartActionType>;
} | null>(null);

const cartStateinitializer = (dispatch: Dispatch<CartActionType>) => {
  const cartString = localStorage.getItem("cart");
  if (cartString) {
    const cart = cartString && JSON.parse(cartString);
    cart.hasOwnProperty("items") && cart.hasOwnProperty("totalNoOfItems")
      ? dispatch({
          type: "INITIALIZE_CART",
          payload: {
            cartItems: cart.items,
            totalNoOfItems: cart.totalNoOfItems,
          },
        })
      : null;
  }
};

export const CartProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  useEffect(() => {
    cartStateinitializer(dispatch);
  }, []);

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
