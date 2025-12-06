import { ReactNode } from "react";
import { formatNumber } from "@/utils/format";

type Props = {
  text: string;
  icon: ReactNode;
  value: number;
  className?: string;
};

/**
 * エンゲージメント項目を表示するコンポーネント
 */
export function EngagementItem({ text, icon, value, className = "" }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-30 h-20 rounded-lg gap-2 ${className}`}
    >
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-sm text-white">{text}</span>
      </div>
      <div className="flex items-center justify-center w-full">
        <span className="text-xl text-white">{formatNumber(value)}</span>
      </div>
    </div>
  );
}
