"use client";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import ApplyCompetitionButton from "./applyCompetitionButton";

export default function ApplyDialog({
  competitionId,
}: {
  competitionId: string;
}) {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          <ArrowRightIcon />
          今すぐ参加
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>コンペティションに参加</AlertDialogTitle>
          <AlertDialogDescription>
            下記の利用規約を確認し、同意の上で参加してください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <div className="border p-2 max-h-[60vh] min-h-0 overflow-y-auto">
            <div className="flex items-start gap-2">
              <span className="font-bold">利用規約</span>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              {Array.from({ length: 10 }, (_, index) => (
                <ul key={index}>
                  <li>
                    応募後のキャンセルはできません。応募前に内容をよく確認してください。
                  </li>
                  <li>
                    応募作品の著作権はクリエイターに帰属しますが、Kompeおよび主催企業がプロモーション目的で使用する場合があります。
                  </li>
                  <li>
                    不正行為が発覚した場合、応募が無効になることがあります。
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="terms"
              checked={isTermsAccepted}
              onCheckedChange={(checked) =>
                setIsTermsAccepted(
                  checked === "indeterminate" ? false : checked,
                )
              }
            />
            <Label htmlFor="terms">利用規約に同意する</Label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction disabled={!isTermsAccepted} asChild>
            <ApplyCompetitionButton contestId={competitionId}>
              参加する
            </ApplyCompetitionButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
