export type CartItemType = { id: number; quantity: number };
export type State = {
  cartItems: [] | CartItemType[];
  totalNoOfItems: number;
};
