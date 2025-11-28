import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSampleProductsByContestId,
  createSampleProducts,
  updateSampleProducts,
  deleteSampleProduct,
} from "@/services/sampleProductService";
import { SampleProduct } from "@/types/SampleProduct";

/**
 * コンテストIDに紐づく試供品を取得
 */
export function useGetSampleProducts(contestId: string) {
  return useQuery({
    queryKey: ["sampleProducts", contestId],
    queryFn: () => getSampleProductsByContestId(contestId),
    enabled: !!contestId,
  });
}

/**
 * 試供品を作成
 */
export function useCreateSampleProducts() {
  return useMutation({
    mutationFn: ({
      contestId,
      samplesData,
    }: {
      contestId: string;
      samplesData: Omit<SampleProduct, "id" | "contest_id" | "created_at">[];
    }) => createSampleProducts(contestId, samplesData),
  });
}

/**
 * 試供品を一括更新
 */
export function useUpdateSampleProducts() {
  return useMutation({
    mutationFn: ({
      contestId,
      samplesData,
    }: {
      contestId: string;
      samplesData: Omit<SampleProduct, "id" | "contest_id" | "created_at">[];
    }) => updateSampleProducts(contestId, samplesData),
  });
}

/**
 * 試供品を削除
 */
export function useDeleteSampleProduct() {
  return useMutation({
    mutationFn: (sampleId: string) => deleteSampleProduct(sampleId),
  });
}
