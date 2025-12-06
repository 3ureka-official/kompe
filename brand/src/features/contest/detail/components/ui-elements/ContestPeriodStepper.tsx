import { Contest } from "@/types/Contest";
import { formatPeriod } from "@/utils/format";
import {
  getContestStatusType,
  getContestDetailStatusType,
} from "@/utils/getContestStatus";
import {
  CalendarIcon,
  ClockIcon,
  VideoIcon,
  CrownIcon,
  CheckCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  contest: Contest;
  className?: string;
  hasNotShippingNotification: boolean;
};

type StepStatus = "completed" | "current" | "upcoming";

type Step = {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: StepStatus;
  period?: string;
  description?: string;
};

/**
 * コンテストの期間をステッパー形式で表示するコンポーネント
 */
export function ContestPeriodStepper({
  contest,
  hasNotShippingNotification,
  className = "",
}: Props) {
  const statusType = getContestStatusType(contest);
  const detailStatusType = getContestDetailStatusType(contest);

  const getStepStatus = (stepId: string): StepStatus => {
    if (statusType === "draft") {
      return "upcoming";
    }

    const stepOrder = [
      "scheduled",
      "entry",
      "video_production",
      "contest",
      "ended",
    ];
    const currentIndex = stepOrder.indexOf(
      statusType === "holding" ? detailStatusType : statusType,
    );
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const steps: Step[] = [
    {
      id: "scheduled",
      label: "開催前",
      icon: <CalendarIcon className="w-5 h-5" />,
      status: getStepStatus("scheduled"),
      description:
        "コンテスト開催予定です。応募期間が始まり次第、クリエイターが応募できるようになります。",
    },
    {
      id: "entry",
      label: "応募期間",
      icon: <ClockIcon className="w-5 h-5" />,
      status: getStepStatus("entry"),
      period: formatPeriod(contest.entry_start_date, contest.entry_end_date),
      description: "応募期間です。クリエイターが応募できるようになります。",
    },
    {
      id: "video_production",
      label: "動画制作",
      icon: <VideoIcon className="w-5 h-5" />,
      status: getStepStatus("video_production"),
      period: formatPeriod(
        contest.video_production_start_date,
        contest.video_production_end_date,
      ),
      description: "動画制作期間です。",
    },
    {
      id: "contest",
      label: "開催期間",
      icon: <CrownIcon className="w-5 h-5" />,
      status: getStepStatus("contest"),
      period: formatPeriod(
        contest.contest_start_date,
        contest.contest_end_date,
      ),
      description:
        "開催期間です。クリエイターが動画を投稿できるようになります。また、再生数によってランキングが決定します。",
    },
    {
      id: "ended",
      label: "終了",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      status: getStepStatus("ended"),
      description:
        "コンテストが終了しました。ランキングによって賞金が分配されました。",
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className={`w-full ${className}`}>
        <div className="flex items-start justify-between">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.id}
                className={cn("flex flex-col flex-1 items-center")}
                style={{ minWidth: 0 }}
              >
                {/* ステップインジケーター行 */}
                <div className="flex items-center w-full">
                  {/* 左側のライン（または開催前の空スペース） */}
                  {isFirst ? (
                    <div className="flex-1" />
                  ) : (
                    <div
                      className={cn(
                        "flex-1 h-1",
                        step.status === "upcoming"
                          ? "bg-gray-200"
                          : "bg-primary",
                      )}
                    />
                  )}

                  {/* アイコン */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all shrink-0",
                      step.status === "completed" &&
                        "bg-primary border-primary text-white",
                      step.status === "current" &&
                        "bg-primary border-primary text-white ring-4 ring-primary/20",
                      step.status === "upcoming" &&
                        "bg-white border-gray-300 text-gray-400",
                    )}
                  >
                    {step.icon}
                  </div>

                  {/* 右側のライン（または終了の空スペース） */}
                  {isLast ? (
                    <div className="flex-1" />
                  ) : (
                    <div
                      className={cn(
                        "flex-1 h-1",
                        steps[index + 1].status === "upcoming"
                          ? "bg-gray-200"
                          : "bg-primary",
                      )}
                    />
                  )}
                </div>

                {/* ラベルと期間 */}
                <div className={cn("mt-3", "text-center")}>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      step.status === "current" && "text-primary",
                      step.status === "completed" && "text-gray-700",
                      step.status === "upcoming" && "text-gray-400",
                    )}
                  >
                    {step.label}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      step.status === "current" && "text-primary",
                      step.status === "completed" && "text-gray-500",
                      step.status === "upcoming" && "text-gray-400",
                    )}
                  >
                    {step.period || "\u00A0"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-sm ">
          {steps.find((step) => step.status === "current")?.description}
        </p>
        {contest.has_sample &&
          hasNotShippingNotification &&
          steps.find((step) => step.status === "current")?.id && (
            <p className="text-sm text-red-500">
              「参加クリエイター」タブから試供品の発送先をご確認して、配送してください。
              <br />
              配送後は「参加クリエイター」タブの「配送通知」ボタンから配送完了としてください。
            </p>
          )}
      </div>
    </div>
  );
}
