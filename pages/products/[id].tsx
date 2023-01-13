import * as Select from "@radix-ui/react-select";
import Link from "next/link";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";

import CartCount from "../../src/components/CartCount";

import { useProductDetail } from "../../src/hooks/product";
import { i18nCurrencyFormat } from "../../src/helpers/format";
import { getDenominationRange } from "../../src/helpers/giftcard";
import { GiftcardType } from "../../src/types/giftcards";
import { useCart } from "../../src/hooks/cart";
import CartPopup from "../../src/components/CartPopup";

const getDefaultAmount = (giftcard: GiftcardType | null) => {
  return giftcard?.denominationType === "FIXED"
    ? giftcard?.fixedRecipientDenominations![0]
    : giftcard?.denominationType === "RANGE"
    ? giftcard?.minRecipientDenomination
    : 0;
};

const Product = () => {
  const { dispatch } = useCart();
  const { product } = useProductDetail();
  const defaultAmount = getDefaultAmount(product);
  const [amount, setAmount] = useState(defaultAmount);

  const handleAddToCart = (event: any) => {
    event.preventDefault();
    if (
      product?.denominationType === "RANGE" &&
      (amount < product?.minRecipientDenomination! ||
        amount > product?.maxRecipientDenomination!)
    ) {
      return toast.error(
        `Amount must be min.: ${
          product?.minRecipientDenomination ?? ""
        } max.: ${product?.maxRecipientDenomination ?? ""}`
      );
    }
    dispatch({
      type: "ADD",
      payload: { cartItem: { id: product?.productId!, quantity: 1, amount } },
    });
    toast.custom(
      <CartPopup
        product={{ ...product, cartQuantity: 1 } as GiftcardType}
        amount={amount}
      />
    );
  };

  return (
    <section className=" mx-auto w-11/12 max-w-6xl py-8" data-cy="product-page">
      <div className="flex items-center justify-between sm:mt-0 mb-4">
        <Link
          data-cy="back-to-shop-link"
          href="/"
          className="text-bluish text-sm underline hover:font-bold focus:font-bold transition-all focus:outline-none"
        >
          Go back to Shop
        </Link>
        <CartCount />
      </div>
      <div className="bg-white py-6">
        <div className="flex flex-col sm:flex-row w-11/12 mx-auto">
          <div className="relative sm:basis-3/6 sm:mr-4 aspect-square mb-4 sm:mb-0 w-full sm:max-w-md">
            <Image
              data-cy="product-image"
              src={product?.img ?? ""}
              alt={product?.name ?? "unamed product"}
              className="object-cover"
              fill
            />
          </div>

          <div className="sm:basis-3/6 sm:ml-8">
            <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
            <p className="text-light">{product?.description}</p>
            {/* select below */}
            <form className="mt-5" onSubmit={handleAddToCart}>
              <div className="flex flex-col xxs:flex-row">
                <div className="relative">
                  <p className="mb-1 text-lg font-medium">Select Amount</p>
                  {product?.denominationType === "FIXED" ? (
                    <Select.Root
                      value={amount.toString()}
                      onValueChange={(selected) => {
                        setAmount(Number(selected));
                      }}
                    >
                      <Select.Trigger
                        className="flex items-center justify-between gap-4 min-w-[160px] text-sm rounded-md border border-bluish focus:outline-bluish  px-2 py-1.5"
                        aria-label="Item Amount"
                      >
                        <Select.Value
                          placeholder={getDenominationRange(product)}
                        >
                          <span className="cursor-pointer">
                            Amount: {i18nCurrencyFormat("USD").format(amount)}
                          </span>
                        </Select.Value>
                        <Select.Icon
                          className="w-4 flex items-center justify-center"
                          asChild
                        >
                          <ChevronDownIcon width={15} />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Content className="overflow-hidden bg-white rounded shadow">
                        <Select.Viewport className="p-2 flex flex-col gap-2">
                          {product?.fixedRecipientDenominations?.length &&
                            product?.fixedRecipientDenominations.map(
                              (denomination) => {
                                return (
                                  <Select.Item
                                    className="text-sm cursor-pointer flex items-center justify-between transition-all ease-linear duration-300 outline-none p-1 rounded focus:bg-grey"
                                    key={denomination}
                                    value={denomination.toString()}
                                  >
                                    <Select.ItemText>
                                      {i18nCurrencyFormat("USD").format(
                                        denomination
                                      )}
                                    </Select.ItemText>

                                    <Select.ItemIndicator className="w-6 inline-flex justify-center items-center">
                                      <CheckIcon />
                                    </Select.ItemIndicator>
                                  </Select.Item>
                                );
                              }
                            )}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Root>
                  ) : (
                    <input
                      name="amount"
                      type="number"
                      className="border border-grey rounded w-16 mr-2 text-sm"
                      value={amount}
                      onChange={(e: any) => {
                        const { value } = e.target;

                        setAmount(Number(value));
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                data-cy="add-to-cart-btn"
                type="submit"
                className="text-xs bg-yellow px-6 py-1.5 rounded-md shadow-sm mt-2"
              >
                Add to Cart
              </button>
            </form>

            <div className="mt-8">
              <h2 className="font-medium">How To Redeem</h2>
              <p className="text-sm font-light">
                {product?.redeemInstruction.verbose}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
