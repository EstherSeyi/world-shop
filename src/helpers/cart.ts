import Asset from "../types/asset";
import { State } from "../types/cart";

const addToCart = (state: State, asset: Asset) => {
  const assetIndex = state.cartItems.findIndex((item) => item.id === asset.id);
  if (assetIndex !== -1) {
    const selectedAsset = {
      ...state.cartItems[assetIndex],
      cart_quantity: state.cartItems[assetIndex].cart_quantity! + 1,
    };
    const newCart = [...state.cartItems];
    newCart.splice(assetIndex, 1, selectedAsset);
    return {
      cartItems: newCart,
      totalNoOfItems: state.totalNoOfItems++,
    };
  } else {
    return {
      cartItems: [...state.cartItems, { ...asset, cart_quantity: 1 }],
      totalNoOfItems: state.totalNoOfItems++,
    };
  }
};

export const cartInitialState: State = {
  cartItems: [],
  totalNoOfItems: 0,
};
export const cartReducer = (
  state: State,
  { type, payload }: { type: string; payload: Asset }
) => {
  switch (type) {
    case "ADD":
      return addToCart(state, payload);
    default:
      return state;
  }
};
