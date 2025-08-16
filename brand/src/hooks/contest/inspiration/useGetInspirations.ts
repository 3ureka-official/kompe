import { useQuery } from "@tanstack/react-query";
import { InspirationItem } from "@/types/Contest";
import { getInspirations } from "@/services/inspirationService";

type UseGetInspirations = {
  getInspirationsQuery: {
    data: InspirationItem[] | undefined;
    isPending: boolean;
    refetch: () => void;
  };
};

export function useGetInspirations(contestId: string): UseGetInspirations {
  const getInspirationsQuery = useQuery({
    queryKey: ["inspirations", contestId],
    queryFn: () => getInspirations(contestId),
  });

  return { getInspirationsQuery };
}
