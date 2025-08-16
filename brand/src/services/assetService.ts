import supabase from "@/lib/supabase";
import { AssetItem } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";

/**
 * アセットの差分更新
 * - 既存にあって新しいデータにないもの: 削除
 * - 新しいデータにあるもの: 追加
 * @param assetsData 新しいアセットデータ
 * @param contestId コンテストID
 * @param brandId ブランドID
 */
export const updateAssets = async (
  assetsData: Omit<
    AssetItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  try {
    const { error: deleteError } = await supabase
      .from("contests_assets")
      .delete()
      .eq("contest_id", contestId);

    if (deleteError) {
      throw new Error(`既存アセット削除エラー: ${deleteError.message}`);
    }

    if (assetsData.length > 0) {
      await createAssets(assetsData, contestId, brandId);
    }
  } catch (error) {
    console.error("アセット更新エラー:", error);
    throw error;
  }
};

/**
 * 複数のアセットを作成
 * @param assetsData アセットデータ配列
 * @param contestId コンテストID
 */
export const createAssets = async (
  assetsData: Omit<
    AssetItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  const insertData = assetsData.map((assetData) => ({
    id: uuidv4(),
    contest_id: contestId,
    brand_id: brandId,
    file_url: assetData.file_url,
    url: assetData.url,
    description: assetData.description,
  }));

  const { error } = await supabase.from("contests_assets").insert(insertData);

  if (error) {
    throw new Error(`アセット作成エラー: ${error.message}`);
  }
};

export const getAssets = async (contestId: string): Promise<AssetItem[]> => {
  const { data, error } = await supabase
    .from("contests_assets")
    .select("*")
    .eq("contest_id", contestId);

  if (error) {
    throw new Error(`アセット取得エラー: ${error.message}`);
  }

  return data as AssetItem[];
};

/**
 * コンテストの全アセットを削除
 * @param contestId コンテストID
 */
export const deleteAllAssets = async (contestId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("contests_assets")
      .delete()
      .eq("contest_id", contestId);

    if (error) {
      throw new Error(`全アセット削除エラー: ${error.message}`);
    }
  } catch (error) {
    console.error("全アセット削除エラー:", error);
    throw error;
  }
};
