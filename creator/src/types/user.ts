// ユーザー関連の型定義
export interface User {
  id: string;
  tiktok_id: string;
  name: string;
  email: string;
  profile_image: string | null;
  created_at: string | Date;
}
