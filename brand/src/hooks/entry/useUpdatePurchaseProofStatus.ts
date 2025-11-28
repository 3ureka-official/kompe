import { useMutation } from "@tanstack/react-query";
import {
  updatePurchaseProofStatus,
  reuploadPurchaseProof,
} from "@/services/applicationService";

type UpdatePurchaseProofStatusParams = {
  applicationId: string;
  action: "APPROVE" | "REJECT";
  comment?: string | null;
};

export function useUpdatePurchaseProofStatus() {
  return useMutation({
    mutationFn: ({
      applicationId,
      action,
      comment,
    }: UpdatePurchaseProofStatusParams) =>
      updatePurchaseProofStatus(applicationId, action, comment),
  });
}

type ReuploadPurchaseProofParams = {
  applicationId: string;
  purchaseProofImage: File;
};

export function useReuploadPurchaseProof() {
  return useMutation({
    mutationFn: ({
      applicationId,
      purchaseProofImage,
    }: ReuploadPurchaseProofParams) =>
      reuploadPurchaseProof(applicationId, purchaseProofImage),
  });
}
