import { useQuery } from "@tanstack/react-query";
import { getAllContests } from "@/services/contestService";
import { Contest } from "@/types/Contest";

type UseGetContest = {
  getAllContestsQuery: { data: Contest[] | undefined; isPending: boolean };
};

export function useGetContest(): UseGetContest {
  const getAllContestsQuery = useQuery({
    queryKey: ["contests"],
    queryFn: () => getAllContests(),
  });

  return { getAllContestsQuery };
}
