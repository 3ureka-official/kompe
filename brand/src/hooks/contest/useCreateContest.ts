import { useMutation } from "@tanstack/react-query";
import { createContest } from "@/services/contestService";
import { Contest } from "@/types/Contest";

export function useCreateContest() {
  return useMutation({
    mutationFn: ({
      brandId,
      contestId,
      contestData,
      prizeDistribution,
    }: {
      brandId: string;
      contestId: string;
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
      >;
      prizeDistribution?: number[];
    }) => createContest(brandId, contestId, contestData, prizeDistribution),

    onError: (error: Error) => {
      alert(`コンテスト作成に失敗しました：${error.message}`);
    },
  });
}
