import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/services/stripe/checkoutService";

export const useCreateCheckoutSession = () =>
  useMutation({
    mutationFn: ({
      contestId,
      originPath,
    }: {
      contestId: string;
      originPath: string;
    }) => createCheckoutSession(contestId, originPath),
  });
