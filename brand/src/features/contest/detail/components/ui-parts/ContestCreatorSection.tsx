import { useMemo, useState } from "react";
import { Contest, ContestPrize } from "@/types/Contest";
import { useGetApplication } from "@/features/contest/detail/hooks/useGetApplication";
import { formatDateTime } from "@/utils/format";
import { getContestDetailStatusType } from "@/utils/getContestStatus";
import { ApplicationTable } from "@/features/contest/detail/components/ui-elements/ApplicationTable";
import { RankingTable } from "@/features/contest/detail/components/ui-elements/RankingTable";
import { ShippingNotificationDialog } from "@/features/contest/detail/components/ui-parts/ShippingNotificationDialog";
import { useGetShippingNotifications } from "@/features/contest/detail/hooks/useShippingSampleNotification";
import { Application } from "@/types/Application";

type Props = {
  contest: Contest & { contest_prizes?: ContestPrize[] };
};

export function ContestCreatorSection({ contest }: Props) {
  const { getApplicationQuery } = useGetApplication(contest.id);
  const { data: applications, isPending } = getApplicationQuery;

  const { data: shippingNotifications } = useGetShippingNotifications(
    contest.id,
  );

  const status = getContestDetailStatusType(contest);

  // 応募期間・動画制作期間は ApplicationTable、開催期間・終了は RankingTable
  const showApplicationTable =
    status === "entry" || status === "video_production";

  // ダイアログの状態管理
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // ソート済みのアプリケーションリスト
  const sortedApplications = useMemo(() => {
    if (!applications) return [];

    if (showApplicationTable) {
      // 応募期間・動画制作期間：応募日が新しい順
      return [...applications].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else {
      // 開催期間・終了：再生数が多い順（順位が高い順）
      return [...applications].sort((a, b) => b.views - a.views);
    }
  }, [applications, showApplicationTable]);

  const handleShippingNotify = (application: Application) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between my-6">
        <div className="text-sm text-gray-500">
          {applications?.length}名が参加中
        </div>
        {!showApplicationTable && applications && applications.length > 0 && (
          <div className="text-sm text-gray-500">
            更新時間：{formatDateTime(new Date(contest.updated_engagement_at))}
          </div>
        )}
      </div>

      {showApplicationTable ? (
        <ApplicationTable
          applications={sortedApplications}
          shippingNotifications={shippingNotifications}
          onShippingNotify={handleShippingNotify}
        />
      ) : (
        <RankingTable
          applications={sortedApplications}
          contestPrizes={contest.contest_prizes}
        />
      )}

      <ShippingNotificationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        application={selectedApplication}
        contestId={contest.id}
        brandId={contest.brand_id}
        shippingNotifications={shippingNotifications || []}
      />
    </div>
  );
}
