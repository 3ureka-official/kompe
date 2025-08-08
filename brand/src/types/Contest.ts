/**
 * コンテスト関連の型定義
 */
export type Contest = {
  id: string;
  brandId: string;
  status: "ready" | "application" | "contest" | "ended";

  title: string;
  category: string;
  thumbnail_url: string;
  application_start_date: string | Date;
  application_end_date: string | Date;
  contest_start_date: string | Date;
  contest_end_date: string | Date;

  description: string;
  requirements: string;

  prize_pool: number;
  prize_distribution: number[];

  created_at: string | Date;
};

export interface AssetItem {
  id: string;
  brand_id: string;
  contest_id: string;
  file_url: string | null;
  url: string | null;
  description: string | null;
  created_at: string | Date;
}

export interface FormAssetItem {
  file: File | null;
  url: string | null;
  description: string | null;
}

export interface InspirationItem {
  id: string;
  brand_id: string;
  contest_id: string;
  url: string | null;
  description: string | null;
  created_at: string | Date;
}
