import { useMutation } from "@tanstack/react-query";
import { createContestTransfer } from "@/services/stripeService";

export const useCreateContestTransfer = () =>
  useMutation({
    mutationFn: ({
      contestId,
      applicationId,
    }: {
      contestId: string;
      applicationId: string;
    }) => createContestTransfer(contestId, applicationId),
  });
