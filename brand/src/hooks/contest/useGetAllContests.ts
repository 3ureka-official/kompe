import { useQuery } from "@tanstack/react-query";
import { getAllContests } from "@/services/contestService";

export function useGetAllContests(brandId: string) {
  return useQuery({
    queryKey: ["contests"],
    queryFn: () => getAllContests(brandId),
    enabled: !!brandId,
    retry: 2,
  });
}
