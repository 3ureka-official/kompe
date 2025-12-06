"use client";

import { contests } from "@prisma/client";
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
import { cn } from "@/lib/utils";

type Props = {
  contest: contests;
  className?: string;
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
export function ContestPeriodStepper({ contest, className = "" }: Props) {
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
        "コンテスト開催予定です。応募期間が始まり次第、応募できるようになります。",
    },
    {
      id: "entry",
      label: "応募期間",
      icon: <ClockIcon className="w-5 h-5" />,
      status: getStepStatus("entry"),
      period: formatPeriod(contest.entry_start_date, contest.entry_end_date),
      description: "応募期間です。コンテストに応募できます。",
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
        "開催期間です。応募期間中に投稿した動画を結びつけることができます。",
    },
    {
      id: "ended",
      label: "終了",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      status: getStepStatus("ended"),
      description: "コンテストが終了しました。",
    },
  ];

  return (
    <div className={`flex gap-6 ${className}`}>
      {/* ステッパー（左側） */}
      <div className="flex flex-col items-center">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex flex-col items-center">
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

              {/* 縦のライン（最後のステップ以外） */}
              {!isLast && (
                <div
                  className={cn(
                    "w-1 min-h-[30px]",
                    steps[index + 1].status === "upcoming"
                      ? "bg-gray-200"
                      : "bg-primary",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ラベルと期間（右側） */}
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col justify-start pt-[8px]",
                !isLast && "min-h-[70px]",
              )}
            >
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
          );
        })}
      </div>
    </div>
  );
}
