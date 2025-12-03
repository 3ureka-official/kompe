import { useState, useCallback } from "react";
import { ContestCreateFormData } from "@/features/contest/form/schemas/createContestSchema";
import { ContestFormDefaultValues } from "@/features/contest/common/constants/contest.constant";
import { getContest } from "@/services/supabase/contestService";
import { getAssets } from "@/services/supabase/assetService";
import { getInspirations } from "@/services/supabase/inspirationService";

function useContestInit(
  setData: (data: ContestCreateFormData, contestId?: string) => void,
  hasStoredData: (contestId?: string) => boolean,
) {
  const [contestId, setContestId] = useState<string | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const initContest = useCallback(
    async (brandId: string, paramContestId?: string) => {
      setIsCreating(true);

      try {
        // 編集時: DBからデータを取得してstateに設定
        if (paramContestId) {
          // sessionStorageに同じcontestIdのデータがある場合はDB取得をスキップ
          if (hasStoredData(paramContestId)) {
            setContestId(paramContestId);
            return;
          }

          setContestId(paramContestId);

          try {
            // コンテストデータを取得
            const contest = await getContest(paramContestId, brandId);

            // アセットとインスピレーションを取得
            const [assets, inspirations] = await Promise.all([
              getAssets(paramContestId),
              getInspirations(paramContestId),
            ]);

            // contest_prizesからprize_distributionとprize_poolを再構築
            const contestPrizes = contest.contest_prizes || [];
            const maxRank =
              contestPrizes.length > 0
                ? Math.max(...contestPrizes.map((p) => p.rank))
                : 0;

            const prizeDistribution = Array(maxRank)
              .fill(0)
              .map((_, index) => {
                const prize = contestPrizes[index];
                return prize && prize.rank === index + 1
                  ? Number(prize.amount)
                  : 0;
              });

            const prizePool = prizeDistribution.reduce(
              (sum, amount) => sum + amount,
              0,
            );

            // フォームデータを構築
            const formData: ContestCreateFormData = {
              title: contest.title || "",
              thumbnail_url: contest.thumbnail_url || "",
              description: contest.description || "",
              requirements: contest.requirements || "",
              entry_start_date: contest.entry_start_date
                ? new Date(contest.entry_start_date)
                : new Date(),
              entry_end_date: contest.entry_end_date
                ? new Date(contest.entry_end_date)
                : new Date(),
              video_production_start_date: contest.video_production_start_date
                ? new Date(contest.video_production_start_date)
                : new Date(),
              video_production_end_date: contest.video_production_end_date
                ? new Date(contest.video_production_end_date)
                : new Date(),
              contest_start_date: contest.contest_start_date
                ? new Date(contest.contest_start_date)
                : new Date(),
              contest_end_date: contest.contest_end_date
                ? new Date(contest.contest_end_date)
                : new Date(),
              prize_pool: prizePool,
              prize_distribution: prizeDistribution,
              requires_purchase_proof: contest.requires_purchase_proof || false,
              purchase_product_name: contest.purchase_product_name || null,
              purchase_product_url: contest.purchase_product_url || null,
              purchase_description: contest.purchase_description || null,
              has_sample: contest.has_sample || false,
              sample_product_name: contest.sample_product_name || null,
              sample_rental_or_purchase:
                contest.sample_rental_or_purchase || null,
              sample_price_per_creator:
                contest.sample_price_per_creator || null,
              sample_return_postal_code:
                contest.sample_return_postal_code || null,
              sample_return_prefecture:
                contest.sample_return_prefecture || null,
              sample_return_city: contest.sample_return_city || null,
              sample_return_address_line:
                contest.sample_return_address_line || null,
              assets: assets.map((asset) => ({
                id: asset.id,
                url: asset.url || "",
                description: asset.description || "",
              })),
              inspirations: inspirations.map((inspiration) => ({
                id: inspiration.id,
                url: inspiration.url || "",
                description: inspiration.description || "",
              })),
            };

            // stateに設定（useContestFormStateのsetDataがsessionStorageにも保存する）
            setData(formData, paramContestId);
          } catch (error) {
            console.error("Failed to load contest data:", error);
            throw error;
          }
        } else {
          // 新規作成時: sessionStorageにデータがあれば初期化しない
          if (hasStoredData()) {
            // sessionStorageから既に読み込まれているので何もしない
            return;
          }
          // sessionStorageにデータがない場合のみデフォルト値で初期化
          setData(ContestFormDefaultValues);
        }
      } finally {
        setIsCreating(false);
      }
    },
    [setData, hasStoredData],
  );

  return {
    contestId,
    setContestId,
    initContest,
    isCreating,
  };
}

export { useContestInit };
