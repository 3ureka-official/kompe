import { Button } from "@/components/ui/Button";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { ContestPayment } from "@/types/ContestPayment";
import { usePaymentPolling } from "@/features/contest/detail/hooks/usePaymentPolling";

export function PaymentPollingOverlay({
  visible,
  sessionId,
  refetchContestPayment,
  onClose,
  onSuccess,
  onFailed,
}: {
  visible: boolean;
  sessionId: string | null;
  refetchContestPayment: () => Promise<{ data: ContestPayment | null }>;
  onClose: () => void;
  onSuccess: () => void;
  onFailed: () => void;
}) {
  const { minutes, seconds, timedOut, errorMsg } = usePaymentPolling({
    visible,
    refetchContestPayment,
    onSuccess,
    onFailed,
  });

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          {!errorMsg ? (
            <Loader2Icon className="animate-spin h-6 w-6" />
          ) : (
            <AlertCircleIcon className="h-6 w-6 text-red-500" />
          )}
          <h2 className="text-lg font-semibold">
            コンテスト賞金の支払いを確定中
          </h2>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          {!errorMsg ? (
            <>
              <p>
                Stripeからの確定通知を反映しています。ページはこのままでOKです。
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  セッションID:{" "}
                  <code className="bg-gray-100 px-1 py-0.5 rounded">
                    {sessionId ?? "取得中..."}
                  </code>
                </li>
                <li>
                  経過時間: {minutes}:{seconds.toString().padStart(2, "0")}
                </li>
              </ul>
              {timedOut && (
                <div className="mt-3 text-amber-600">
                  反映に時間がかかっています。もう少しお待ちいただくか、再読み込みをお試しください。
                </div>
              )}
            </>
          ) : (
            <p className="text-red-600">{errorMsg}</p>
          )}
        </div>

        <div className="mt-5 flex gap-2 justify-end">
          {!errorMsg ? (
            <>
              <Button variant="ghost" onClick={onClose}>
                閉じる
              </Button>
              <Button onClick={() => refetchContestPayment()}>
                再読み込み
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onClose}>
                閉じる
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
