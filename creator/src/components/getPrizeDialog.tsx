"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { contests, applications, contest_prizes } from "@prisma/client";
import { formatJpy } from "@/utils/format";
import { useCreateContestTransfer } from "@/hooks/useCreateContestTransfer";
import { getErrorMessage } from "@/utils/errorMessages";
import { useRouter } from "next/navigation";

export default function GetPrizeDialog({
  competition,
  application,
  ranking,
}: {
  competition: contests & { contest_prizes?: contest_prizes[] };
  application: applications;
  ranking: number;
}) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createContestTransfer, isPending } =
    useCreateContestTransfer();

  const handleCreateContestTransfer = () => {
    setError(null);

    createContestTransfer(
      {
        contestId: competition.id,
        applicationId: application.id,
      },
      {
        onSuccess: () => {
          setError(null);
          setIsOpen(false);
          router.refresh();
        },
        onError: (error: Error) => {
          console.error("エラー:", error);
          setError(getErrorMessage(error));
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-5 font-bold">
          <ArrowRightIcon />
          賞金を受け取る
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>賞金を受け取る</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-2">
          <p>順位：{ranking + 1}位</p>
          <p>
            賞金：
            {competition.contest_prizes && competition.contest_prizes[ranking]
              ? formatJpy(Number(competition.contest_prizes[ranking].amount))
              : "¥0"}
          </p>
        </div>
        <div className="space-y-1">
          <p>受け取った賞金はマイページの口座情報から確認できます。</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-5 font-bold">
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isPending}
              onClick={handleCreateContestTransfer}
              className="py-5 font-bold"
            >
              {isPending ? "賞金を受け取っています..." : "賞金を受け取る"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
