/** Third Party */
import dynamic from "next/dynamic";

import ProductsList from "../src/components/Products";

import { useAppQuery } from "../src/hooks/queries";

const CartCount = dynamic(() => import("../src/components/CartCount"), {
  ssr: false,
});

export default function Home() {
  const { data, isLoading, error } = useAppQuery("assets", {
    url: "/v0.2/info/assets",
  });

  const giftcards = data?.data?.giftCardsRLD?.content ?? [];

  return (
    <section className=" mx-auto w-11/12 max-w-7xl py-8">
      <h1 className="text-xl sm:text-3xl font-medium">Gift Cards</h1>
      <CartCount />
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 -mt-[50px] -ml-[50px]">
          Loading...
        </div>
      ) : error ? (
        <div className="fixed top-1/2 left-1/2 -mt-[50px] -ml-[50px] text-center">
          <p className="mb-2">Ooops! This embarassing...</p>
          <p>Please refresh</p>
        </div>
      ) : (
        <ProductsList giftcards={giftcards} />
      )}
    </section>
  );
}
