/**
 * クリエイター住所関連の型定義
 */
export type CreatorAddress = {
  id: string;
  creator_id: string;
  postal_code: string;
  prefecture: string;
  city: string;
  address_line: string;
  created_at: Date | string;
};

export type CreatorAddressCreate = Omit<
  CreatorAddress,
  "id" | "created_at" | "updated_at"
>;

export type CreatorAddressUpdate = Partial<
  Omit<CreatorAddress, "id" | "creator_id" | "created_at" | "updated_at">
>;
