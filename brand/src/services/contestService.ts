import supabase from "@/lib/supabase";
import { Contest, InspirationItem, AssetItem } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";
import { updateAssets } from "./assetService";
import { updateInspiration } from "./inspirationService";

/**
 * コンテストを作成
 * @param brandId ブランドID
 * @param contestId コンテストID
 * @param contestData コンテストデータ
 * @param thumbnailFile サムネイルファイル
 * @param assetsData アセット
 * @param inspirationData インスピレーション
 * @returns 作成されたコンテストのID
 */

export const createContest = async (
  brandId: string,
  contestId: string,
  contestData: Omit<
    Contest,
    | "id"
    | "brand_id"
    | "created_at"
    | "thumbnail_url"
    | "is_draft"
    | "videos"
    | "views"
    | "likes"
    | "comments"
    | "shares"
  >,
): Promise<string> => {
  try {
    const { data: contest, error } = await supabase
      .from("contests")
      .insert({
        ...contestData,
        id: contestId,
        brand_id: brandId,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return contest.id;
  } catch (error) {
    console.error("コンテスト作成エラー:", error);
    throw error;
  }
};

export const getAllContests = async (): Promise<Contest[]> => {
  try {
    const { data, error } = await supabase.from("contests").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as Contest[];
  } catch (error) {
    console.error("コンテスト取得エラー:", error);
    throw error;
  }
};

export const updateContest = async (
  brandId: string,
  contestId: string,
  contestData: Omit<
    Contest,
    | "id"
    | "created_at"
    | "thumbnail_url"
    | "is_draft"
    | "brand_id"
    | "videos"
    | "views"
    | "likes"
    | "comments"
    | "shares"
  >,
  assetsData: Omit<
    AssetItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  inspirationData: Omit<
    InspirationItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
): Promise<void> => {
  try {
    console.log(contestData);
    console.log(contestId);
    const { error } = await supabase
      .from("contests")
      .update(contestData)
      .eq("id", contestId);

    if (error) {
      throw new Error(error.message);
    }

    updateAssets(assetsData, contestId, brandId);

    updateInspiration(inspirationData, contestId, brandId);
  } catch (error) {
    console.error("コンテスト更新エラー:", error);
    throw error;
  }
};
