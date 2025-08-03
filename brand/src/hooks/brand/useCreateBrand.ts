import { useMutation } from "@tanstack/react-query";
import { createBrand } from "@/services/brandService";
import { Brand } from "@/types/Brand";

export function useCreateBrand() {
  return useMutation({
    mutationFn: ({
      userId,
      brandData,
      logoFile,
    }: {
      userId: string;
      brandData: Omit<Brand, "id" | "created_at">;
      logoFile: File | null;
    }) => createBrand(userId, brandData, logoFile),

    onError: (error: Error) => {
      alert(`ブランド作成に失敗しました：${error.message}`);
    },
  });
}
