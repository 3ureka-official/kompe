import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/services/stripe/checkoutService";

export const useCreateCheckoutSession = () =>
  useMutation({
    mutationFn: ({
      contestId,
      amountJpy,
    }: {
      contestId: string;
      amountJpy: number;
    }) => createCheckoutSession(contestId, amountJpy),
  });
