import Image from "next/image";
import Link from "next/link";

import { i18nCurrencyFormat } from "../helpers/format";
import { getDenominationRange } from "../helpers/giftcard";
import { useProductDetail } from "../hooks/product";
import { GiftcardType } from "../types/giftcards";

const ProductCard = ({
  giftcard,
}: // handleAddToCart,
{
  giftcard: GiftcardType;
  // handleAddToCart: (giftcard: GiftcardType) => void;
}) => {
  const { setProduct } = useProductDetail();
  const handleClick = () => {
    setProduct(giftcard);
    localStorage.setItem("currentProduct", JSON.stringify(giftcard));
  };
  return (
    <Link href={`/products/${giftcard.productId}`} onClick={handleClick}>
      <div className="rounded-md shadow">
        <div className="relative w-full min-w-[200px] aspect-square mb-2 ">
          <Image
            src={giftcard.img}
            className="object-cover rounded-md"
            fill
            alt={giftcard.name}
          />
        </div>
      </div>
      <p className="font-medium mt-2">{giftcard.name}</p>
      <p className="font-light text-xl mt-2">
        {getDenominationRange(giftcard)}
      </p>
    </Link>
  );
};
export default ProductCard;
