import { useMutation } from "@tanstack/react-query";
import { deleteContest } from "@/services/supabase/contestService";

export function useDeleteContest() {
  return useMutation({
    mutationFn: ({ contestId }: { contestId: string }) =>
      deleteContest(contestId),
    onError: (error: Error) => {
      alert(`コンテスト削除に失敗しました：${error.message}`);
    },
  });
}
