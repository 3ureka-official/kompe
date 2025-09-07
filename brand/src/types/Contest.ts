import { ContestPayment } from "./ContestPayment";

/**
 * コンテスト関連の型定義
 */
export type Contest = {
  id: string;
  brand_id: string;
  is_draft: boolean;
  title: string;
  thumbnail_url: string;
  contest_start_date: string | Date;
  contest_end_date: string | Date;

  videos: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;

  description: string;
  supply_of_samples: string;
  requirements: string;

  prize_pool: number;
  prize_distribution: number[];

  created_at: string | Date;
  contest_payments?: ContestPayment;
};

export interface AssetItem {
  id: string;
  brand_id: string;
  contest_id: string;
  url: string;
  description: string;
  created_at: string | Date;
}

export interface InspirationItem {
  id: string;
  brand_id: string;
  contest_id: string;
  url: string;
  description: string;
  created_at: string | Date;
}
