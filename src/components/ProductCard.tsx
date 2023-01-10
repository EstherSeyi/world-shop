import Image from "next/image";
import Link from "next/link";

import { i18nCurrencyFormat } from "../helpers/format";

const ProductCard = ({ asset, handleAddToCart }: any) => {
  return (
    <div className="rounded-md shadow">
      <div className="relative w-full min-w-[200px] aspect-square mb-2 ">
        <Image
          src={asset.images[0]}
          className="object-cover rounded-md"
          fill
          alt="product"
        />
      </div>
      <div className="px-4 pb-4">
        <Link href="http://google.com">
          <span className="font-medium">{asset.name}</span>
        </Link>
        <p className="font-medium text-xl mt-2">
          {i18nCurrencyFormat(asset?.currency ?? "USD").format(asset.price)}
        </p>
        <button
          onClick={() => handleAddToCart(asset)}
          className="py-2 px-2 bg-yellow rounded-lg shadow text-sm mt-4 transition-all hover:font-bold focus:font-bold border-yellow focus:border-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
