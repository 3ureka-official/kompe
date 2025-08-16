import supabase from "@/lib/supabase";
import { InspirationItem } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";

/**
 * アセットの差分更新
 * - 既存にあって新しいデータにないもの: 削除
 * - 新しいデータにあるもの: 追加
 * @param assetsData 新しいアセットデータ
 * @param contestId コンテストID
 * @param brandId ブランドID
 */
export const updateInspiration = async (
  inspirationData: Omit<
    InspirationItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  try {
    const { error: deleteError } = await supabase
      .from("contests_inspirations")
      .delete()
      .eq("contest_id", contestId);

    if (deleteError) {
      throw new Error(
        `既存インスピレーション削除エラー: ${deleteError.message}`,
      );
    }

    await createInspiration(inspirationData, contestId, brandId);
  } catch (error) {
    console.error("インスピレーション更新エラー:", error);
    throw error;
  }
};

/**
 * 複数のアセットを作成
 * @param assetsData アセットデータ配列
 * @param contestId コンテストID
 */
export const createInspiration = async (
  inspirationData: Omit<
    InspirationItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  const insertData = inspirationData.map((inspirationData) => ({
    id: uuidv4(),
    contest_id: contestId,
    brand_id: brandId,
    url: inspirationData.url,
    description: inspirationData.description,
  }));

  const { error } = await supabase
    .from("contests_inspirations")
    .insert(insertData);

  if (error) {
    throw new Error(`インスピレーション作成エラー: ${error.message}`);
  }
};

export const getInspirations = async (
  contestId: string,
): Promise<InspirationItem[]> => {
  const { data, error } = await supabase
    .from("contests_inspirations")
    .select("*")
    .eq("contest_id", contestId);

  if (error) {
    throw new Error(`インスピレーション取得エラー: ${error.message}`);
  }

  return data as InspirationItem[];
};

/**
 * コンテストの全アセットを削除
 * @param contestId コンテストID
 */
export const deleteAllInspiration = async (
  contestId: string,
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("contests_inspirations")
      .delete()
      .eq("contest_id", contestId);

    if (error) {
      throw new Error(`全インスピレーション削除エラー: ${error.message}`);
    }
  } catch (error) {
    console.error("全インスピレーション削除エラー:", error);
    throw error;
  }
};
