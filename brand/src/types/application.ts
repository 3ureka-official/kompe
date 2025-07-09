/**
 * アプリケーション関連の型定義
 */
export type Application = {
  id: string;
  contestId: string;
  creatorId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  metrics: {
    views: number;
    likes: number;
  };
  submittedAt: Date;
}; 