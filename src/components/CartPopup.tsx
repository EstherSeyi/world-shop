import Image from "next/image";
import Link from "next/link";

import { i18nCurrencyFormat } from "../helpers/format";
import { GiftcardType } from "../types/giftcards";

const CartPopup = ({
  product,
  amount,
}: {
  product: GiftcardType | null;
  amount: number;
}) => {
  const cartItem = {
    id: product?.productId!,
    quantity: product?.cartQuantity!,
    amount,
  };

  return (
    <div className="bg-white w-96 rounded-md shadow-md">
      <div className="w-11/12 mx-auto flex justify-between py-4">
        <Image
          src={product?.img ?? ""}
          alt={product?.name ?? "unknown product"}
          width="32"
          height="32"
        />
        <div className="flex-1 mx-4">
          <p>
            {product?.name}
            <span> added to cart!</span>
          </p>
        </div>
        <div>
          <p>Qty: {cartItem.quantity}</p>
        </div>
        <div>
          <p>
            {i18nCurrencyFormat(product?.recipientCurrencyCode!).format(
              cartItem.amount * cartItem.quantity
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-grey py-2 flex justify-center">
        <Link
          href="/cart"
          className="inline-block  px-4 py-1 bg-yellow rounded shadow"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default CartPopup;
