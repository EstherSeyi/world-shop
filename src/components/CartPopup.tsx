import Image from "next/image";
import Link from "next/link";

import testpic from "../assets/testpic.png";
import { useCart } from "../hooks/cart";
import { GiftcardType } from "../types/giftcards";
import SelectQuantity from "./SelectQuantity";

const CartPopup = ({
  product,
  amount,
}: {
  product: GiftcardType | null | any;
  amount: number;
}) => {
  const { dispatch } = useCart();
  const cartItem = {
    id: product?.productId!,
    quantity: product?.cartQuantity!,
    amount,
  };
  const handleDelete = () => {
    dispatch({
      type: "REMOVE",
      payload: {
        cartItem,
      },
    });
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
        <SelectQuantity
          cartItem={{
            id: product?.productId,
            quantity: product?.cartQuantity,
            amount,
          }}
          handleDelete={handleDelete}
        />
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
