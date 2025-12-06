import { supabase } from "@/lib/supabase";
import { ContestImage } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";

/**
 * コンテスト画像の差分更新
 * @param imageUrls 新しい画像URL配列
 * @param contestId コンテストID
 * @param brandId ブランドID
 */
export const updateContestImages = async (
  imageUrls: string[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  try {
    // 既存の画像を全削除
    const { error: deleteError } = await supabase
      .from("contest_images")
      .delete()
      .eq("contest_id", contestId);

    if (deleteError) {
      throw new Error(`既存画像削除エラー: ${deleteError.message}`);
    }

    // 新しい画像を追加
    if (imageUrls.length > 0) {
      await createContestImages(imageUrls, contestId, brandId);
    }
  } catch (error) {
    console.error("コンテスト画像更新エラー:", error);
    throw error;
  }
};

/**
 * 複数の画像を作成
 * @param imageUrls 画像URL配列
 * @param contestId コンテストID
 * @param brandId ブランドID
 */
export const createContestImages = async (
  imageUrls: string[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  const insertData = imageUrls.map((url, index) => ({
    id: uuidv4(),
    contest_id: contestId,
    brand_id: brandId,
    url,
    display_order: index,
  }));

  const { error } = await supabase.from("contest_images").insert(insertData);

  if (error) {
    throw new Error(`画像作成エラー: ${error.message}`);
  }
};

/**
 * コンテストの画像を取得
 * @param contestId コンテストID
 */
export const getContestImages = async (
  contestId: string,
): Promise<ContestImage[]> => {
  const { data, error } = await supabase
    .from("contest_images")
    .select("*")
    .eq("contest_id", contestId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`画像取得エラー: ${error.message}`);
  }

  return data as ContestImage[];
};

/**
 * 単一の画像を追加
 * @param url 画像URL
 * @param contestId コンテストID
 * @param brandId ブランドID
 * @param displayOrder 表示順
 */
export const addContestImage = async (
  url: string,
  contestId: string,
  brandId: string,
  displayOrder: number,
): Promise<ContestImage> => {
  const insertData = {
    id: uuidv4(),
    contest_id: contestId,
    brand_id: brandId,
    url,
    display_order: displayOrder,
  };

  const { data, error } = await supabase
    .from("contest_images")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    throw new Error(`画像追加エラー: ${error.message}`);
  }

  return data as ContestImage;
};

/**
 * 単一の画像を削除
 * @param imageId 画像ID
 */
export const deleteContestImage = async (imageId: string): Promise<void> => {
  const { error } = await supabase
    .from("contest_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    throw new Error(`画像削除エラー: ${error.message}`);
  }
};

/**
 * コンテストの全画像を削除
 * @param contestId コンテストID
 */
export const deleteAllContestImages = async (
  contestId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("contest_images")
    .delete()
    .eq("contest_id", contestId);

  if (error) {
    throw new Error(`全画像削除エラー: ${error.message}`);
  }
};
