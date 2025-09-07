// ブランド関連の型定義
export interface Brand {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  tiktok_username: string | null;
  instagram_url: string | null;
  created_at: Date | string;
}
