import Image from "next/image";

import { useCart } from "../hooks/cart";
import dummyData from "../assets/data.json";

import { CartItemType } from "../types/cart";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { dispatch } = useCart();
  const handleDelete = (cartItem: CartItemType) => {
    dispatch({
      type: "REMOVE",
      cartItem,
    });
  };

  const assetDetails = dummyData.data.benefitsList.find(
    (item) => item.id === cartItem.id
  );

  return (
    <li
      key={cartItem.id}
      className="flex items-start md:items-center mb-10 bg-[#f8f9fa] md:bg-white p-2 xs:p-3 md:p-0 md:pb-5 rounded md:rounded-none  md:border-b border-grey"
    >
      <input type="checkbox" className="mr-4 flex-shrink-0 hidden xs:block" />

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
              <select className="mr-2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <button
                className="text-bluish text-xs"
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
