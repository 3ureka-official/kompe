import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteContest } from "@/features/contest/common/hooks/useDeleteContest";

interface UseContestHeaderProps {
  contestId: string;
  onDeleteSuccess: () => void;
}

export function useContestHeader({
  contestId,
  onDeleteSuccess,
}: UseContestHeaderProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteContest, isPending } = useDeleteContest();

  const handleDeleteContest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    deleteContest(
      { contestId },
      {
        onSuccess: () => {
          onDeleteSuccess();
          setShowDeleteDialog(false);
          router.push("/contests");
        },
      },
    );
  };

  const handleEditContest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/contests/${contestId}/edit`);
  };

  const openDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  return {
    showDeleteDialog,
    isDeleting: isPending,
    handleDeleteContest,
    handleEditContest,
    openDeleteDialog,
    closeDeleteDialog,
  };
}
