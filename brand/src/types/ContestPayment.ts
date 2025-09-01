/**
 * コンテスト関連の型定義
 */
export type ContestPayment = {
  id: string;
  brand_id: string;
  contest_id: string;
  stripe_payment_intent_id: string;
  stripe_checkout_session_id: string;
  stripe_charge_id: string;
  transfer_group: string;
  currency: string;
  amount_gross: number;
  amount_fee: number;
  amount_net: number;
  status: string;
  available_on: string;
  created_at: string;
};
