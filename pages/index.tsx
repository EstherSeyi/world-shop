/** Third Party */
import { useRouter } from "next/router";
import toast from "react-hot-toast";

/** Components */
import ProductCard from "../src/components/ProductCard";

/** Other Stuff */
import dummyData from "../src/assets/data.json";
import CartIcon from "../src/assets/icons/cart.svg";
import { useCart } from "../src/hooks/cart";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useCart();

  const handleAddToCart = (asset: any) => {
    dispatch({ type: "ADD", payload: asset });
    toast(`${asset.name} added to cart`);
  };

  return (
    <main className=" mx-auto w-11/12 max-w-7xl py-8">
      <h1 className="mb-8 text-xl sm:text-3xl font-medium">Supported Assets</h1>
      <div className="mb-4">
        <button
          className="block transition-all ml-auto hover:text-bluish focus:text-bluish"
          onClick={() => router.push("/cart")}
        >
          <div className="relative">
            <CartIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="absolute bottom-7 left-4 ml-0.25 break-words">
              {state.totalNoOfItems}
            </span>
          </div>
          <span className="text-sm self-end ml-2 font-medium">Cart</span>
        </button>
      </div>
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
