import { Contest, ContestPrize } from "@/types/Contest";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { formatCurrency, formatDate, formatNumber } from "@/utils/format";
import { CONTEST_STATUS_TYPE_LABELS } from "@/constants/contest.constant";
import {
  getContestStatusType,
  getContestDetailStatusType,
} from "@/utils/getContestStatus";
import { TrashIcon } from "lucide-react";
import { useDeleteContest } from "@/hooks/contest/useDeleteContest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Application } from "@/types/Application";

type Props = {
  contest: Contest & { contest_prizes?: ContestPrize[] };
  applications: Application[];
  refetch: () => void;
};

export const ContestCard = ({ contest, refetch, applications }: Props) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteContest, isPending } = useDeleteContest();

  const statusType = getContestStatusType(contest);
  const statusLabel = CONTEST_STATUS_TYPE_LABELS[statusType];
  const detailStatusType = getContestDetailStatusType(contest);

  // 期間表示のロジック
  const getPeriodDisplay = () => {
    if (statusType === "draft") {
      // 下書きの場合：応募期間を表示
      if (contest.entry_start_date && contest.entry_end_date) {
        return {
          label: "応募期間",
          startDate: contest.entry_start_date,
          endDate: contest.entry_end_date,
        };
      }
    } else if (statusType === "holding") {
      // 開催中の場合：現在の期間（応募、動画制作、開催）を表示
      if (detailStatusType === "entry") {
        return {
          label: "応募期間",
          startDate: contest.entry_start_date,
          endDate: contest.entry_end_date,
        };
      } else if (detailStatusType === "video_production") {
        return {
          label: "動画制作期間",
          startDate: contest.video_production_start_date,
          endDate: contest.video_production_end_date,
        };
      } else if (detailStatusType === "contest") {
        return {
          label: "開催期間",
          startDate: contest.contest_start_date,
          endDate: contest.contest_end_date,
        };
      }
    } else if (statusType === "scheduled") {
      // 開催前の場合：応募期間を表示
      if (contest.entry_start_date && contest.entry_end_date) {
        return {
          label: "応募期間",
          startDate: contest.entry_start_date,
          endDate: contest.entry_end_date,
        };
      }
    } else if (statusType === "ended") {
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
  };

  const periodDisplay = getPeriodDisplay();

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/contests/${contest.id}`);
  };

  const handleDeleteContest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    deleteContest(
      { contestId: contest.id },
      {
        onSuccess: () => {
          refetch();
          setShowDeleteDialog(false);
        },
      },
    );
  };

  const handleEditContest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/contests/${contest.id}/edit`);
  };

  return (
    <>
      <div
        onClick={handleClickCard}
        className="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 px-5 py-6"
      >
        <div className="flex justify-center">
          {/* サムネイル */}
          {contest.thumbnail_url ? (
            <Image
              src={contest.thumbnail_url || ""}
              alt={contest.title}
              width={224}
              height={168}
              className="w-56 h-42 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-56 h-42 rounded-lg object-cover border bg-gray-400" />
          )}

          {/* コンテンツ */}
          <div className="flex-1 px-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {contest.title}
                </h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusLabel.color}`}
              >
                {statusLabel.text}
              </span>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500">{periodDisplay.label}</span>
                  <p className="text-base text-gray-900">
                    {periodDisplay.startDate && periodDisplay.endDate
                      ? `${formatDate(periodDisplay.startDate, "PPP")} 〜 ${formatDate(periodDisplay.endDate, "PPP")}`
                      : "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500">賞金総額</span>
                  <p className="text-base text-gray-900">
                    {formatCurrency(
                      contest.contest_prizes?.reduce(
                        (sum, prize) => sum + prize.amount,
                        0,
                      ) || 0,
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 flex items-end justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {formatNumber(applications.length)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {formatNumber(contest.views)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {formatNumber(contest.likes)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {formatNumber(contest.comments)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {formatNumber(contest.shares)}
                  </span>
                </div>
              </div>
              {!contest.contest_payments && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setShowDeleteDialog(true);
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-100 border-gray-500 text-gray-600 cursor-pointer"
                    onClick={handleEditContest}
                  >
                    編集する
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmDialog
          title="コンテストを削除しますか？"
          description="コンテストを削除すると、コンテストのデータが完全に削除されます。"
          action="削除する"
          onAction={(event: React.MouseEvent<HTMLButtonElement>) =>
            handleDeleteContest(event)
          }
          onCancel={() => setShowDeleteDialog(false)}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          variant="destructive"
          disabled={isPending}
        />
      )}
    </>
  );
};
