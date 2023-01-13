import { GiftcardType } from "../types/giftcards";

import ProductCard from "./ProductCard";

const ProductsList = ({ giftcards }: { giftcards: GiftcardType[] | [] }) => {
  return (
    <section className="grid grid-cols-auto gap-8" data-cy="product-list">
      {giftcards.map((giftcard: GiftcardType) => (
        <ProductCard key={giftcard.productId} giftcard={giftcard} />
      ))}
    </section>
  );
};

export default ProductsList;
