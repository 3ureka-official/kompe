import { useMutation } from "@tanstack/react-query";
import { updateBrand } from "@/services/brandService";
import { Brand } from "@/types/Brand";

export function useUpdateBrand() {
  return useMutation({
    mutationFn: ({
      brandId,
      brandData,
      logoFile,
    }: {
      brandId: string;
      brandData: Omit<Brand, "id" | "created_at">;
      logoFile: File | null;
    }) => updateBrand(brandId, brandData, logoFile),

    onError: (error: Error) => {
      alert(`ブランド作成に失敗しました：${error.message}`);
    },
  });
}
