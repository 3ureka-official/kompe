import { User } from '@/types/User';
import { getSupabaseClient } from '@/lib/supabase';


/**
 * ユーザープロフィールを取得
 * @param uid ユーザーID
 * @returns ユーザープロフィール
 */
export async function getUser(uid: string): Promise<User | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('users').select('*').eq('id', uid).single();

    if (error) {
      console.error('ユーザープロフィール取得エラー:', error);
      throw error;
    }
    return data as User;
  } catch (error) {
    console.error('ユーザープロフィール取得エラー:', error);
    throw error;
  }
}

/**
 * ユーザープロフィールを作成
 * @param user ユーザーデータ
 * @returns 作成されたユーザープロフィール
 */
export async function createUser(user: {
  id: string;
  email: string;
}): Promise<User> {
  try {
    const userData: User = {
      ...user,
      profile_image: '',
      brand_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.from('users').insert(userData).select('*').single();
    if (error) {
      console.error('ユーザープロフィール作成エラー:', error);
      throw error;
    }

    return data as User;
  } catch (error) {
    console.error('ユーザープロフィール作成エラー:', error);
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
    const supabase = getSupabaseClient();
    await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
  } catch (error) {
    console.error('ログインエラー:', error);
    throw error;
  }
};

/**
 * サインアップ
 * @param email メールアドレス
 * @param password パスワード
 * @param displayName 表示名
 */
export const signUp = async (email: string, password: string) => {
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (!data.user) {
      console.error('サインアップエラー:', data);
      throw new Error('ユーザーが作成できませんでした');
    }

    const user = await createUser({
      id: data.user.id,
      email: email,
    });

    return user;
  } catch (error) {
    console.error('サインアップエラー:', error);
    throw error;
  }
};

/**
 * ログアウト
 */
export const logout = async () => {
  try {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw error;
  }
};