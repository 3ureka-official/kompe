import { Button } from "@/components/ui/Button";
import { Contest, ContestImage, ContestPrize } from "@/types/Contest";
import { ArrowLeftIcon, TrashIcon } from "lucide-react";
import { ConfirmDialog } from "@/components/ui-elements/ConfirmDialog";
import { useContestHeader } from "@/features/contest/detail/hooks/useContestHeader";

type Props = {
  contest: Contest & {
    contest_prizes?: ContestPrize[];
    contest_images?: ContestImage[];
  };
  refetch: () => void;
};

export function ContestHeader({ contest, refetch }: Props) {
  const {
    showDeleteDialog,
    isDeleting,
    handleBack,
    handleDeleteContest,
    handleEditContest,
    openDeleteDialog,
    closeDeleteDialog,
  } = useContestHeader({
    contestId: contest.id,
    onDeleteSuccess: refetch,
  });

  return (
    <>
      <div className="flex w-full items-center justify-between border-b h-14 px-2">
        <Button
          variant="ghost"
          className=" border-gray-500 text-gray-600 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>

        {contest.is_draft && (
          <div className="flex items-start gap-2">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                event.stopPropagation();
                openDeleteDialog();
              }}
            >
              <TrashIcon className="w-10 h-10" />
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

      {showDeleteDialog && (
        <ConfirmDialog
          title="コンテストを削除しますか？"
          description="コンテストを削除すると、コンテストのデータが完全に削除されます。"
          action="削除する"
          onAction={handleDeleteContest}
          onCancel={closeDeleteDialog}
          open={showDeleteDialog}
          onOpenChange={(open) => {
            if (!open) closeDeleteDialog();
          }}
          variant="destructive"
          disabled={isDeleting}
        />
      )}
    </>
  );
}
