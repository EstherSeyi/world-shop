import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useCart } from "../src/hooks/cart";
import { calculateTotalCartValue } from "../src/components/SubTotal";

import CheckoutTableRow from "../src/components/CheckoutTableRow";
import { CartItemType } from "../src/types/cart";
import { i18nCurrencyFormat } from "../src/helpers/format";

const ConfirmCheckout = () => {
  const router = useRouter();
  const { state, dispatch } = useCart();

  const totalCartValue = useMemo(
    () => calculateTotalCartValue(state.cartItems),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(state.cartItems)]
  );

  const handlePlaceOrder = () => {
    router.push("/thankyou");
    dispatch({
      type: "RESET_CART",
      payload: {
        cartItems: [],
        totalNoOfItems: 0,
      },
    });
  };

  return (
    <>
      <div className="w-11/12 mx-auto max-w-7xl pt-4">
        <Link
          href="/cart"
          className="text-bluish text-sm underline hover:font-bold focus:font-bold transition-all focus:outline-none"
        >
          Go Back to Cart
        </Link>
      </div>
      <div className="mx-auto w-11/12 max-w-7xl pt-6">
        <section className="flex flex-col sm:flex-row justify-between mb-6">
          <h1 className="text-3xl font-medium">Order Confirmation</h1>
          <div className="flex flex-col xs:flex-row xs:items-center justify-between mt-4">
            <p className="mr-8 mb-2 xs:mb-0">
              <span className="text-sm">Order Total: </span>
              <span className="text-xl">
                {i18nCurrencyFormat("USD").format(totalCartValue)}
              </span>
            </p>

            <button
              className="bg-yellow px-2.5 py-1 rounded shadow"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </section>
        <section className="bg-white shadow py-6 mb-4">
          <div className="mx-auto w-11/12">
            <div className="flex border-b border-grey pb-1 mb-2">
              <p className="basis-4/6 sm:basis-3/6 font-medium">Product Id</p>
              <p className="hidden sm:block basis-1/6 font-medium">Quantity</p>
              <p className="basis-2/6 font-medium">Cost</p>
            </div>

            {state.cartItems.map((cartItem: CartItemType) => (
              <CheckoutTableRow key={cartItem.id} orderItem={cartItem} />
            ))}
            <div className="flex  pb-1 mb-2">
              <p className="basis-4/6 font-medium">Total</p>
              <p className="basis-2/6 font-medium underline underline-offset-2">
                {i18nCurrencyFormat("USD").format(totalCartValue)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ConfirmCheckout;
