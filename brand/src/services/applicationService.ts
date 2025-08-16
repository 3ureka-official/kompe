import supabase from "@/lib/supabase";
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
      .select("*")
      .eq("contest_id", contestId);

    if (error) throw error;

    const applications: Application[] = [];
    data.forEach((application) => {
      applications.push({
        id: application.id,
        ...application,
      } as Application);
    });

    return applications;
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
      .select("*")
      .eq("creator_id", creatorId);

    if (error) throw error;

    const applications: Application[] = [];
    data.forEach((application) => {
      applications.push({
        id: application.id,
        ...application,
      } as Application);
    });

    return applications;
  } catch (error) {
    console.error("アプリケーション取得エラー:", error);
    throw error;
  }
}
