import { useMutation } from "@tanstack/react-query";
import { upsertContestTransferUnique } from "@/services/contestTransferService";
import { ContestTransfer } from "@/types/ContestTransfer";

export function useCreateContestTransfer() {
  return useMutation({
    mutationFn: (transfer: Omit<ContestTransfer, "id" | "created_at">) =>
      upsertContestTransferUnique(transfer),

    onError: (error: Error) => {
      alert(`コンテスト更新に失敗しました：${error.message}`);
    },
  });
}
