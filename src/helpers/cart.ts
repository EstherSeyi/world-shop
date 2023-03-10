import { CartActionType, CartItemType } from "../types/cart";
import { State } from "../types/cart";
import { GiftcardType } from "../types/giftcards";
import { updateCartDetails, storeCartDetails } from "./localstorage";

/**
 * addToCart - This function adds an asset to cart
 * @param state - cart state with `cartItems` and `totalNumberOfItems` properties
 * @param asset - selected asset to be added to cart
 * @returns - updated state including newly added asset
 */
const addToCart = (state: State, cartItem: CartItemType) => {
  // find index of selected asset in cart
  const cartItemIndex = state.cartItems.findIndex(
    (item) => item.id === cartItem.id && item.amount === cartItem.amount
  );
  const totalNoOfItems = state.totalNoOfItems + cartItem.quantity;
  if (cartItemIndex !== -1) {
    //if asset exist we want to increase cart quantity.

    // create replacement object for selected asset with updated quantity
    const selectedAsset = {
      id: state.cartItems[cartItemIndex].id,
      quantity: state.cartItems[cartItemIndex].quantity! + cartItem.quantity,
      amount: cartItem.amount,
    };

    // make copy of cart
    const newCart = [...state.cartItems];

    // replace selcted asset in cart
    newCart.splice(cartItemIndex, 1, selectedAsset);

    //store data in local storage
    storeCartDetails(newCart, totalNoOfItems);

    return {
      cartItems: newCart,
      totalNoOfItems,
    };
  } else {
    //store data in localStorage
    storeCartDetails(
      [
        ...state.cartItems,
        {
          id: cartItem.id,
          quantity: cartItem.quantity,
          amount: cartItem.amount,
        },
      ],
      totalNoOfItems
    );

    // if cartItem doesn't already exist, add to cart items,add cart_quantity property
    // and increase totalNoOfItems by 1
    return {
      cartItems: [
        ...state.cartItems,
        {
          id: cartItem.id,
          quantity: cartItem.quantity,
          amount: cartItem.amount,
        },
      ],
      totalNoOfItems,
    };
  }
};

/**
 * removeFromCart - This dunction deletes an item from cart completely
 * @param state - cart state with `cartItems` and `totalNumberOfItems` properties
 * @param asset - selected asset to be added to cart
 * @returns updated state after deleting selected cart item
 */
const removeFromCart = (state: State, cartItem: CartItemType) => {
  // find index of selected asset
  const assetIndex = state.cartItems.findIndex(
    (item) => item.id === cartItem.id && item.amount === cartItem.amount
  );
  if (assetIndex !== -1) {
    // decrease totalNoOfItems by total number of selected asset in the cart.
    const totalNoOfItems = state.totalNoOfItems - cartItem.quantity!;

    // copy cart to not directly mutate state
    const newCart = [...state.cartItems];

    // remove selcted asset from cart
    newCart.splice(assetIndex, 1);

    //update cart data in localStorage
    updateCartDetails(newCart, totalNoOfItems);

    return {
      cartItems: newCart,
      totalNoOfItems,
    };
  } else {
    return state;
  }
};

/**
 * changeQuantityInCart
 * @param state - cart state with `cartItems` and `totalNumberOfItems` properties
 * @param asset - selected asset whose quantity is to be updated
 * @param cartQuantity - amount to change current quantity to
 * @returns updated state after updating cart_quantity of selected cart item
 */
const changeQuantityInCart = (
  state: State,
  cartItem: CartItemType,
  cartQuantity: number
) => {
  const assetIndex = state.cartItems.findIndex(
    (item) => item.id === cartItem.id && item.amount === cartItem.amount
  );
  if (assetIndex !== -1) {
    // change cart quantity of selected asset to newly chosen quantity
    const selectedAsset = {
      id: state.cartItems[assetIndex].id,
      quantity: cartQuantity,
      amount: cartItem.amount,
    };

    // remove current cart quatity of selected asset in totalNoOfItems
    const totalNoOfItems =
      state.totalNoOfItems - state.cartItems[assetIndex].quantity!;

    // make copy of cart
    const newCart = [...state.cartItems];

    // replace selected asset
    newCart.splice(assetIndex, 1, selectedAsset);

    //update cart data in localStorage
    updateCartDetails(newCart, totalNoOfItems + cartQuantity);
    return {
      cartItems: newCart,
      totalNoOfItems: totalNoOfItems + cartQuantity,
    };
  } else {
    return state;
  }
};

const resetCart = () => {
  updateCartDetails([], 0);
  return { cartItems: [], totalNoOfItems: 0 };
};

export const cartInitialState: State = {
  cartItems: [],
  totalNoOfItems: 0,
};
export const cartReducer = (
  state: State,
  { type, payload }: CartActionType
) => {
  const { cartItem, cartQuantity, cartItems, totalNoOfItems } = payload;
  switch (type) {
    case "ADD":
      return addToCart(state, cartItem!);
    case "REMOVE":
      return removeFromCart(state, cartItem!);
    case "CHANGE_QUANTITY":
      return changeQuantityInCart(state, cartItem!, cartQuantity!);
    case "INITIALIZE_CART":
      return {
        cartItems: cartItems ?? [],
        totalNoOfItems: totalNoOfItems ?? 0,
      };
    case "RESET_CART":
      return resetCart();
    default:
      return state;
  }
};

export const getCartItemsDetails = (
  cartItems: CartItemType[],
  giftcards: GiftcardType[]
) => {
  return cartItems.map((item) => {
    const detail = giftcards.find(
      (giftcard: GiftcardType) => item.id === giftcard.productId
    );
    return {
      ...detail,
      cartQuantity: item.quantity,
      amount: item.amount,
    } as GiftcardType;
  });
};
