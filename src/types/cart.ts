export type CartItemType = { id: number; quantity: number };
export type State = {
  cartItems: [] | CartItemType[];
  totalNoOfItems: number;
};

export type CartActionType = {
  type: string;
  payload: {
    cartItem?: CartItemType;
    cartQuantity?: number;
    cartItems?: [] | CartItemType[];
    totalNoOfItems?: number;
  };
};
