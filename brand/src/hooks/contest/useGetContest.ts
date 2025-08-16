import { useQuery } from "@tanstack/react-query";
import { getContest } from "@/services/contestService";
import { Contest } from "@/types/Contest";

type UseGetContest = {
  getContestQuery: {
    data: Contest | undefined;
    isPending: boolean;
    refetch: () => void;
  };
};

export function useGetContest(contestId: string): UseGetContest {
  const getContestQuery = useQuery({
    queryKey: ["contests", contestId],
    queryFn: () => getContest(contestId),
  });

  return { getContestQuery };
}
