"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download, CreditCard } from "lucide-react";
import { formatNumber } from "@/utils/format";
import { Contest } from "@/types/Contest";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { useCreateContestTransfer } from "@/hooks/stripe/useCreateContestTransfer";
import { Application } from "@/types/Application";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  contest: Contest;
  application: Application;
  amount: number;
}

export default function TransactionModal({
  isOpen,
  onClose,
  contest,
  application,
  amount = 0,
}: TransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createContestTransfer } = useCreateContestTransfer();

  const handleDownload = async () => {
    // ダウンロード機能の実装
  };

  const handlePayment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);

    await createContestTransfer(
      {
        contestId: contest.id,
        applicationId: application.id,
        creatorId: application.creator.id,
        amountJpy: amount,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          onClose();
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-gray-900">
            {application.creator.username}
          </DialogTitle>
        </DialogHeader>

        {/* 取引情報 */}
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm">支払い金額：</span>
          <span className="text-sm">{formatNumber(amount)}円</span>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDownload}
            disabled={!contest || isLoading}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            {isLoading ? "ダウンロード中..." : "動画をダウンロード"}
          </Button>

          <Button
            onClick={handlePayment}
            disabled={isLoading || application.contest_transfer !== null}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <CreditCard className="w-4 h-4" />
            {isLoading
              ? "処理中..."
              : application.contest_transfer
                ? "支払いを完了"
                : "支払う"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
