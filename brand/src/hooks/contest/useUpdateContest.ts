import { useMutation } from "@tanstack/react-query";
import { updateContest } from "@/services/contestService";
import { AssetItem, Contest, InspirationItem } from "@/types/Contest";

export function useUpdateContest() {
  return useMutation({
    mutationFn: ({
      brandId,
      contestId,
      contestData,
      assetsData,
      inspirationData,
    }: {
      brandId: string;
      contestId: string;
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
      >;
      assetsData: Omit<
        AssetItem,
        "id" | "created_at" | "brand_id" | "contest_id"
      >[];
      inspirationData: Omit<
        InspirationItem,
        "id" | "created_at" | "brand_id" | "contest_id"
      >[];
    }) =>
      updateContest(
        brandId,
        contestId,
        contestData,
        assetsData,
        inspirationData,
      ),

    onError: (error: Error) => {
      alert(`コンテスト更新に失敗しました：${error.message}`);
    },
  });
}
