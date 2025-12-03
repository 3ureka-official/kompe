import { useState } from "react";
import { PurchaseProofStatus } from "@/types/PurchaseProofStatus";

interface UsePurchaseProofModalProps {
  initialStatus?: PurchaseProofStatus;
  onApprove: () => void;
  onReject: (comment: string) => void;
}

export function usePurchaseProofModal({
  initialStatus = "NOT_REQUIRED",
  onApprove,
  onReject,
}: UsePurchaseProofModalProps) {
  const [rejectionComment, setRejectionComment] = useState("");

  const status = initialStatus;
  const canApproveOrReject = status === "PENDING";

  const handleApprove = () => {
    onApprove();
    setRejectionComment("");
  };

  const handleReject = () => {
    onReject(rejectionComment);
    setRejectionComment("");
  };

  return {
    rejectionComment,
    setRejectionComment,
    canApproveOrReject,
    handleApprove,
    handleReject,
  };
}
