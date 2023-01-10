import { useMemo } from "react";

import { useCart } from "../hooks/cart";
import { CartItemType } from "../types/cart";

import dummyData from "../assets/data.json";

const calculateTotalCartValue = (cart: CartItemType[]) => {
  return cart?.reduce((acc: number, item: CartItemType) => {
    const currentItemDetails = dummyData.data.benefitsList.find(
      (asset) => asset.id === item.id
    );
    return acc + (currentItemDetails?.price ?? 0) * item.quantity!;
  }, 0);
};

const SubTotal = () => {
  const { state } = useCart();

  const totalCartValue = useMemo(
    () => calculateTotalCartValue(state.cartItems),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(state.cartItems)]
  );

  return (
    <aside className="md:order-1  md:bg-white md:px-2.5 md:py-4 mb-4 md:mb-0 border-b border-grey md:border-0 md:basis-3/12 md:self-start">
      <div>
        <p>
          Subtotal{" "}
          <span className="hidden md:inline">
            ({state.totalNoOfItems} item
            {`${state.totalNoOfItems > 1 ? "s" : ""}`})
          </span>
          : <span>${totalCartValue}</span>
        </p>
      </div>
      <button className="my-2 py-3 bg-yellow w-full rounded-md text-sm font-medium">
        Proceed to checkout{" "}
        <span className="inline md:hidden">
          ({state.totalNoOfItems} item
          {`${state.totalNoOfItems > 1 ? "s" : ""}`})
        </span>
      </button>
    </aside>
  );
};

export default SubTotal;
