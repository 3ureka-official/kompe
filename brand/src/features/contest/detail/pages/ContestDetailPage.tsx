"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ContestBasicInfo } from "@/features/contest/detail/components/ui-parts/ContestBasicInfo";
import { ContestHeader } from "@/features/contest/detail/components/ui-parts/ContestHeader";
import { ContestOverview } from "@/features/contest/detail/components/ui-parts/ContestOverview";
import { ContestAssets } from "@/features/contest/detail/components/ui-parts/ContestAssets";
import { ContestCreatorSection } from "@/features/contest/detail/components/ui-parts/ContestCreatorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useContext, useMemo } from "react";
import { useGetContestPayment } from "@/features/contest/detail/hooks/useGetPayment";
import { PaymentPollingOverlay } from "@/features/contest/detail/components/ui-parts/PaymentPollingOverlay";
import { PaymentSuccessDialog } from "@/features/contest/detail/components/ui-parts/PaymentSuccessDialog";
import { PaymentFailedDialog } from "@/features/contest/detail/components/ui-parts/PaymentFailedDialog";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { Loading } from "@/components/ui-elements/Loading";
import { useGetContestEngage } from "@/features/contest/detail/hooks/useGetContestEngage";
import { useContestDetailPage } from "@/features/contest/detail/hooks/useContestDetailPage";
import { ContestSample } from "@/features/contest/detail/components/ui-parts/ContestSample";
import { useGetShippingNotifications } from "@/features/contest/detail/hooks/useShippingSampleNotification";
import { getContestDetailStatusType } from "@/utils/getContestStatus";

export function ContestDetailPage() {
  const params = useParams();
  const router = useRouter();
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

  const { data: shippingNotifications } =
    useGetShippingNotifications(contestId);

  // 応募期間または動画制作期間で、未発送があるかどうか
  const hasUnshippedApplications = useMemo(() => {
    if (!data?.competition) return false;

    const status = getContestDetailStatusType(data.competition);
    const isApplicationPeriod =
      status === "entry" || status === "video_production";

    if (!isApplicationPeriod) return false;

    const applications = data.competition.applications || [];
    const shippedApplicationIds = new Set(
      (shippingNotifications || []).map((n) => n.application_id),
    );

    return applications.some((app) => !shippedApplicationIds.has(app.id));
  }, [data?.competition, shippingNotifications]);

  const searchParams = useSearchParams();
  const checkout = searchParams.get("checkout");
  const tabParam = searchParams.get("tab") || "overview";

  // タブの値を管理（既存のパラメータを保持）
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`/contests/${contestId}?${params.toString()}`);
  };

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
      <div className="max-w-5xl mx-auto px-4 sm:px-16 lg:px-20 py-8 relative">
        {/* メインコンテンツカード */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-svh">
          {/* ヘッダー */}
          <ContestHeader contest={data.competition} refetch={refetch} />

          <ContestBasicInfo
            contest={data.competition}
            applications={data.competition.applications}
            shippingNotifications={shippingNotifications || []}
          />

          {/* タブ形式のコンテンツ */}
          <Tabs value={tabParam} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">概要</TabsTrigger>
              <TabsTrigger value="sample">試供品</TabsTrigger>
              <TabsTrigger value="assets">資料など</TabsTrigger>
              <TabsTrigger value="creators" className="relative">
                <span className="relative">
                  参加クリエイター
                  {hasUnshippedApplications && (
                    <span className="absolute -top-3 -right-3 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 px-6">
              {/* コンテスト概要 */}
              <ContestOverview contest={data.competition} />
            </TabsContent>

            <TabsContent value="sample" className="space-y-6 px-6">
              {/* 試供品 */}
              <ContestSample contest={data.competition} />
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

        {/* 支払い成功ダイアログ */}
        <PaymentSuccessDialog
          open={showSuccessBanner}
          onClose={() => {
            setShowSuccessBanner(false);
            router.replace(`/contests/${contestId}`);
          }}
        />

        {/* 支払い失敗ダイアログ */}
        <PaymentFailedDialog
          open={showCancelCheckoutAlert}
          onClose={() => setShowCancelCheckoutAlert(false)}
        />
      </div>
    </div>
  );
}
