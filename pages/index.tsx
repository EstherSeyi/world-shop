/** Third Party */
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

/** Components */
import ProductCard from "../src/components/ProductCard";

/** Other Stuff */
import dummyData from "../src/assets/data.json";
import { useCart } from "../src/hooks/cart";
import Asset from "../src/types/asset";

const CartCount = dynamic(() => import("../src/components/CartCount"), {
  ssr: false,
});

export default function Home() {
  const { dispatch } = useCart();

  const handleAddToCart = (asset: Asset) => {
    dispatch({
      type: "ADD",
      payload: { cartItem: { id: asset.id, quantity: 1 } },
    });
    toast(`${asset.name} added to cart`);
  };

  return (
    <main className=" mx-auto w-11/12 max-w-7xl py-8">
      <h1 className="text-xl sm:text-3xl font-medium">Supported Assets</h1>
      <CartCount />
      <section className="grid grid-cols-auto gap-8">
        {dummyData?.data?.benefitsList.map((asset) => (
          <ProductCard
            key={asset.id}
            asset={asset}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </section>
    </main>
  );
}
