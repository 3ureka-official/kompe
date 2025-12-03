import { useQuery } from "@tanstack/react-query";
import { getContest } from "@/services/supabase/contestService";

export function useGetContest(contestId: string, brandId: string) {
  return useQuery({
    queryKey: ["contests", contestId],
    queryFn: () => getContest(contestId, brandId),
    enabled: !!contestId && !!brandId,
    retry: 2,
  });
}
