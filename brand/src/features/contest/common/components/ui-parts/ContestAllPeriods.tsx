import { Contest } from "@/types/Contest";
import { formatPeriod } from "@/utils/format";
import { SectionTitle } from "@/features/contest/detail/components/ui-elements/SectionTitle";
import { ClockIcon, VideoIcon, CrownIcon } from "lucide-react";

type Props = {
  contest: Contest;
  className?: string;
};

/**
 * コンテストの全期間を表示するコンポーネント（詳細ページ用）
 * - 応募期間
 * - 動画制作期間
 * - 開催期間
 */
export function ContestAllPeriods({ contest, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-12 ${className}`}>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-gray-400" />{" "}
          <SectionTitle className="text-muted-foreground text-sm">
            応募期間
          </SectionTitle>
        </div>
        <p className="text-black">
          {formatPeriod(contest.entry_start_date, contest.entry_end_date)}
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <VideoIcon className="w-4 h-4 text-gray-400" />{" "}
          <SectionTitle className="text-muted-foreground text-sm">
            動画制作期間
          </SectionTitle>
        </div>
        <p className="text-black">
          {formatPeriod(
            contest.video_production_start_date,
            contest.video_production_end_date,
          )}
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <CrownIcon className="w-4 h-4 text-gray-400" />{" "}
          <SectionTitle className="text-muted-foreground text-sm">
            開催期間
          </SectionTitle>
        </div>
        <p className="text-black">
          {formatPeriod(contest.contest_start_date, contest.contest_end_date)}
        </p>
      </div>
    </div>
  );
}
