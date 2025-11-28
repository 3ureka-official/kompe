import { useMutation } from "@tanstack/react-query";
import { createApplication } from "@/services/applicationService";

type CreateEntryParams = {
  contestId: string;
  creatorId: string;
  tiktokUrl: string;
  comment: string | null;
  purchaseProofImage: File | null;
  requiresPurchaseProof: boolean;
};

export function useCreateEntry() {
  return useMutation({
    mutationFn: ({
      contestId,
      creatorId,
      tiktokUrl,
      comment,
      purchaseProofImage,
      requiresPurchaseProof,
    }: CreateEntryParams) =>
      createApplication(
        contestId,
        creatorId,
        tiktokUrl,
        comment,
        purchaseProofImage,
        requiresPurchaseProof,
      ),
  });
}
