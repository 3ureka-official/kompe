import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/lib/storage";

export function useUploadFile() {
  return useMutation({
    mutationFn: ({
      bucket,
      path,
      file,
    }: {
      bucket: string;
      path: string;
      file: File;
    }) => uploadFile(bucket, path, file),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: Error) => {
      alert(`コンテスト作成に失敗しました：${error.message}`);
    },
  });
}
