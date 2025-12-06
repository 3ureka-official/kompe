import { useEffect, useRef, useState, useCallback } from "react";
import { ContestPayment } from "@/types/ContestPayment";

const POLLING_INTERVAL_MS = 3000; // 3秒ごとにポーリング

interface UsePaymentPollingProps {
  visible: boolean;
  refetchContestPayment: () => Promise<{ data: ContestPayment | null }>;
  onSuccess: () => void;
  onFailed: () => void;
}

export function usePaymentPolling({
  visible,
  refetchContestPayment,
  onSuccess,
  onFailed,
}: UsePaymentPollingProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tick = useCallback(async () => {
    try {
      const res = await refetchContestPayment();
      const data = res?.data;
      const status = data?.status;

      if (status === "succeeded") {
        onSuccess();
        return true; // 完了
      }
      if (status === "failed") {
        setErrorMsg(
          "決済に失敗しました。カード会社の認証や残高をご確認ください。",
        );
        onFailed();
        return true; // 完了
      }

      // 進行中（pending/processing/未作成）
      return false; // 継続
    } catch {
      // フェッチエラー時も次回で回復する可能性があるので継続
      return false;
    }
  }, [refetchContestPayment, onSuccess, onFailed]);

  useEffect(() => {
    if (!visible) {
      // 非表示になったらインターバルをクリア
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 初回即時実行
    tick().then((done) => {
      if (done) return;

      // まだ完了していない場合はポーリング開始
      intervalRef.current = setInterval(async () => {
        const isDone = await tick();
        if (isDone && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, POLLING_INTERVAL_MS);
    });

    // クリーンアップ
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [visible, tick]);

  return {
    errorMsg,
  };
}
