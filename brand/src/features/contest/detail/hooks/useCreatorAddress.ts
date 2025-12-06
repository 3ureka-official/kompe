import { useQuery } from "@tanstack/react-query";
import { getCreatorAddressByCreatorId } from "@/services/supabase/creatorAddressService";

/**
 * クリエイターの住所を取得
 */
export function useGetCreatorAddress(creatorId: string | undefined) {
  return useQuery({
    queryKey: ["creatorAddress", creatorId],
    queryFn: () => getCreatorAddressByCreatorId(creatorId!),
    enabled: !!creatorId,
  });
}
