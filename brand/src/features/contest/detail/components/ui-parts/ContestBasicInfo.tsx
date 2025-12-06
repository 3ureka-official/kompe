import { Contest, ContestImage, ContestPrize } from "@/types/Contest";
import { formatCurrency } from "@/utils/format";
import { Application } from "@/types/Application";
import { EngagementSection } from "@/features/contest/detail/components/ui-parts/EngagementSection";
import { ContestPeriodStepper } from "@/features/contest/detail/components/ui-elements/ContestPeriodStepper";
import { ImageCarousel } from "@/features/contest/detail/components/ui-elements/ImageCarousel";
import { ShippingSampleNotification } from "@/types/ShippingSampleNotification";

type Props = {
  contest: Contest & {
    contest_prizes?: ContestPrize[];
    contest_images?: ContestImage[];
  };
  applications: Application[];
  shippingNotifications: ShippingSampleNotification[];
};

export function ContestBasicInfo({
  contest,
  applications,
  shippingNotifications,
}: Props) {
  return (
    <div className="mt-4 mb-6 px-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex flex-col gap-2 items-start justify-between px-20 mb-4">
            <h1 className="text-xl font-bold text-gray-900 w-full">
              {contest.title}
            </h1>
            <p className="text-black text-xl font-bold">
              {formatCurrency(
                contest.contest_prizes?.reduce(
                  (sum, prize) => sum + prize.amount,
                  0,
                ) || 0,
              )}
            </p>
          </div>

          {/* サムネイル */}
          <div className="px-20 mb-6">
            <ImageCarousel
              images={contest.contest_images || []}
              alt={contest.title}
            />
          </div>

          <div className="mb-16 flex justify-center">
            <EngagementSection
              videoCount={applications.length}
              views={contest.views}
              likes={contest.likes}
              comments={contest.comments}
              shares={contest.shares}
            />
          </div>

          <div className="py-6 rounded-lg">
            <ContestPeriodStepper
              contest={contest}
              hasNotShippingNotification={
                shippingNotifications.length !== applications.length
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
