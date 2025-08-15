/**
 * コンテスト関連の型定義
 */
export type Contest = {
  id: string;
  brand_id: string;
  is_draft: boolean;
  title: string;
  category: string;
  thumbnail_url: string;
  application_start_date: string | Date;
  application_end_date: string | Date;
  contest_start_date: string | Date;
  contest_end_date: string | Date;

  videos: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;

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

export interface InspirationItem {
  id: string;
  brand_id: string;
  contest_id: string;
  url: string | null;
  description: string | null;
  created_at: string | Date;
}
