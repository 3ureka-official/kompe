import { useEffect, useRef, useState } from "react";
import { ContestPayment } from "@/types/ContestPayment";

interface UsePaymentPollingProps {
  visible: boolean;
  refetchContestPayment: () => Promise<{ data: ContestPayment | null }>;
  onSuccess: () => void;
  onFailed: () => void;
}

const INTERVAL_MS = 2000;
const TIMEOUT_MS = 2 * 60 * 1000;

export function usePaymentPolling({
  visible,
  refetchContestPayment,
  onSuccess,
  onFailed,
}: UsePaymentPollingProps) {
  const startedAtRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    let mounted = true;
    let timer: NodeJS.Timeout | undefined;

    const tick = async () => {
      try {
        const res = await refetchContestPayment();
        const data = res?.data;
        const status = data?.status;

        if (!mounted) return;

        if (status === "succeeded") {
          onSuccess();
          return;
        }
        if (status === "failed") {
          setErrorMsg(
            "決済に失敗しました。カード会社の認証や残高をご確認ください。",
          );
          onFailed();
          return;
        }

        // 進行中（pending/processing/未作成）
        const now = Date.now();
        if (startedAtRef.current == null) startedAtRef.current = now;
        const elapsedTime = now - startedAtRef.current;
        setElapsed(elapsedTime);
        if (elapsedTime > TIMEOUT_MS) {
          setTimedOut(true);
        }
      } catch {
        // フェッチエラー時も次回で回復する可能性があるので継続
      } finally {
        if (mounted) {
          timer = setTimeout(tick, INTERVAL_MS);
        }
      }
    };

    // 初回即時実行
    tick();

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [visible, refetchContestPayment, onSuccess, onFailed]);

  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);

  return {
    minutes,
    seconds,
    timedOut,
    errorMsg,
  };
}
