import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog";
import { CheckCircleIcon } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PaymentSuccessDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="gap-4 text-center">
        <div className="flex justify-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
        </div>
        <DialogTitle className="text-xl">支払いを完了しました</DialogTitle>
        <DialogDescription>
          作成したコンテストがクリエイターに公開されました。
        </DialogDescription>
        <div className="flex justify-center mt-2">
          <Button onClick={onClose}>閉じる</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
