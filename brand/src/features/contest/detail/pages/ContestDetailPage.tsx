"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ContestHeader } from "@/features/contest/detail/components/ui-parts/ContestHeader";
import { ContestOverview } from "@/features/contest/detail/components/ui-parts/ContestOverview";
import { ContestAssets } from "@/features/contest/detail/components/ui-parts/ContestAssets";
import { ContestCreatorSection } from "@/features/contest/detail/components/ui-parts/ContestCreatorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useContext } from "react";
import { useGetContestPayment } from "@/features/contest/detail/hooks/useGetPayment";
import { PaymentPollingOverlay } from "@/features/contest/detail/components/ui-parts/PaymentPollingOverlay";
import { AlertCancel } from "@/features/contest/detail/components/ui-parts/AlertCancel";
import { AlertSuccess } from "@/features/contest/detail/components/ui-parts/AlertSuccess";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { Loading } from "@/components/ui-elements/Loading";
import { useGetContestEngage } from "@/features/contest/detail/hooks/useGetContestEngage";
import { useContestDetailPage } from "@/features/contest/detail/hooks/useContestDetailPage";

export function ContestDetailPage() {
  const params = useParams();
  const contestId = params.id as string;
  const { brand } = useContext(AuthContext);

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

  const {
    showCancelCheckoutAlert,
    setShowCancelCheckoutAlert,
    showCheckoutLoading,
    setShowCheckoutLoading,
    showSuccessBanner,
    setShowSuccessBanner,
    handlePollingSuccess,
    handlePollingFailed,
  } = useContestDetailPage({
    checkout,
    contestPayment: contestPayment || null,
    isPendingContestPayment,
  });

  if (isPending || isPendingContestPayment) {
    return <Loading isPending={isPending} />;
  }

  if (!data?.competition)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            コンテストが見つかりません
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-16 lg:px-20 py-8 relative">
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

        {/* メインコンテンツカード */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-6 min-h-svh">
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

            <TabsContent value="overview" className="space-y-6 px-6">
              {/* コンテスト概要 */}
              <ContestOverview contest={data.competition} />
            </TabsContent>

            <TabsContent value="assets" className="space-y-6 px-6">
              {/* イメージ動画 */}
              <ContestAssets contest={data.competition} />
            </TabsContent>

            <TabsContent value="creators" className="space-y-6 px-6">
              {/* 参加クリエイター */}
              <ContestCreatorSection contest={data.competition} />
            </TabsContent>
          </Tabs>
        </div>

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
            handlePollingSuccess();
            // 必要ならここで refetch() してヘッダ等を更新
            refetch();
          }}
          onFailed={handlePollingFailed}
        />
      </div>
    </div>
  );
}
