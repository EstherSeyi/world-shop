/** Third Party */
import dynamic from "next/dynamic";

import ProductsList from "../src/components/Products";

import { useAppQuery } from "../src/hooks/queries";
import dummyData from "../cypress/fixtures/products.json";

const CartCount = dynamic(() => import("../src/components/CartCount"), {
  ssr: false,
});

export default function Home() {
  const { data, isLoading, error, refetch } = useAppQuery("assets", {
    url: "/v0.2/info/assets",
  });

  const giftcards =
    data?.data?.giftCardsRLD?.content ?? dummyData.data.giftCardsRLD.content;
  return (
    <section className=" mx-auto w-11/12 max-w-7xl py-8">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-3xl font-medium" data-cy="page-title">
          Gift Cards
        </h1>
        <CartCount />
      </header>

      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 -mt-[50px] -ml-[50px]">
          Loading...
        </div>
      ) : error ? (
        <div className="fixed top-1/2 left-1/2 -mt-[50px] -ml-[50px] text-center">
          <p className="mb-2">Ooops! This embarassing...</p>
          <button onClick={() => refetch()}>Please refresh</button>
        </div>
      ) : (
        <ProductsList giftcards={giftcards} />
      )}
    </section>
  );
}
