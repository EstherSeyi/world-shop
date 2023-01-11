import Link from "next/link";
import { useMemo } from "react";

import CartItem from "../src/components/CartItem";
import SubTotal from "../src/components/SubTotal";

import { useCart } from "../src/hooks/cart";
import { useAppQuery } from "../src/hooks/queries";
import { getCartItemsDetails } from "../src/helpers/cart";

const Cart = () => {
  const { state, dispatch } = useCart();

  const { data, isLoading } = useAppQuery("assets", {
    url: "/v0.2/info/assets",
  });

  const giftCardsDetails = useMemo(
    () =>
      getCartItemsDetails(
        state.cartItems,
        data?.data?.giftCardsRLD?.content ?? []
      ),
    [data?.data?.giftCardsRLD?.content, state.cartItems]
  );

  return (
    <>
      <div className="w-11/12 mx-auto max-w-7xl pt-4">
        <Link
          href="/"
          className="text-bluish text-sm underline hover:font-bold focus:font-bold transition-all focus:outline-none"
        >
          Go back to Shop
        </Link>
      </div>
      <section className="flex flex-col md:flex-row justify-between w-11/12 mx-auto py-4 md:py-8 text-black text-base max-w-7xl">
        <SubTotal />
        <section className="md:basis-9/12 md:bg-white  md:mr-4 xs:p-4">
          <div className="hidden md:block">
            <h1 className="text-3xl font-medium">Shopping Cart</h1>
            {state.cartItems.length ? (
              <button
                className="font-medium text-bluish text-sm hover:font-bold focus:font-bold focus:underline focus:outline-none transition-all"
                onClick={() =>
                  dispatch({
                    type: "RESET_CART",
                    payload: {
                      cartItems: [],
                      totalNoOfItems: 0,
                    },
                  })
                }
              >
                Delete all items
              </button>
            ) : null}
          </div>
          <div className="hidden md:flex justify-end  border-b border-grey mb-6 mt-1">
            {state.cartItems.length ? (
              <p className="text-sm m-0">Price</p>
            ) : null}
          </div>
          {!state.cartItems.length && (
            <div className="text-sm">
              <p className="mb-8">
                Your cart is currently empty! Add some items to checkout.
              </p>
              <p className="text-center text-bluish underline font-medium">
                <Link
                  href="/"
                  className="hover:font-bold focus:font-bold transition-all"
                >
                  Continue shopping supported assets.
                </Link>
              </p>
            </div>
          )}

          <ul>
            {!isLoading
              ? giftCardsDetails?.length &&
                giftCardsDetails?.map((giftcard) => (
                  <CartItem
                    key={`${giftcard.productId}_${giftcard.name}`}
                    giftcard={giftcard}
                  />
                ))
              : null}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Cart;
