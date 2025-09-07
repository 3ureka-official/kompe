import { useQuery } from "@tanstack/react-query";
import { getContestPayment } from "@/services/contestPaymentService";

export function useGetContestPayment(contestId: string) {
  return useQuery({
    queryKey: ["payments", contestId],
    queryFn: () => getContestPayment(contestId),
    enabled: contestId !== "",
  });
}
