import { useQuery } from "@tanstack/react-query";
import { AssetItem } from "@/types/Contest";
import { getAssets } from "@/services/supabase/assetService";

type UseGetAssets = {
  getAssetsQuery: {
    data: AssetItem[] | undefined;
    isPending: boolean;
    refetch: () => void;
  };
};

export function useGetAssets(contestId: string): UseGetAssets {
  const getAssetsQuery = useQuery({
    queryKey: ["assets", contestId],
    queryFn: () => getAssets(contestId),
    enabled: !!contestId,
  });

  return { getAssetsQuery };
}
