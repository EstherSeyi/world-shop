import { useMemo } from "react";

import { useCart } from "../src/hooks/cart";
import { calculateTotalCartValue } from "../src/components/SubTotal";

import CheckoutTableRow from "../src/components/CheckoutTableRow";
import { CartItemType } from "../src/types/cart";
import { i18nCurrencyFormat } from "../src/helpers/format";

const ConfirmCheckout = () => {
  const { state } = useCart();

  const totalCartValue = useMemo(
    () => calculateTotalCartValue(state.cartItems),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(state.cartItems)]
  );

  return (
    <main className="md:bg-[#ebeded] min-h-screen">
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

            <button className="bg-yellow px-2.5 py-1 rounded shadow">
              Place Order
            </button>
          </div>
        </section>
        <section className="bg-white shadow py-6 mb-4">
          <div className="mx-auto w-11/12">
            <div className="flex border-b border-grey pb-1 mb-2">
              <p className="basis-3/6 font-medium">Asset</p>
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
        <section className="bg-white shadow py-6">
          <div className="mx-auto w-11/12">
            <div className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-0 text-sm">
              <div className="basis-1/2 sm:mr-4">
                <h2 className="text-xl font-medium mb-2 border-b border-dashed pb-4">
                  Your Information
                </h2>
                <p className="mb-2 font-bold">May Peng</p>
                <p>mpeng@gmail.com</p>
              </div>
              <div className="basis-1/2 sm:ml-4 mt-8 sm:mt-0">
                <h2 className="text-xl font-medium mb-2 border-b border-dashed pb-4">
                  Shipping Address
                </h2>
                <p className="mb-2 font-bold">May Peng</p>
                <div>
                  <p>19 Daniel Makinde Str</p>
                  <p>Adekunle, Yaba</p>
                  <p>Lagos State</p>
                  <p>(234) 806 558 9871</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mb-0 text-sm">
              <div className="basis-1/2 sm:mr-4">
                <h2 className="text-xl font-medium mb-2 border-b border-dashed pb-4">
                  Payment
                </h2>
                <p>VISA</p>
                <p>Visa card ending in 1234</p>
              </div>
              <div className="basis-1/2 sm:ml-4 mt-8 sm:mt-0">
                <h2 className="text-xl font-medium mb-2 border-b border-dashed pb-4">
                  Billing Address
                </h2>
                <p className="mb-2 font-bold">May Peng</p>
                <div>
                  <p>19 Daniel Makinde Str</p>
                  <p>Adekunle, Yaba</p>
                  <p>Lagos State</p>
                  <p>(234) 806 558 9871</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ConfirmCheckout;
