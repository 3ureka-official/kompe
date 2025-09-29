"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ContestHeader } from "@/components/contests/detail/ContestHeader";
import { ContestOverview } from "@/components/contests/detail/ContestOverview";
import { ContestAssets } from "@/components/contests/detail/ContestAssets";
import { ContestCreatorSection } from "@/components/contests/detail/ContestCreatorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useContext, useEffect, useState } from "react";
import { useGetContestPayment } from "@/hooks/contestPayment/useGetPayment";
import { PaymentPollingOverlay } from "@/components/contests/detail/PaymentPollingOverlay";
import { AlertCancel } from "@/components/contests/detail/AlertCancel";
import { AlertSuccess } from "@/components/contests/detail/AlertSuccess";
import { BrandContext } from "@/contexts/BrandContext";
import { Loading } from "@/components/ui/Loading";
import { useGetContestEngage } from "@/hooks/contest/useGetContestEngage";

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params.id as string;
  const { brand } = useContext(BrandContext);

  const { data, isPending, refetch } = useGetContestEngage(
    contestId,
    brand?.id || "",
  );

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
    if (!showCheckoutLoading || isPendingContestPayment) return;
    if (contestPayment?.status === "succeeded") {
      setShowCheckoutLoading(false);
      setShowSuccessBanner(true);
    }
  }, [contestPayment, showCheckoutLoading, isPendingContestPayment]);

  if (isPending || isPendingContestPayment) {
    return <Loading isPending={isPending} />;
  }

  if (!data?.competition)
    return (
      <div className="container mx-auto px-4 py-8 relative">
        コンテストが見つかりません
      </div>
    );

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
      <ContestHeader
        contest={data.competition}
        refetch={refetch}
        contestPayment={contestPayment || null}
        applications={data.competition.applications}
      />

      {/* タブ形式のコンテンツ */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="assets">資料など</TabsTrigger>
          <TabsTrigger value="creators">ランキング</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* コンテスト概要 */}
          <ContestOverview contest={data.competition} />
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          {/* イメージ動画 */}
          <ContestAssets contest={data.competition} />
        </TabsContent>

        <TabsContent value="creators" className="space-y-6">
          {/* 参加クリエイター */}
          <ContestCreatorSection
            contest={data.competition}
            contestPayment={contestPayment || null}
          />
        </TabsContent>
      </Tabs>

      {/* 支払い確定待ちのオーバーレイ */}
      <PaymentPollingOverlay
        visible={!!showCheckoutLoading}
        sessionId={sessionId}
        refetchContestPayment={async () => {
          const r = await refetchContestPayment();
          return { data: r.data || null };
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
