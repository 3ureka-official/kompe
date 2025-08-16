import { useQuery } from "@tanstack/react-query";
import { getAllContests } from "@/services/contestService";
import { Contest } from "@/types/Contest";

type UseGetAllContests = {
  allContestsQuery: {
    data: Contest[] | undefined;
    isPending: boolean;
    refetch: () => void;
  };
};

export function useGetAllContests(): UseGetAllContests {
  const allContestsQuery = useQuery({
    queryKey: ["contests"],
    queryFn: () => getAllContests(),
  });

  return { allContestsQuery };
}
