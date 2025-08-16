import { useMutation } from "@tanstack/react-query";
import { deleteFiles } from "@/lib/storage";

export function useDeleteFiles() {
  return useMutation({
    mutationFn: ({ bucket, paths }: { bucket: string; paths: string[] }) =>
      deleteFiles(bucket, paths),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: Error) => {
      alert(`コンテスト作成に失敗しました：${error.message}`);
    },
  });
}
