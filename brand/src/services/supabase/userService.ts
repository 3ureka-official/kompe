import { User } from "@/types/User";
import { supabase } from "@/lib/supabase";
import { supabaseAuthErrorCodeToJapaneseMessage } from "@/features/auth/constants/auth.constant";

/**
 * メール確認後のリダイレクト先URLを取得
 * @returns リダイレクト先URL
 */
function getEmailRedirectUrl(): string | undefined {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/verify-email?verified=true`;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?verified=true`;
  }
  return undefined;
}

/**
 * ユーザーを取得
 * @returns ユーザー、存在しない場合はnull
 */
export async function getAuthUser() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error?.code) {
      throw new Error(supabaseAuthErrorCodeToJapaneseMessage[error.code]);
    }

    if (!data.session?.user) {
      return null;
    }

    return data.session.user;
  } catch (error) {
    // 予期しないエラーの場合は再スロー
    throw error;
  }
}

/**
 * ユーザープロフィールを取得
 * @param userId ユーザーID
 * @returns ユーザープロフィール、存在しない場合はnull
 */
export async function getProfile(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    // レコードが存在しない場合（PGRST116）はnullを返す
    if (error?.code === "PGRST116") {
      return null;
    }

    if (error?.code) {
      throw new Error(
        supabaseAuthErrorCodeToJapaneseMessage[error.code] || error.message,
      );
    }

    return data as User;
  } catch (error) {
    // 予期しないエラーの場合は再スロー
    throw error;
  }
}

/**
 * ユーザープロフィールを作成
 * @param user_data ユーザーデータ
 * @returns 作成されたユーザープロフィール
 */
export async function createUser(
  user_data: Omit<User, "created_at" | "brand_id" | "profile_image">,
): Promise<User> {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert(user_data)
      .select("*")
      .single();

    if (error?.code) {
      throw new Error(supabaseAuthErrorCodeToJapaneseMessage[error.code]);
    }

    return data as User;
  } catch (error) {
    throw error;
  }
}

/**
 * ユーザーの編集
 * @param userId ユーザーID
 * @param userData ユーザーデータ
 * @returns 編集されたユーザープロフィール
 */
export async function updateUser(
  userId: string,
  userData: Partial<Omit<User, "id" | "created_at">>,
): Promise<User> {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", userId)
      .select("*")
      .single();

    if (error?.code) {
      throw new Error(supabaseAuthErrorCodeToJapaneseMessage[error.code]);
    }
    return data as User;
  } catch (error) {
    throw error;
  }
}

/**
 * ログイン
 * @param email メールアドレス
 * @param password パスワード
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error?.code) {
      if (error.code === "email_not_confirmed") {
        return null;
      }

      throw new Error(supabaseAuthErrorCodeToJapaneseMessage[error.code]);
    }

    return {
      user: data.user,
      email_confirmed_at: data.user?.email_confirmed_at ?? null,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * サインアップ
 * @param email メールアドレス
 * @param password パスワード
 */
export const signUp = async (email: string, password: string) => {
  try {
    const { data: emailExists, error: emailExistsError } = await supabase.rpc(
      "check_email_exists",
      {
        email_address: email,
      },
    );

    if (emailExistsError?.code) {
      throw new Error(
        supabaseAuthErrorCodeToJapaneseMessage[emailExistsError.code],
      );
    }

    if (emailExists > 0) {
      throw new Error(
        "このメールアドレスは既に登録されています。ログインするか、別のメールアドレスをお使いください。",
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: getEmailRedirectUrl(),
      },
    });

    if (error?.code) {
      throw new Error(supabaseAuthErrorCodeToJapaneseMessage[error.code]);
    }

    if (!data.user) {
      throw new Error("アカウントの作成に失敗しました");
    }

    return {
      user: data.user,
      email_confirmed_at: data.user?.email_confirmed_at ?? null,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * 確認メール再送信
 * @param email メールアドレス
 */
export const resendConfirmationEmail = async (email: string) => {
  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
      options: {
        emailRedirectTo: getEmailRedirectUrl(),
      },
    });

    if (error?.code) {
      throw new Error(supabaseAuthErrorCodeToJapaneseMessage[error.code]);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * メール確認トークンを検証
 * @param email メールアドレス
 * @param token トークン
 * @param type トークンのタイプ
 */
export const verifyEmailOtp = async (
  email: string,
  token: string,
  type: "signup" | "email",
) => {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: type,
    });

    if (error?.code) {
      throw new Error(
        supabaseAuthErrorCodeToJapaneseMessage[error.code] || error.message,
      );
    }
  } catch (error) {
    throw error;
  }
};

/**
 * メール確認コードを検証
 * @param email メールアドレス
 * @param code 6桁の確認コード
 */
export const verifyEmailCode = async (email: string, code: string) => {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: code,
      type: "email",
    });

    if (error?.code) {
      throw new Error(
        supabaseAuthErrorCodeToJapaneseMessage[error.code] || error.message,
      );
    }

    // 認証状態が更新されるまで少し待つ
    await new Promise((resolve) => setTimeout(resolve, 500));

    // セッションを取得してユーザー情報を取得
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      // ユーザープロフィールを作成（既に存在する場合はスキップ）
      const existingUser = await getProfile(session.user.id);

      if (!existingUser) {
        return await createUser({
          id: session.user.id,
          email: session.user.email || "",
        });
      }

      return existingUser;
    }

    return session?.user;
  } catch (error) {
    throw error;
  }
};

/**
 * ログアウト
 */
export const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
};
