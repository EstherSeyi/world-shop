import { useRouter } from "next/router";

import { useCart } from "../hooks/cart";
import CartIcon from "../assets/icons/cart.svg";
const CartCount = () => {
  const { state } = useCart();
  const router = useRouter();
  return (
    <div className="mt-4 sm:mt-0 mb-4">
      <button
        className="block transition-all ml-auto hover:text-bluish focus:text-bluish"
        onClick={() => router.push("/cart")}
      >
        <div className="relative">
          <CartIcon className="h-8 w-8" />
          <span className="absolute bottom-6 left-3 ml-0.25 break-words text-sm">
            {state.totalNoOfItems}
          </span>
        </div>
        <span className="text-sm self-end ml-2 font-medium">Cart</span>
      </button>
    </div>
  );
};

export default CartCount;
