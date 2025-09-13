import { useMutation } from "@tanstack/react-query";
import { createContestTransfer } from "@/services/stripeService";

export const useCreateContestTransfer = () =>
  useMutation({
    mutationFn: ({
      contestId,
      applicationId,
      creatorId,
    }: {
      contestId: string;
      applicationId: string;
      creatorId: string;
    }) => createContestTransfer(contestId, applicationId, creatorId),
  });
