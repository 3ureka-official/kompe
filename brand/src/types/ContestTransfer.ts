/**
 * コンテスト賞金の支払い情報
 */

export interface ContestTransfer {
  id: string;
  contest_id: string;
  application_id: string;
  creator_id: string;
  brand_id: string;
  amount: number;
  stripe_transfer_id: string;
  currency: string;
  destination_account: string;
  created_at: Date;
}
