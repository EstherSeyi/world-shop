import {
  createContext,
  Dispatch,
  useState,
  useContext,
  useEffect,
} from "react";

import { GiftcardType } from "../types/giftcards";

type ProductContextType = {
  product: GiftcardType | null;
  setProduct: Dispatch<React.SetStateAction<GiftcardType | null>>;
};

const ProductContext = createContext<ProductContextType | null>(null);
const productinitializer = (
  setProduct: Dispatch<React.SetStateAction<GiftcardType | null>>
) => {
  const productDetailString = localStorage.getItem("currentProduct");
  if (productDetailString) {
    const currentProduct =
      productDetailString && JSON.parse(productDetailString);
    setProduct(currentProduct);
  }
};
export const ProductProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [product, setProduct] = useState<GiftcardType | null>(null);
  const value = { product, setProduct };

  useEffect(() => {
    productinitializer(setProduct);
  }, []);
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export function useProductDetail() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
