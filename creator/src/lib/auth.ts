import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";

const STORAGE_KEYS = {
  USER: "auth_user",
  TOKEN: "auth_token",
} as const;

// テスト用ユーザーデータ
const TEST_USERS: Array<{ email: string; password: string; user: User }> = [
  {
    email: "test@example.com",
    password: "password123",
    user: {
      id: "user-001",
      email: "test@example.com",
      name: "テストユーザー",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=64&h=64&fit=crop&crop=face",
      tiktokHandle: "@testuser",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
  },
  {
    email: "creator@example.com",
    password: "password123",
    user: {
      id: "user-002",
      email: "creator@example.com",
      name: "クリエイター太郎",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      tiktokHandle: "@creator_taro",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
  },
  {
    email: "demo@tiktok.com",
    password: "demo123",
    user: {
      id: "user-003",
      email: "demo@tiktok.com",
      name: "TikTokデモ",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      tiktokHandle: "@tiktok_demo",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
  },
];

export class AuthService {
  // ログイン
  static async login(credentials: LoginCredentials): Promise<User> {
    // 遅延をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 800));

    const testUser = TEST_USERS.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (!testUser) {
      throw new AuthError("メールアドレスまたはパスワードが正しくありません");
    }

    // LocalStorageに保存
    const token = `token_${testUser.user.id}_${Date.now()}`;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(testUser.user));
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);

    return testUser.user;
  }

  // ログアウト
  static async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  // 現在のユーザーを取得
  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (!userData || !token) {
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  }

  // 認証状態をチェック
  static isAuthenticated(): boolean {
    return !!(
      localStorage.getItem(STORAGE_KEYS.USER) &&
      localStorage.getItem(STORAGE_KEYS.TOKEN)
    );
  }

  // ユーザー登録（デモ用）
  static async register(credentials: RegisterCredentials): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // パスワード確認
    if (credentials.password !== credentials.confirmPassword) {
      throw new AuthError("パスワードが一致しません");
    }

    // 既存ユーザーチェック
    const existingUser = TEST_USERS.find((u) => u.email === credentials.email);
    if (existingUser) {
      throw new AuthError("このメールアドレスは既に登録されています");
    }

    // 新しいユーザーを作成（実際の実装ではサーバーに送信）
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      name: credentials.name,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      tiktokHandle: `@${credentials.name.toLowerCase().replace(/\s+/g, "_")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // LocalStorageに保存
    const token = `token_${newUser.id}_${Date.now()}`;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);

    return newUser;
  }

  // パスワードリセット（デモ用）
  static async resetPassword(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = TEST_USERS.find((u) => u.email === email);
    if (!user) {
      throw new AuthError("このメールアドレスは登録されていません");
    }

    // 実際の実装ではメール送信
    console.log(`パスワードリセットメールを ${email} に送信しました`);
  }

  // プロフィール更新
  static async updateProfile(
    userId: string,
    data: Partial<User>,
  ): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const currentUser = this.getCurrentUser();
    if (!currentUser || currentUser.id !== userId) {
      throw new AuthError("ユーザーが見つかりません");
    }

    const updatedUser = {
      ...currentUser,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    return updatedUser;
  }
}

// カスタムエラークラス
export class AuthError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}
