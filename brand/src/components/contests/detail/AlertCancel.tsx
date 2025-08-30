import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { AlertCircleIcon, XIcon } from "lucide-react";

export function AlertCancel({
  title,
  description,
  setClose,
}: {
  title: string;
  description: string;
  setClose: (isCancel: boolean) => void;
}) {
  return (
    <Alert
      variant="destructive"
      className="flex justify-between mb-4 bg-red-100"
    >
      <div>
        <div className="flex items-center gap-2">
          <AlertCircleIcon />
          <AlertTitle>{title}</AlertTitle>
        </div>
        <AlertDescription>{description}</AlertDescription>
      </div>
      <XIcon
        className="w-10 h-10 cursor-pointer hover:text-red-900"
        onClick={() => setClose(false)}
      />
    </Alert>
  );
}
