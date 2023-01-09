type Variant = {
  name: string;
  created_at: string;
};

type Discount = {
  name: string;
  created_at: string;
  price: number;
};

type Asset = {
  id: number;
  name: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  status: string;
  tags: string[];
  price: number;
  currency: string;
  sizes: string[];
  variants: Variant[];
  images: string[];
  discount: Discount;
  countries: [] | string[];
  available: boolean;
  type: string;
  cart_quantity?: number;
};

export default Asset;
