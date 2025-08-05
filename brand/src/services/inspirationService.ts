import supabase from "@/lib/supabase";
import { InspirationItem } from "@/types/Contest";

/**
 * コンテストインスピレーションを作成
 * @param brandId ブランドID
 * @param contestId コンテストID
 * @param inspirationData インスピレーション
 * @returns 作成されたコンテストのID
 */

export const createInspiration = async (
  brandId: string,
  contestId: string,
  inspirationData: Omit<
    InspirationItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
): Promise<void> => {
  for (const inspiration of inspirationData) {
    try {
      const { error } = await supabase.from("contests_inspirations").insert({
        ...inspiration,
        brand_id: brandId,
        contest_id: contestId,
      });

      if (error) {
        console.error("コンテストインスピレーション作成エラー:", error.message);
      }
    } catch (error) {
      console.error("コンテストインスピレーション作成エラー:", error);
    }
  }
};
