/**
 * コンテスト関連の型定義
 */
export type Contest = {
  id: string;
  brandId: string;
  title: string;
  description: string;
  requirements: string;
  prizePool: number;
  prizeDistribution: number[];
  startDate: string;
  endDate: string;
  category: string;
  status: 'ready' | 'active' | 'ended';
  thumbnail: string;
  assets: (AssetItem | string)[];
  inspiration?: AssetItem[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  videos: number;
};

export interface AssetItem {
  content: string;      // テキスト or 埋め込みリンク
  description: string;
}
// コンテスト作成フォームの型定義
export interface CreateContestFormData {
  title: string;
  description: string;
  requirements: string;
  prizePool: number;
  prizeDistribution: number[];
  startDate: string;
  endDate: string;
  category: string;
  thumbnail: File | null;
  resources: {
    images: File[];
    videos: File[];
    guidelines: string;
  };
} 