import { Contest } from "@/types/Contest";
import { CONTEST_STATUS_TYPE_LABELS } from "@/features/contest/common/constants/contest.constant";
import {
  getContestStatusType,
  getContestDetailStatusType,
} from "@/utils/getContestStatus";

type Props = {
  contest: Contest;
  className?: string;
};

/**
 * 詳細ステータスのラベル
 */
const DETAIL_STATUS_LABELS: Record<string, string> = {
  entry: "応募期間",
  video_production: "動画制作期間",
  contest: "開催期間",
};

/**
 * コンテストのステータスを表示するチップコンポーネント
 * （下書き、開催前、開催中、終了）
 * 開催中の場合は詳細ステータス（応募期間/動画制作期間/開催期間）を表示
 */
export function ContestStatusChip({ contest, className = "" }: Props) {
  const statusType = getContestStatusType(contest);
  const statusLabel = CONTEST_STATUS_TYPE_LABELS[statusType];

  // 開催中の場合は詳細ステータスを表示
  let displayText: string = statusLabel.text;
  if (statusType === "holding") {
    const detailStatus = getContestDetailStatusType(contest);
    const detailLabel = DETAIL_STATUS_LABELS[detailStatus];
    if (detailLabel) {
      displayText = detailLabel;
    }
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusLabel.color} ${className}`}
    >
      {displayText}
    </span>
  );
}
