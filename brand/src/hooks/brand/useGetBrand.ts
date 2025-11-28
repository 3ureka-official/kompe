import { useMutation } from "@tanstack/react-query";
import { getUserBrand } from "@/services/brandService";

export function useGetUserBrand() {
  return useMutation({
    mutationFn: (brandId: string) => getUserBrand(brandId),
  });
}
