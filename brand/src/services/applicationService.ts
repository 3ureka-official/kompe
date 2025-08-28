import { supabase } from "@/lib/supabase";
import { Application } from "@/types/Application";

/**
 * 指定されたコンテストIDのアプリケーションを取得
 */
export async function getApplicationsByContestId(
  contestId: string,
): Promise<Application[]> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*, creator:creators(*)")
      .eq("contest_id", contestId)
      .order("views", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("アプリケーション取得エラー:", error);
    throw error;
  }
}

/**
 * 指定されたクリエイターのアプリケーションを取得
 */
export async function getApplicationsByCreatorId(
  creatorId: string,
): Promise<Application[]> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*, creator:creators(*)")
      .eq("creator_id", creatorId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("アプリケーション取得エラー:", error);
    throw error;
  }
}
