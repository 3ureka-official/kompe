import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog";
import { XCircleIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PaymentFailedDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="gap-4 text-center">
        <div className="flex justify-center">
          <XCircleIcon className="w-16 h-16 text-red-500" />
        </div>
        <DialogTitle className="text-xl">支払いに失敗しました</DialogTitle>
        <DialogDescription>
          支払い処理中にエラーが発生しました。
          <br />
          お手数ですが、Kompe運営までお問い合わせください。
        </DialogDescription>
        <div className="flex justify-center gap-3 mt-2">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
          <Button asChild>
            <Link href="https://www.kompe.app/contact" target="_blank">
              お問い合わせ
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
