import { useState } from "react";

import { useCart } from "../hooks/cart";

const SelectQuantity = ({ cartItem, handleDelete }: any) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [value, setValue] = useState(cartItem.quantity);
  const { dispatch } = useCart();
  const handleSelectQty = (event: any) => {
    if (Number(event.target.value) === 0) {
      return handleDelete(cartItem);
    }
    if (Number(event.target.value) === 10) {
      return setShowTextInput(true);
    }
    return dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        cartItem,
        cartQuantity: Number(event.target.value),
      },
    });
  };

  const handleSubmit = () => {
    setShowTextInput(false);
    if (Number(value) === 0) return handleDelete(cartItem);
    return dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        cartItem,
        cartQuantity: Number(value),
      },
    });
  };
  return (
    <>
      {showTextInput ? (
        <form onSubmit={handleSubmit}>
          <input
            name="quantity"
            type="number"
            className="border border-grey rounded w-16 mr-2 text-sm"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-xs bg-yellow px-1 py-0.5 rounded-md shadow-sm"
          >
            Update
          </button>
        </form>
      ) : (
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
          <span className="pl-2 pr-2.5 py-0.5 shadow text-sm rounded-md bg-[#f0f2f2] absolute left-[2px]">
            Qty: {cartItem.quantity}
          </span>
        </div>
      )}
    </>
  );
};

export default SelectQuantity;
