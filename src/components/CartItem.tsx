import Image from "next/image";
import Link from "next/link";

import { useCart } from "../hooks/cart";
import { useProductDetail } from "../hooks/product";
import { i18nCurrencyFormat } from "../helpers/format";

import { CartItemType } from "../types/cart";
import SelectQuantity from "./SelectQuantity";
import { GiftcardType } from "../types/giftcards";

const CartItem = ({ giftcard }: { giftcard: GiftcardType }) => {
  const { dispatch } = useCart();
  const { setProduct } = useProductDetail();
  const handleDelete = (cartItem: CartItemType) => {
    dispatch({
      type: "REMOVE",
      payload: {
        cartItem,
      },
    });
  };

  const handleClick = () => {
    setProduct(giftcard);
    localStorage.setItem("currentProduct", JSON.stringify(giftcard));
  };

  return (
    <li className="flex items-start md:items-center mb-10 bg-[#f8f9fa] md:bg-white p-2 xs:p-3 md:p-0 md:pb-5 rounded md:rounded-none  md:border-b border-grey">
      <div className="flex flex-col gap-4 xs:items-start xs:flex-row flex-grow">
        <div className="relative w-full xs:w-32 aspect-square flex-shrink-0">
          <Image
            src={giftcard?.img ?? ""}
            alt={giftcard?.name ?? "asset"}
            className="object-cover "
            fill
          />
        </div>
        <div className="xs:flex-grow flex px-4 xs:px-4">
          <div className="flex-grow">
            <Link
              className=" md:text-lg font-medium text-sm hover:underline transition-all"
              href={`/products/${giftcard.productId}`}
              onClick={handleClick}
            >
              {giftcard?.name}
            </Link>
            <p className="mb-0.5  text-sm opacity-70">
              {giftcard?.amount} {giftcard?.recipientCurrencyCode}
            </p>
            <p className="md:hidden mb-0.5 font-bold text-lg">
              {i18nCurrencyFormat(
                giftcard.recipientCurrencyCode ?? "USD"
              ).format(giftcard?.amount! * giftcard?.cartQuantity!)}
            </p>
            <p
              className={`text-xs ${
                giftcard?.available ? "text-successgreen" : "text-red"
              } mb-0.5`}
            >
              {giftcard?.available ? "In stock" : "Out of Stock"}
            </p>

            <p className="text-xs mb-0.5">
              sold by{" "}
              <span className="uppercase text-bluish">
                {giftcard.brand.brandName}
              </span>
            </p>
            <div className="mt-1 xs:mt-3 md:mt-4">
              <SelectQuantity
                cartItem={{
                  id: giftcard.productId,
                  quantity: giftcard.cartQuantity,
                  amount: giftcard.amount as number,
                }}
                handleDelete={handleDelete}
              />
              <button
                className="text-bluish text-xs focus:outline-none focus:underline hover:underline transition-all"
                onClick={() =>
                  handleDelete({
                    id: giftcard.productId,
                    quantity: giftcard.cartQuantity!,
                    amount: giftcard.amount as number,
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="self-start hidden md:block font-bold ml-auto">
        {i18nCurrencyFormat(giftcard.recipientCurrencyCode ?? "USD").format(
          giftcard?.amount! * giftcard?.cartQuantity!
        )}
      </p>
    </li>
  );
};

export default CartItem;
