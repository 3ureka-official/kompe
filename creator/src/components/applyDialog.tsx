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
import Link from "next/link";
import { useState } from "react";
import ApplyCompetitionButton from "./applyCompetitionButton";
import { checkAddressAndRedirect } from "@/actions/address";

type ApplyDialogProps = {
  competitionId: string;
  hasSample?: boolean;
};

export default function ApplyDialog({
  competitionId,
  hasSample = false,
}: ApplyDialogProps) {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const checkAddressAction = checkAddressAndRedirect.bind(null, competitionId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-5 font-bold">
          <ArrowRightIcon />
          今すぐ応募
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>コンペティションに参加</AlertDialogTitle>
          <AlertDialogDescription>
            下記の応募規約を確認し、同意の上で応募してください。
            {hasSample && (
              <span className="block mt-2 text-destructive">
                このコンテストは試供品があります。応募前に住所の登録・確認が必要です。
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <div className="border p-2 max-h-[60vh] min-h-0 overflow-y-auto">
            <div className="flex items-start gap-2">
              <span className="font-bold mb-2">応募規約</span>
            </div>
            <div className="text-sm space-y-1 leading-relaxed">
              <p>
                応募後のキャンセルはできません。応募前に内容をよく確認してください。
              </p>
              <p>
                応募作品の著作権はクリエイターに帰属しますが、Kompeおよび主催企業がプロモーション目的で使用する場合があります。
              </p>
              <p>不正行為が発覚した場合、応募が無効になることがあります。</p>
              <p>
                詳しくは
                <Link
                  target="_blank"
                  className="text-blue-500 underline"
                  href="https://www.kompe.app/terms"
                >
                  利用規約
                </Link>
                と
                <Link
                  target="_blank"
                  className="text-blue-500 underline"
                  href="https://www.kompe.app/privacy"
                >
                  プライバシーポリシー
                </Link>
                をご確認ください。
              </p>
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
            <Label htmlFor="terms">応募規約に同意する</Label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          {hasSample ? (
            <form action={checkAddressAction}>
              <AlertDialogAction
                type="submit"
                disabled={!isTermsAccepted}
                className="w-full"
              >
                参加する
              </AlertDialogAction>
            </form>
          ) : (
            <ApplyCompetitionButton
              disabled={!isTermsAccepted}
              contestId={competitionId}
            >
              参加する
            </ApplyCompetitionButton>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
