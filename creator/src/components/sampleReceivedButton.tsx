"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { notifySampleReceived } from "@/actions/sampleShipping";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, LoaderCircleIcon } from "lucide-react";

type SampleReceivedButtonProps = {
  applicationId: string;
  contestId: string;
};

export default function SampleReceivedButton({
  applicationId,
  contestId,
}: SampleReceivedButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNotify = () => {
    startTransition(async () => {
      try {
        await notifySampleReceived(applicationId);
        setIsCompleted(true);
        setIsOpen(false);
        router.refresh();
      } catch (error) {
        console.error("通知の送信に失敗しました:", error);
        alert("通知の送信に失敗しました。もう一度お試しください。");
      }
    });
  };

  if (isCompleted) {
    return (
      <Button disabled className="w-full" variant="outline">
        <CheckCircleIcon className="size-4 mr-2" />
        到着通知を送信しました
      </Button>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-5 font-bold">
          <CheckCircleIcon className="size-4 mr-2" />
          試供品が届いたことをブランドに通知する
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>試供品の到着確認</AlertDialogTitle>
          <AlertDialogDescription>
            試供品が届いたことをブランドに通知します。この操作は取り消せません。よろしいですか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleNotify} disabled={isPending}>
            {isPending ? (
              <>
                <LoaderCircleIcon className="animate-spin size-4 mr-2" />
                送信中...
              </>
            ) : (
              "通知する"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
