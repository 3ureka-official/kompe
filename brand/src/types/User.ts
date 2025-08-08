// ユーザー関連の型定義
export interface User {
  id: string;
  email: string;
  name: string;
  profile_image: string | null;
  brand_id: string | null;
  created_at: string | Date;
}

// モックデータ
export const mockUser: User = {
  id: "user-1",
  email: "tanaka@example.com",
  name: "tanaka",
  brand_id: null,
  profile_image: "https://placehold.co/100x100",
  created_at: new Date(),
};
