"use client";

import { useState, useEffect, useCallback } from "react";
import { Contest } from "@/types/contest";
import { getContestById } from "@/lib/api/contests";

interface UseContestParams {
  id: string;
  autoFetch?: boolean;
}

interface UseContestReturn {
  contest: Contest | null;
  loading: boolean;
  error: string | null;

  // アクション
  fetchContest: () => Promise<void>;
  reset: () => void;
}

export function useContest(params: UseContestParams): UseContestReturn {
  const { id, autoFetch = true } = params;

  // 状態管理
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // コンテスト取得関数
  const fetchContest = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const contestData = await getContestById(id);
      setContest(contestData);

      if (!contestData) {
        setError("コンテストが見つかりませんでした");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "コンテストの取得に失敗しました",
      );
      setContest(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // リセット
  const reset = useCallback(() => {
    setContest(null);
    setError(null);
  }, []);

  // 初回読み込みとID変更時の再読み込み
  useEffect(() => {
    if (autoFetch && id) {
      fetchContest();
    }
  }, [fetchContest, autoFetch, id]);

  return {
    contest,
    loading,
    error,
    fetchContest,
    reset,
  };
}
