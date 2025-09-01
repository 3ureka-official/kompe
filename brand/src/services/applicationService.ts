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
      .select(
        `
        *,
        creator:creators(*),
        contest_transfer:contest_transfers!contest_transfers_application_id_fkey(
          id, contest_id, application_id, amount, stripe_transfer_id, created_at
        )
      `,
      )
      .eq("contest_id", contestId)
      .order("views", { ascending: false });

    if (error) throw error;

    return data as Application[];
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
