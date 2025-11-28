import { Application } from "./Application";
import { ContestPayment } from "./ContestPayment";
import { Creator } from "./Creator";
import { Brand } from "./Brand";
import { SampleProduct } from "./SampleProduct";

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
  requirements: string;
  entry_start_date?: string | Date;
  entry_end_date?: string | Date;
  video_production_start_date?: string | Date;
  video_production_end_date?: string | Date;

  supply_of_samples?: string;

  requires_purchase_proof?: boolean;
  purchase_product_name?: string | null;
  purchase_product_url?: string | null;
  purchase_description?: string | null;

  has_sample?: boolean;
  sample_product_name?: string | null;
  sample_rental_or_purchase?: "RENTAL" | "PURCHASE" | null;
  sample_price_per_creator?: number | null;
  sample_return_postal_code?: string | null;
  sample_return_prefecture?: string | null;
  sample_return_city?: string | null;
  sample_return_address_line?: string | null;

  created_at: string | Date;
  contest_payments?: ContestPayment;
  updated_engagement_at: string | Date;
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

export interface ContestPrize {
  id: string;
  contest_id: string;
  rank: number;
  amount: number;
  created_at: string | Date;
}

export type ContestWithApplications = Contest & {
  applications: (Application & { creators: Creator })[];
  brands: Brand;
  contests_assets: Array<AssetItem>;
  contests_inspirations: Array<InspirationItem>;
  contest_prizes?: Array<ContestPrize>;
  sample_products?: Array<SampleProduct>;
};
