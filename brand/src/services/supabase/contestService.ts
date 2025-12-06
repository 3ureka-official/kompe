import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  Contest,
  InspirationItem,
  AssetItem,
  ContestImage,
} from "@/types/Contest";
import { updateAssets } from "./assetService";
import { updateInspiration } from "./inspirationService";
import { updateContestPrizes } from "./prizeService";
import { updateContestImages } from "./contestImageService";
import { deleteFiles } from "@/lib/storage";
import { Application } from "@/types/Application";

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
    | "updated_engagement_at"
  >,
  prizeDistribution?: number[],
): Promise<string> => {
  try {
    // prize_pool、prize_distribution、contest_prizes、assets、inspirationsはcontestsテーブルには保存しない
    const excludeKeys = [
      "prize_pool",
      "prize_distribution",
      "contest_prizes",
      "assets",
      "inspirations",
    ] as const;
    const restContestData = Object.fromEntries(
      Object.entries(contestData).filter(
        ([key]) => !excludeKeys.includes(key as (typeof excludeKeys)[number]),
      ),
    ) as Omit<
      Contest,
      | (typeof excludeKeys)[number]
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
      | "updated_engagement_at"
    >;

    const { data: contest, error } = await supabase
      .from("contests")
      .insert({
        ...restContestData,
        id: contestId,
        brand_id: brandId,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // 賞金レコードを作成
    if (prizeDistribution && prizeDistribution.length > 0) {
      await updateContestPrizes(prizeDistribution, contestId, brandId);
    }

    return contest.id;
  } catch (error) {
    console.error("コンテスト作成エラー:", error);
    throw error;
  }
};

export const getAllContests = async (
  brandId: string,
): Promise<
  (Contest & {
    applications: Application[];
    contest_prizes?: Array<{ rank: number; amount: number }>;
  })[]
> => {
  try {
    const { data, error } = await supabase
      .from("contests")
      .select(
        "*, contest_payments(*), applications(*), contest_prizes(*), contest_images(*)",
      )
      .eq("brand_id", brandId)
      .order("contest_start_date", { ascending: false })
      .order("created_at", { ascending: false })
      .order("rank", { ascending: true, referencedTable: "contest_prizes" })
      .order("display_order", {
        ascending: true,
        referencedTable: "contest_images",
      });

    if (error) {
      throw new Error(error.message);
    }

    return data as (Contest & {
      applications: Application[];
      contest_prizes?: Array<{ rank: number; amount: number }>;
      contest_images?: ContestImage[];
    })[];
  } catch (error) {
    console.error("コンテスト取得エラー:", error);
    throw error;
  }
};

export const getContest = async (
  contestId: string,
  brandId: string,
): Promise<
  Contest & { contest_prizes?: Array<{ rank: number; amount: number }> }
> => {
  const { data, error } = await supabase
    .from("contests")
    .select("*, contest_prizes(*)")
    .eq("id", contestId)
    .eq("brand_id", brandId)
    .order("rank", { ascending: true, referencedTable: "contest_prizes" })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Contest & {
    contest_prizes?: Array<{ rank: number; amount: number }>;
  };
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
    | "updated_engagement_at"
  >,
  assetsData: Omit<
    AssetItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  inspirationData: Omit<
    InspirationItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[],
  prizeDistribution?: number[],
  imageUrls?: string[],
): Promise<void> => {
  try {
    // prize_pool、prize_distribution、contest_prizes、assets、inspirations、sample、samples、thumbnail_urlsはcontestsテーブルには保存しない
    const excludeKeys = [
      "prize_pool",
      "prize_distribution",
      "contest_prizes",
      "assets",
      "inspirations",
      "sample",
      "samples",
      "thumbnail_urls",
    ] as const;
    const restContestData = Object.fromEntries(
      Object.entries(contestData).filter(
        ([key]) => !excludeKeys.includes(key as (typeof excludeKeys)[number]),
      ),
    ) as Omit<
      Contest,
      | (typeof excludeKeys)[number]
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
      | "updated_engagement_at"
    >;

    const { error } = await supabase
      .from("contests")
      .update(restContestData)
      .eq("id", contestId);

    if (error) {
      throw new Error(error.message);
    }

    await updateAssets(assetsData, contestId, brandId);

    await updateInspiration(inspirationData, contestId, brandId);

    // 賞金レコードを更新
    if (prizeDistribution !== undefined) {
      await updateContestPrizes(prizeDistribution, contestId, brandId);
    }

    // 画像を更新
    if (imageUrls !== undefined) {
      await updateContestImages(imageUrls, contestId, brandId);
    }
  } catch (error) {
    console.error("コンテスト更新エラー:", error);
    throw error;
  }
};

/**
 * コンテストを削除
 * @param brandId ブランドID
 * @param contestId コンテストID
 * @returns 削除されたコンテストのID
 */
export const deleteContest = async (contestId: string) => {
  try {
    const { error } = await supabase
      .from("contests")
      .delete()
      .eq("id", contestId);

    if (error) {
      throw new Error(error.message);
    }

    await deleteFiles("contests", [contestId]);

    return contestId;
  } catch (error) {
    console.error("コンテスト削除エラー:", error);
    throw error;
  }
};

export const updateContestPublic = async (contestId: string) => {
  const { error } = await supabaseAdmin()
    .from("contests")
    .update({ is_draft: false })
    .eq("id", contestId);

  if (error) {
    throw new Error(error.message);
  }
};
