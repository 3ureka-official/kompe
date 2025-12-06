import { useState, useEffect } from "react";
import { ContestPayment } from "@/types/ContestPayment";

interface UseContestDetailPageProps {
  checkout: string | null;
  contestPayment: ContestPayment | null;
  isPendingContestPayment: boolean;
}

export function useContestDetailPage({
  checkout,
  contestPayment,
  isPendingContestPayment,
}: UseContestDetailPageProps) {
  const [showCancelCheckoutAlert, setShowCancelCheckoutAlert] = useState(
    checkout === "cancel",
  );
  const [showCheckoutLoading, setShowCheckoutLoading] = useState(
    checkout === "success",
  );
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // success で戻ってきたらすぐにオーバーレイ開始
  useEffect(() => {
    if (checkout === "success") setShowCheckoutLoading(true);
  }, [checkout]);

  // すでに支払い済み（リロード時など）は即クローズして成功表示
  useEffect(() => {
    if (isPendingContestPayment) return;
    if (contestPayment?.status === "succeeded") {
      if (showCheckoutLoading) {
        setShowCheckoutLoading(false);
        setShowSuccessBanner(true);
      }
      return;
    }
    // pendingの場合はダイアログを表示
    if (contestPayment?.status === "pending") {
      setShowCheckoutLoading(true);
    }
  }, [contestPayment, showCheckoutLoading, isPendingContestPayment]);

  const handlePollingSuccess = () => {
    setShowCheckoutLoading(false);
    setShowSuccessBanner(true);
  };

  const handlePollingFailed = () => {
    setShowCheckoutLoading(false);
    setShowCancelCheckoutAlert(true);
  };

  return {
    showCancelCheckoutAlert,
    setShowCancelCheckoutAlert,
    showCheckoutLoading,
    setShowCheckoutLoading,
    showSuccessBanner,
    setShowSuccessBanner,
    handlePollingSuccess,
    handlePollingFailed,
  };
}
