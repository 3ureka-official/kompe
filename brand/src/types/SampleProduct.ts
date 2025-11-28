/**
 * 試供品関連の型定義
 */
export type SampleProduct = {
  id: string;
  contest_id: string;
  product_name: string;
  rental_or_purchase: "RENTAL" | "PURCHASE";
  price_per_creator: number;
  return_postal_code: string | null;
  return_prefecture: string | null;
  return_city: string | null;
  return_address_line: string | null;
  created_at: string | Date;
};

export type SampleProductFormData = Omit<
  SampleProduct,
  "id" | "contest_id" | "created_at"
>;
