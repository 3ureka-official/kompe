import { Progress } from "@/components/ui/Progress";
import { useState, useEffect } from "react";

export function Loading({ isPending }: { isPending: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPending) return;

    // 80%まで自動で進行
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval);
          return 80;
        }
        return prev + 2; // 2%ずつ増加
      });
    }, 100); // 100msごとに更新

    return () => clearInterval(interval);
  }, [isPending]);

  useEffect(() => {
    // isPendingがfalseになったら100%まで一気に進める
    if (!isPending && progress >= 80) {
      setProgress(100);

      // 少し待ってからコンポーネントを非表示にする
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }
  }, [isPending, progress]);

  // isPendingがfalseで進行が0%なら非表示
  if (!isPending && progress === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="text-sm text-gray-500 mb-4">読み込み中...</div>
      <Progress value={progress} className="w-64" />
    </div>
  );
}
