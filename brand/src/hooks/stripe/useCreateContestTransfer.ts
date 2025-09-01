import { useMutation } from "@tanstack/react-query";
import { createContestTransfer } from "@/services/stripeService";

export const useCreateContestTransfer = () =>
  useMutation({
    mutationFn: ({
      contestId,
      applicationId,
      creatorId,
      amountJpy,
    }: {
      contestId: string;
      applicationId: string;
      creatorId: string;
      amountJpy: number;
    }) => createContestTransfer(contestId, applicationId, creatorId, amountJpy),
  });
