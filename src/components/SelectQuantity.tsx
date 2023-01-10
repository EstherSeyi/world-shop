import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import { useCart } from "../hooks/cart";

const SelectQuantity = ({ cartItem, handleDelete }: any) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [value, setValue] = useState(cartItem.quantity);
  const { dispatch } = useCart();
  const handleSelectQty = (value: string) => {
    if (Number(value) === 0) {
      return handleDelete(cartItem);
    }
    if (Number(value) === 10) {
      return setShowTextInput(true);
    }
    return dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        cartItem,
        cartQuantity: Number(value),
      },
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
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
      {showTextInput || cartItem.quantity >= 10 ? (
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
        <div className="relative block">
          <Select.Root
            value={cartItem.quantity}
            onValueChange={handleSelectQty}
          >
            <Select.Trigger
              className="flex items-center shadow text-sm rounded-md bg-[#f0f2f2] pl-2 pr-2.5 py-0.5"
              aria-label="Item Quantity"
            >
              <Select.Value>
                <span className="cursor-pointer">Qty: {cartItem.quantity}</span>
              </Select.Value>
              <Select.Icon className="w-4 flex items-center justify-center">
                <ChevronDownIcon width={15} />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white rounded-md shadow">
                <Select.ScrollUpButton className="SelectScrollButton">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-2 flex flex-col gap-2">
                  {new Array(11).fill(0, 0, 12).map((_, index) => {
                    return (
                      <Select.Item
                        className="text-xs cursor-pointer"
                        key={index}
                        value={index.toString()}
                      >
                        <Select.ItemText>
                          {index === 0
                            ? "0 (Delete)"
                            : index === 10
                            ? "10+"
                            : index}
                        </Select.ItemText>

                        <Select.ItemIndicator className="absolute left-0 w-6 inline-flex justify-center items-center">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      )}
    </>
  );
};

export default SelectQuantity;
