import Image from "next/image";
import { ChangeEvent, useMemo } from "react";

import { useCart } from "../hooks/cart";
import dummyData from "../assets/data.json";

import { CartItemType } from "../types/cart";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { dispatch } = useCart();
  const handleDelete = (cartItem: CartItemType) => {
    dispatch({
      type: "REMOVE",
      payload: {
        cartItem,
      },
    });
  };

  const assetDetails = useMemo(
    () => dummyData.data.benefitsList.find((item) => item.id === cartItem.id),
    [cartItem.id]
  );

  const handleSelectQty = (event: any) => {
    if (Number(event.target.value) === 0) {
      return handleDelete(cartItem);
    } else {
      return dispatch({
        type: "CHANGE_QUANTITY",
        payload: {
          cartItem,
          cartQuantity: Number(event.target.value),
        },
      });
    }
  };

  return (
    <li
      key={cartItem.id}
      className="flex items-start md:items-center mb-10 bg-[#f8f9fa] md:bg-white p-2 xs:p-3 md:p-0 md:pb-5 rounded md:rounded-none  md:border-b border-grey"
    >
      {/* <input type="checkbox" className="mr-4 flex-shrink-0 hidden xs:block" /> */}

      <div className="flex flex-col gap-4 xs:items-start xs:flex-row flex-grow">
        <div className="relative w-full xs:w-32 aspect-square flex-shrink-0">
          <Image
            src={assetDetails?.images[0] ?? ""}
            alt={assetDetails?.name ?? "asset"}
            className="object-cover "
            fill
          />
        </div>
        <div className="xs:flex-grow flex">
          <input type="checkbox" className="mr-4 flex-shrink-0  xs:hidden" />
          <div className="flex-grow">
            <p className="mb-0.5 md:text-lg font-medium text-sm">
              {assetDetails?.name}
            </p>
            <p className="md:hidden mb-0.5 font-bold text-lg">
              ${Number(assetDetails?.price) * cartItem.quantity!}
            </p>
            <p
              className={`text-xs ${
                assetDetails?.status === "active"
                  ? "text-successgreen"
                  : "text-red"
              } mb-0.5`}
            >
              {assetDetails?.status === "active" ? "In stock" : "Out of Stock"}
            </p>

            <p className="text-xs mb-0.5">
              sold by{" "}
              <span className="uppercase text-bluish">
                {assetDetails?.vendor}
              </span>
            </p>
            <p className="text-xs">Size: {assetDetails?.sizes[0]}</p>
            <div className="mt-1 xs:mt-3 md:mt-4">
              <div className="relative">
                <select
                  className="mr-2 focus:outline-none cursor-pointer focus:scale-105"
                  value={cartItem.quantity}
                  onChange={handleSelectQty}
                >
                  {new Array(11).fill(0, 0, 12).map((_, index) => {
                    return (
                      <option key={index} value={index}>
                        {index === 0
                          ? "0 (Delete)"
                          : index === 10
                          ? "10+"
                          : index}
                      </option>
                    );
                  })}
                </select>
                <span className="pl-2 pr-4 py-0.5 shadow text-sm rounded-md bg-[#f0f2f2] absolute left-[2px]">
                  Qty: {cartItem.quantity}
                </span>
              </div>
              <button
                className="text-bluish text-xs focus:outline-none focus:underline hover:underline transition-all"
                onClick={() => handleDelete(cartItem)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="self-start hidden md:block font-bold ml-auto">
        ${Number(assetDetails?.price) * cartItem.quantity!}
      </p>
    </li>
  );
};

export default CartItem;
