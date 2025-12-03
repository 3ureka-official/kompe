import { useQuery } from "@tanstack/react-query";
import { getApplicationsByContestId } from "@/services/supabase/applicationService";
import { Application } from "@/types/Application";

type UseGetApplication = {
  getApplicationQuery: {
    data: Application[] | undefined;
    isPending: boolean;
    refetch: () => void;
  };
};

export function useGetApplication(contestId: string): UseGetApplication {
  const getApplicationQuery = useQuery({
    queryKey: ["applications", contestId],
    queryFn: () => getApplicationsByContestId(contestId),
  });

  return { getApplicationQuery };
}
