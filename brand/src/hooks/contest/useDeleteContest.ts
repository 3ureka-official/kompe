import { useMutation } from "@tanstack/react-query";
import { deleteContest } from "@/services/contestService";

export function useDeleteContest() {
  return useMutation({
    mutationFn: ({ contestId }: { contestId: string }) =>
      deleteContest(contestId),
    onSuccess: () => {
      alert("コンテストを削除しました");
    },
    onError: (error: Error) => {
      alert(`コンテスト削除に失敗しました：${error.message}`);
    },
  });
}
