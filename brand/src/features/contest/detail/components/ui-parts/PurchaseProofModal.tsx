"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Application } from "@/types/Application";
import { PurchaseProofStatus } from "@/types/PurchaseProofStatus";
import { usePurchaseProofModal } from "@/features/contest/detail/hooks/usePurchaseProofModal";

type Props = {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (comment: string) => void;
  isPending: boolean;
};

const statusLabels: Record<PurchaseProofStatus, string> = {
  NOT_REQUIRED: "不要",
  NOT_SUBMITTED: "未提出",
  PENDING: "確認待ち",
  APPROVED: "承認済み",
  REJECTED: "却下",
};

const statusColors: Record<PurchaseProofStatus, string> = {
  NOT_REQUIRED: "bg-gray-100 text-gray-800",
  NOT_SUBMITTED: "bg-gray-100 text-gray-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export function PurchaseProofModal({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isPending,
}: Props) {
  const status = application.purchase_proof_status || "NOT_REQUIRED";

  const {
    rejectionComment,
    setRejectionComment,
    canApproveOrReject,
    handleApprove,
    handleReject,
  } = usePurchaseProofModal({
    initialStatus: status,
    onApprove,
    onReject,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>購入証明スクリーンショット</DialogTitle>
          <DialogDescription>
            {application.creator?.display_name || "クリエイター"}の購入証明
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* ステータス表示 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              ステータス:
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
              {statusLabels[status]}
            </span>
          </div>

          {/* スクリーンショット表示 */}
          {application.purchase_proof_image_url ? (
            <div className="relative w-full h-96 border border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={application.purchase_proof_image_url}
                alt="購入証明スクリーンショット"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-96 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">画像がありません</p>
            </div>
          )}

          {/* 却下コメント表示 */}
          {status === "REJECTED" &&
            application.purchase_proof_rejection_comment && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-red-800 mb-1">
                  却下理由
                </p>
                <p className="text-sm text-red-700">
                  {application.purchase_proof_rejection_comment}
                </p>
              </div>
            )}

          {/* 承認/却下ボタン */}
          {canApproveOrReject && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  却下理由（任意）
                </label>
                <Textarea
                  value={rejectionComment}
                  onChange={(e) => setRejectionComment(e.target.value)}
                  placeholder="却下する理由を入力してください（任意）"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  disabled={isPending}
                >
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isPending}
                >
                  却下
                </Button>
                <Button
                  variant="default"
                  onClick={handleApprove}
                  disabled={isPending}
                >
                  承認
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
