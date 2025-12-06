import { Contest, ContestPrize, ContestImage } from "@/types/Contest";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { TrashIcon } from "lucide-react";
import { useDeleteContest } from "@/features/contest/common/hooks/useDeleteContest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui-elements/ConfirmDialog";
import { Application } from "@/types/Application";
import { ContestStatusChip } from "@/features/contest/common/components/ui-parts/ContestStatusChip";
import { ContestCurrentPeriod } from "@/features/contest/common/components/ui-parts/ContestCurrentPeriod";
import { EngagementSection } from "@/features/contest/list/components/ui-parts/EngagementSection";

type Props = {
  contest: Contest & {
    contest_prizes?: ContestPrize[];
    contest_images?: ContestImage[];
  };
  applications: Application[];
  refetch: () => void;
};

export const ContestCard = ({ contest, refetch, applications }: Props) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteContest, isPending } = useDeleteContest();

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
          {contest.contest_images && contest.contest_images.length > 0 ? (
            <Image
              src={contest.contest_images[0].url}
              alt={contest.title}
              width={224}
              height={168}
              className="aspect-video w-56 rounded-lg object-cover border"
            />
          ) : (
            <div className="aspect-video w-56 rounded-lg border bg-gray-400" />
          )}

          {/* コンテンツ */}
          <div className="flex-1 px-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {contest.title}
                </h2>
              </div>
              <ContestStatusChip contest={contest} />
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <ContestCurrentPeriod contest={contest} className="gap-2" />
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
              <EngagementSection
                videoCount={applications.length}
                views={contest.views}
                likes={contest.likes}
                comments={contest.comments}
                shares={contest.shares}
              />
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
