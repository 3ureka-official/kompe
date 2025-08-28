"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ContestHeader } from "@/components/contests/detail/ContestHeader";
import { ContestOverview } from "@/components/contests/detail/ContestOverview";
import { ContestAssets } from "@/components/contests/detail/ContestAssets";
import { ContestCreatorSection } from "@/components/contests/detail/ContestCreatorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useGetContest } from "@/hooks/contest/useGetContest";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { AlertCircleIcon, CheckCircle2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetContestPayment } from "@/hooks/contestPayment/useGetPayment";
import { PaymentPollingOverlay } from "@/components/contests/detail/PaymentPollingOverlay";

function AlertCancel({
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

function AlertSuccess({
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

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params.id as string;

  const { getContestQuery } = useGetContest(contestId);
  const { data: contest, isPending, refetch } = getContestQuery;

  const {
    data: contestPayment,
    isPending: isPendingContestPayment,
    refetch: refetchContestPayment,
  } = useGetContestPayment(contestId);

  const searchParams = useSearchParams();
  const checkout = searchParams.get("checkout");
  const sessionId = searchParams.get("session_id");

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
    if (!showCheckoutLoading) return;
    if (contestPayment?.status === "succeeded") {
      setShowCheckoutLoading(false);
      setShowSuccessBanner(true);
    }
  }, [contestPayment, showCheckoutLoading]);

  if (isPending) return <div>読み込み中...</div>;
  if (!contest) return <div>コンテストが見つかりません</div>;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {showCancelCheckoutAlert && (
        <AlertCancel
          title="コンテスト賞金の支払い"
          description="コンテスト賞金の支払いをキャンセルしました。"
          setClose={setShowCancelCheckoutAlert}
        />
      )}

      {showSuccessBanner && (
        <AlertSuccess
          title="支払いが完了しました"
          description="お支払いありがとうございます。賞金プールが反映されました。"
          setClose={setShowSuccessBanner}
        />
      )}

      {/* ヘッダー */}
      <ContestHeader contest={contest} refetch={refetch} />

      {/* タブ形式のコンテンツ */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="creators">参加者</TabsTrigger>
          <TabsTrigger value="assets">アセット</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* コンテスト概要 */}
          <ContestOverview contest={contest} />
        </TabsContent>

        <TabsContent value="creators" className="space-y-6">
          {/* 参加クリエイター */}
          <ContestCreatorSection contest={contest} />
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          {/* イメージ動画 */}
          <ContestAssets contest={contest} />
        </TabsContent>
      </Tabs>

      {/* 支払い確定待ちのオーバーレイ */}
      <PaymentPollingOverlay
        visible={!!showCheckoutLoading}
        contestId={contestId}
        sessionId={sessionId}
        latestPayment={contestPayment}
        refetchContestPayment={async () => {
          const r = await refetchContestPayment();
          return r;
        }}
        onClose={() => setShowCheckoutLoading(false)}
        onSuccess={() => {
          setShowCheckoutLoading(false);
          setShowSuccessBanner(true);
          // 必要ならここで refetch() してヘッダ等を更新
          refetch();
        }}
        onFailed={() => {
          setShowCheckoutLoading(false);
          setShowCancelCheckoutAlert(true);
        }}
      />
    </div>
  );
}
