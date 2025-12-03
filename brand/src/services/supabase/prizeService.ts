import { supabase } from "@/lib/supabase";
import { ContestPrize } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";

/**
 * コンテストの賞金を更新
 * - 既存の賞金レコードを削除
 * - 新しい賞金レコードを作成
 * @param prizeDistribution 賞金配分の配列（例: [10000, 5000, 3000]）
 * @param contestId コンテストID
 */
export const updateContestPrizes = async (
  prizeDistribution: number[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  try {
    const { error: deleteError } = await supabase
      .from("contest_prizes")
      .delete()
      .eq("contest_id", contestId);

    if (deleteError) {
      throw new Error(`既存賞金削除エラー: ${deleteError.message}`);
    }

    if (prizeDistribution.length > 0) {
      await createContestPrizes(prizeDistribution, contestId, brandId);
    }
  } catch (error) {
    console.error("賞金更新エラー:", error);
    throw error;
  }
};

/**
 * 複数の賞金レコードを作成
 * @param prizeDistribution 賞金配分の配列（例: [10000, 5000, 3000]）
 * @param contestId コンテストID
 */
export const createContestPrizes = async (
  prizeDistribution: number[],
  contestId: string,
  brandId: string,
): Promise<void> => {
  const insertData = prizeDistribution
    .map((amount, index) => ({
      id: uuidv4(),
      contest_id: contestId,
      rank: index + 1,
      amount: amount,
      brand_id: brandId,
    }))
    .filter((prize) => prize.amount > 0); // 0円の賞金は除外

  if (insertData.length === 0) {
    return;
  }

  const { error } = await supabase.from("contest_prizes").insert(insertData);

  if (error) {
    throw new Error(`賞金作成エラー: ${error.message}`);
  }
};

/**
 * コンテストの賞金レコードを取得
 * @param contestId コンテストID
 * @returns 賞金レコードの配列（rank順にソート）
 */
export const getContestPrizes = async (
  contestId: string,
): Promise<ContestPrize[]> => {
  const { data, error } = await supabase
    .from("contest_prizes")
    .select("*")
    .eq("contest_id", contestId)
    .order("rank", { ascending: true });

  if (error) {
    throw new Error(`賞金取得エラー: ${error.message}`);
  }

  return data as ContestPrize[];
};

/**
 * コンテストの全賞金レコードを削除
 * @param contestId コンテストID
 */
export const deleteContestPrizes = async (contestId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("contest_prizes")
      .delete()
      .eq("contest_id", contestId);

    if (error) {
      throw new Error(`全賞金削除エラー: ${error.message}`);
    }
  } catch (error) {
    console.error("全賞金削除エラー:", error);
    throw error;
  }
};

/**
 * 賞金配分の配列から総賞金額を計算
 * @param prizeDistribution 賞金配分の配列
 * @returns 総賞金額
 */
export const calculatePrizePool = (prizeDistribution: number[]): number => {
  return prizeDistribution.reduce((sum, amount) => sum + amount, 0);
};
