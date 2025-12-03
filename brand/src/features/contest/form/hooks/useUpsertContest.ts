import { useCallback } from "react";
import { useUpdateContest } from "@/features/contest/common/hooks/useUpdateContest";
import { useCreateContest } from "@/features/contest/form/hooks/useCreateContest";
import { AssetItem, InspirationItem, Contest } from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";

type UpsertContestParams = {
  brandId: string;
  contestId: string | undefined;
  contestData: Omit<
    Contest,
    | "id"
    | "created_at"
    | "thumbnail_url"
    | "status"
    | "brand_id"
    | "videos"
    | "views"
    | "likes"
    | "comments"
    | "shares"
    | "updated_engagement_at"
  >;
  assetsData: Omit<
    AssetItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[];
  inspirationData: Omit<
    InspirationItem,
    "id" | "created_at" | "brand_id" | "contest_id"
  >[];
  prizeDistribution?: number[];
  onSuccess?: (contestId: string) => void;
  onError?: () => void;
};

function useUpsertContest() {
  const { mutate: updateContest, isPending: isUpdating } = useUpdateContest();
  const { mutate: createContest, isPending: isCreating } = useCreateContest();

  const upsertContest = useCallback(
    ({
      brandId,
      contestId,
      contestData,
      assetsData,
      inspirationData,
      prizeDistribution,
      onSuccess,
      onError,
    }: UpsertContestParams) => {
      if (contestId) {
        // 編集時: updateContestを使用
        updateContest(
          {
            brandId,
            contestId,
            contestData,
            assetsData,
            inspirationData,
            prizeDistribution,
          },
          {
            onSuccess: () => {
              onSuccess?.(contestId);
            },
            onError,
          },
        );
      } else {
        // 新規作成時: IDを生成してcreateContestを使用
        const newContestId = uuidv4();
        createContest(
          {
            brandId,
            contestId: newContestId,
            contestData: contestData as Omit<
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
            prizeDistribution,
          },
          {
            onSuccess: async () => {
              // 成功後、アセットとインスピレーションを更新（createContestでは処理されないため）
              updateContest(
                {
                  brandId,
                  contestId: newContestId,
                  contestData,
                  assetsData,
                  inspirationData,
                  prizeDistribution,
                },
                {
                  onSuccess: () => {
                    onSuccess?.(newContestId);
                  },
                  onError,
                },
              );
            },
            onError,
          },
        );
      }
    },
    [updateContest, createContest],
  );

  return {
    upsertContest,
    isPending: isUpdating || isCreating,
  };
}

export { useUpsertContest };
