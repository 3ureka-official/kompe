import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./Dialog";

export const ConfirmDialog = ({
  title,
  description,
  action,
  cancel = "キャンセル",
  onAction,
  onCancel,
  open,
  onOpenChange,
  variant,
  disabled,
}: {
  title: string;
  description: string;
  action: string;
  cancel?: string;
  onAction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "danger" | "outline" | "primary";
  disabled: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            {cancel}
          </Button>
          <Button variant={variant} onClick={onAction} disabled={disabled}>
            {action}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
