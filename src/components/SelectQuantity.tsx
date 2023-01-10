import { useState } from "react";

import { useCart } from "../hooks/cart";

const SelectQuantity = ({ cartItem, handleDelete }: any) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const { dispatch } = useCart();
  const handleSelectQty = (event: any) => {
    if (Number(event.target.value) === 0) {
      return handleDelete(cartItem);
    }
    return dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        cartItem,
        cartQuantity: Number(event.target.value),
      },
    });
  };
  return (
    <div className="relative">
      <select
        className="mr-2 focus:outline-none cursor-pointer focus:scale-105"
        value={cartItem.quantity}
        onChange={handleSelectQty}
      >
        {new Array(11).fill(0, 0, 12).map((_, index) => {
          return (
            <option key={index} value={index}>
              {index === 0 ? "0 (Delete)" : index === 10 ? "10+" : index}
            </option>
          );
        })}
      </select>
      <span className="pl-2 pr-4 py-0.5 shadow text-sm rounded-md bg-[#f0f2f2] absolute left-[2px]">
        Qty: {cartItem.quantity}
      </span>
    </div>
  );
};

export default SelectQuantity;
