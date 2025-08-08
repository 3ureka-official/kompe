import { User } from "@/types/user";
import supabase from "@/lib/supabase";

/**
 * ユーザープロフィールを取得
 * @param userId ユーザーID
 * @returns ユーザープロフィール
 */
export async function getUser(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("ユーザープロフィール取得エラー:", error);
      throw error;
    }
    return data as User;
  } catch (error) {
    console.error("ユーザープロフィール取得エラー:", error);
    throw error;
  }
}
