import Asset from "../types/asset";
import { State } from "../types/cart";

/**
 * addToCart - This function adds an asset to cart
 * @param state - cart state with `cartItems` and `totalNumberOfItems` properties
 * @param asset - selected asset to be added to cart
 * @returns - updated state including newly added asset
 */
const addToCart = (state: State, asset: Asset) => {
  // find index of selected asset
  const assetIndex = state.cartItems.findIndex((item) => item.id === asset.id);
  if (assetIndex !== -1) {
    //if asset exist we want to increase cart quantity.

    // create replacement object for selected asset with updated quantity
    const selectedAsset = {
      ...state.cartItems[assetIndex],
      cart_quantity: state.cartItems[assetIndex].cart_quantity! + 1,
    };

    // make copy of cart
    const newCart = [...state.cartItems];

    // replace selcted asset in cart
    newCart.splice(assetIndex, 1, selectedAsset);
    return {
      cartItems: newCart,
      totalNoOfItems: state.totalNoOfItems + 1,
    };
  } else {
    // if asset doesn't already exist, add to cart items,add cart_quantity property
    // and increase totalNoOfItems by 1
    return {
      cartItems: [...state.cartItems, { ...asset, cart_quantity: 1 }],
      totalNoOfItems: state.totalNoOfItems + 1,
    };
  }
};

/**
 * removeFromCart - This dunction deletes an item from cart completely
 * @param state - cart state with `cartItems` and `totalNumberOfItems` properties
 * @param asset - selected asset to be added to cart
 * @returns updated state after deleting selected cart item
 */
const removeFromCart = (state: State, asset: Asset) => {
  // find index of selected asset
  const assetIndex = state.cartItems.findIndex((item) => item.id === asset.id);
  if (assetIndex !== -1) {
    // decrease totalNoOfItems by total number of selected asset in the cart.
    const totalNoOfItems =
      state.totalNoOfItems - state.cartItems[assetIndex].cart_quantity!;

    // copy cart to not directly mutate state
    const newCart = [...state.cartItems];

    // remove selcted asset from cart
    newCart.splice(assetIndex, 1);
    return {
      cartItems: newCart,
      totalNoOfItems,
    };
  } else {
    return state;
  }
};

/**
 * updateQuantityInCart
 * @param state - cart state with `cartItems` and `totalNumberOfItems` properties
 * @param asset - selected asset whose quantity is to be updated
 * @param cartQuantity - amount to change current quantity to
 * @returns updated state after updating cart_quantity of selected cart item
 */
const updateQuantityInCart = (
  state: State,
  asset: Asset,
  cartQuantity: number
) => {
  const assetIndex = state.cartItems.findIndex((item) => item.id === asset.id);
  if (assetIndex !== -1) {
    // change cart quantity of selected asset to newly chosen quantity
    const selectedAsset = {
      ...state.cartItems[assetIndex],
      cart_quantity: cartQuantity,
    };

    // remove current cart quatity of selected asset in totalNoOfItems
    const totalNoOfItems =
      state.totalNoOfItems - state.cartItems[assetIndex].cart_quantity!;

    // make copy of cart
    const newCart = [...state.cartItems];

    // replace selected asset
    newCart.splice(assetIndex, 1, selectedAsset);
    return {
      cartItems: newCart,
      totalNoOfItems: totalNoOfItems + cartQuantity,
    };
  } else {
    return state;
  }
};

export const cartInitialState: State = {
  cartItems: [],
  totalNoOfItems: 0,
};
export const cartReducer = (
  state: State,
  {
    type,
    asset,
    cartQuantity,
  }: { type: string; asset?: Asset; cartQuantity?: number }
) => {
  switch (type) {
    case "ADD":
      return addToCart(state, asset!);
    case "REMOVE":
      return removeFromCart(state, asset!);
    case "UPDATE_QUANTITY":
      return updateQuantityInCart(state, asset!, cartQuantity!);
    default:
      return state;
  }
};
