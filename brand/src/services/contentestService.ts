import supabase from "@/lib/supabase";
import { Contest, FormAssetItem, InspirationItem } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/lib/storage";
import { createAsset } from "./assetService";
import { createInspiration } from "./inspirationService";

/**
 * コンテストを作成
 * @param brandId ブランドID
 * @param contestData コンテストデータ
 * @param thumbnailFile サムネイルファイル
 * @param assetsData アセット
 * @param inspirationData インスピレーション
 * @returns 作成されたコンテストのID
 */

export const createContest = async (
  brandId: string,
  contestData: Omit<
    Contest,
    "id" | "created_at" | "status" | "brandId" | "thumbnail_url"
  >,
  thumbnailFile: File,
  assetFormData: FormAssetItem[] | null,
  inspirationData:
    | Omit<InspirationItem, "id" | "created_at" | "brand_id" | "contest_id">[]
    | null,
): Promise<string> => {
  try {
    const contestId = uuidv4();

    const thumbnailUrl = await uploadFile(
      "contests",
      `${contestId}/thumbnail.png`,
      thumbnailFile,
    );

    const { data: contest, error } = await supabase
      .from("contests")
      .insert({
        ...contestData,
        id: contestId,
        brand_id: brandId,
        thumbnail_url: thumbnailUrl,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (assetFormData) {
      await createAsset(brandId, contestId, assetFormData);
    }

    if (inspirationData) {
      await createInspiration(brandId, contestId, inspirationData);
    }

    return contest.id;
  } catch (error) {
    console.error("コンテスト作成エラー:", error);
    throw error;
  }
};
