import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { CheckCircle2Icon, XIcon } from "lucide-react";

export function AlertSuccess({
  title,
  description,
  setClose,
}: {
  title: string;
  description: string;
  setClose: (isCancel: boolean) => void;
}) {
  return (
    <Alert className="bg-emerald-50 border-emerald-200 flex justify-between mb-4">
      <div>
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="text-emerald-600" />
          <AlertTitle>{title}</AlertTitle>
        </div>
        <AlertDescription>{description}</AlertDescription>
      </div>
      <XIcon
        className="w-10 h-10 cursor-pointer hover:text-emerald-600"
        onClick={() => setClose(false)}
      />
    </Alert>
  );
}
