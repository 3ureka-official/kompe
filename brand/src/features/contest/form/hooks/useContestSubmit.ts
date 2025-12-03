import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUpsertContest } from "@/features/contest/form/hooks/useUpsertContest";
import { useCreateCheckoutSession } from "@/features/contest/form/hooks/useCreateCheckoutSession";
import { ContestCreateFormData } from "@/features/contest/form/schemas/createContestSchema";
import { AssetItem, InspirationItem } from "@/types/Contest";
import { Brand } from "@/types/Brand";

function useContestSubmit(
  data: Partial<ContestCreateFormData>,
  brand: Brand | null,
  contestId: string | undefined,
  clearInitFlag?: () => void,
) {
  const router = useRouter();
  const { upsertContest, isPending } = useUpsertContest();
  const { mutate: createCheckoutSession } = useCreateCheckoutSession();

  const submit = useCallback(
    async (isDraft: boolean, newData: Partial<ContestCreateFormData>) => {
      const mergedData = { ...data, ...newData };

      const assetsData: Omit<
        AssetItem,
        "id" | "created_at" | "brand_id" | "contest_id"
      >[] =
        mergedData.assets?.map((asset) => ({
          url: asset.url || "",
          description: asset.description || "",
        })) || [];

      const inspirationData: Omit<
        InspirationItem,
        "id" | "created_at" | "brand_id" | "contest_id"
      >[] =
        mergedData.inspirations?.map((inspiration) => ({
          url: inspiration.url || "",
          description: inspiration.description || "",
        })) || [];

      // prize_pool、prize_distribution、contest_prizes、assets、inspirations、sample、samplesはcontestsテーブルには保存しない
      const excludeKeys = [
        "prize_pool",
        "prize_distribution",
        "contest_prizes",
        "assets",
        "inspirations",
      ] as const;
      const restMergedData = Object.fromEntries(
        Object.entries(mergedData).filter(
          ([key]) => !excludeKeys.includes(key as (typeof excludeKeys)[number]),
        ),
      ) as Partial<Omit<ContestCreateFormData, (typeof excludeKeys)[number]>>;

      const completeData = {
        title: restMergedData.title || "",
        description: restMergedData.description || "",
        requirements: restMergedData.requirements || "",
        entry_start_date: restMergedData.entry_start_date || "",
        entry_end_date: restMergedData.entry_end_date || "",
        video_production_start_date:
          restMergedData.video_production_start_date || "",
        video_production_end_date:
          restMergedData.video_production_end_date || "",
        contest_start_date: restMergedData.contest_start_date || "",
        contest_end_date: restMergedData.contest_end_date || "",
        thumbnail_url: restMergedData.thumbnail_url || "",
        requires_purchase_proof:
          restMergedData.requires_purchase_proof || false,
        purchase_product_name: restMergedData.purchase_product_name || null,
        purchase_product_url: restMergedData.purchase_product_url || null,
        purchase_description: restMergedData.purchase_description || null,
        has_sample: restMergedData.has_sample || false,
        sample_product_name: restMergedData.sample_product_name || null,
        sample_rental_or_purchase:
          (restMergedData.sample_rental_or_purchase as
            | "RENTAL"
            | "PURCHASE"
            | null) || null,
        sample_price_per_creator:
          restMergedData.sample_price_per_creator || null,
        sample_return_postal_code:
          restMergedData.sample_return_postal_code || null,
        sample_return_prefecture:
          restMergedData.sample_return_prefecture || null,
        sample_return_city: restMergedData.sample_return_city || null,
        sample_return_address_line:
          restMergedData.sample_return_address_line || null,
        is_draft: isDraft,
      };

      const prizeDistribution = mergedData.prize_distribution || [];

      if (!brand?.id) return;

      const onSuccess = async (resultContestId: string) => {
        clearInitFlag?.();
        if (!isDraft) {
          const prizePool = prizeDistribution.reduce(
            (sum, amount) => sum + amount,
            0,
          );
          createCheckoutSession(
            { contestId: resultContestId, amountJpy: prizePool },
            {
              onSuccess: (data) => {
                window.location.href = data.url;
              },
            },
          );
        } else {
          router.push("/contests");
        }
      };

      const onError = () => {
        clearInitFlag?.();
      };

      upsertContest({
        brandId: brand.id,
        contestId: contestId,
        contestData: completeData,
        assetsData,
        inspirationData,
        prizeDistribution,
        onSuccess,
        onError,
      });
    },
    [
      data,
      brand,
      contestId,
      upsertContest,
      createCheckoutSession,
      router,
      clearInitFlag,
    ],
  );

  return {
    submit,
    isUpdating: isPending,
  };
}

export { useContestSubmit };
