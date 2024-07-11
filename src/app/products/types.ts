export type Price = {
  id: number;
  currency: "USD" | "BRL" | "EUR" | "GBP";
  stripe_price_id: string;
  product_id: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  photo: string;
  provider: "STRIPE" | "SHOPIFY";
  user_id: number;
  stripe_product_id: string | null;
  shopify_product_id: string | null;
  prices: Price[];
};
