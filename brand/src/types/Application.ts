import { Creator } from "./Creator";
import { ContestTransfer } from "./ContestTransfer";

/**
 * アプリケーション関連の型定義
 */
export type Application = {
  id: string;
  contestId: string;
  creatorId: string;
  tiktok_url: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  created_at: Date;
  creator: Creator;
  contest_transfer: ContestTransfer | null;
};
