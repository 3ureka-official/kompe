/**
 * コンテスト関連の型定義
 */
export type ContestPayment = {
  id: string;
  brand_id: string | null;
  contest_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  stripe_charge_id: string | null;
  transfer_group: string;
  currency: string;
  amount_gross: number;
  amount_fee: number;
  amount_net: number;
  status: string;
  available_on: string | Date | null;
  created_at: string;
};
