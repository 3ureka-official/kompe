import { useQuery } from "@tanstack/react-query";
import { getTikTokMetricsAndUpdate } from "@/services/supabase/videoService";

export function useGetContestEngage(contestId: string, brandId: string) {
  return useQuery({
    queryKey: ["contests", contestId, "engage"],
    queryFn: async () => {
      const result = await getTikTokMetricsAndUpdate(contestId);
      return result;
    },
    enabled: !!contestId && !!brandId,
    retry: 2,
  });
}
