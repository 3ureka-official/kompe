import { Contest } from "@/types/Contest";
import { formatDate } from "@/utils/format";
import {
  getContestStatusType,
  getContestDetailStatusType,
  ContestStatusType,
  ContestDetailStatusType,
} from "@/utils/getContestStatus";

type PeriodDisplay = {
  label: string;
  startDate: string | Date | null | undefined;
  endDate: string | Date | null | undefined;
};

/**
 * コンテストの状態に応じて表示すべき期間を取得
 */
export function getContestPeriodDisplay(
  contest: Contest,
  statusType?: ContestStatusType,
  detailStatusType?: ContestDetailStatusType,
): PeriodDisplay {
  const status = statusType ?? getContestStatusType(contest);
  const detailStatus = detailStatusType ?? getContestDetailStatusType(contest);

  if (status === "draft") {
    // 下書きの場合：応募期間を表示
    if (contest.entry_start_date && contest.entry_end_date) {
      return {
        label: "応募期間",
        startDate: contest.entry_start_date,
        endDate: contest.entry_end_date,
      };
    }
  } else if (status === "holding") {
    // 開催中の場合：現在の期間（応募、動画制作、開催）を表示
    if (detailStatus === "entry") {
      return {
        label: "応募期間",
        startDate: contest.entry_start_date,
        endDate: contest.entry_end_date,
      };
    } else if (detailStatus === "video_production") {
      return {
        label: "動画制作期間",
        startDate: contest.video_production_start_date,
        endDate: contest.video_production_end_date,
      };
    } else if (detailStatus === "contest") {
      return {
        label: "開催期間",
        startDate: contest.contest_start_date,
        endDate: contest.contest_end_date,
      };
    }
  } else if (status === "scheduled") {
    // 開催前の場合：応募期間を表示
    if (contest.entry_start_date && contest.entry_end_date) {
      return {
        label: "応募期間",
        startDate: contest.entry_start_date,
        endDate: contest.entry_end_date,
      };
    }
  } else if (status === "ended") {
    // 終了の場合：開催期間を表示
    return {
      label: "開催期間",
      startDate: contest.contest_start_date,
      endDate: contest.contest_end_date,
    };
  }

  // デフォルト：開催期間を表示
  return {
    label: "開催期間",
    startDate: contest.contest_start_date,
    endDate: contest.contest_end_date,
  };
}

type Props = {
  contest: Contest;
  className?: string;
};

/**
 * コンテストの現在の期間を表示するコンポーネント（一覧ページ用）
 * 状態に応じて適切な期間（応募、動画制作、開催）を表示
 */
export function ContestCurrentPeriod({ contest, className = "" }: Props) {
  const periodDisplay = getContestPeriodDisplay(contest);

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-gray-500">{periodDisplay.label}</span>
      <p className="text-base text-gray-900">
        {periodDisplay.startDate && periodDisplay.endDate
          ? `${formatDate(periodDisplay.startDate, "PPP")} 〜 ${formatDate(periodDisplay.endDate, "PPP")}`
          : "-"}
      </p>
    </div>
  );
}
