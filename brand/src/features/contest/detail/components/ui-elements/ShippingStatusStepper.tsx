import {
  PackageIcon,
  TruckIcon,
  PackageCheckIcon,
  CheckCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  currentStatus: "pending" | "shipped" | "delivered";
  className?: string;
};

type StepStatus = "completed" | "current" | "upcoming";

type Step = {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: StepStatus;
};

/**
 * 配送状況をステッパー形式で表示するコンポーネント
 */
export function ShippingStatusStepper({
  currentStatus,
  className = "",
}: Props) {
  const getStepStatus = (stepId: string): StepStatus => {
    if (currentStatus === "pending") {
      return stepId === "pending" ? "current" : "upcoming";
    } else if (currentStatus === "shipped") {
      // 発送済みと発送中は同じタイミングで色がつく
      if (stepId === "pending") return "completed";
      if (stepId === "shipped" || stepId === "in_transit") return "current";
      return "upcoming";
    } else {
      // currentStatus === "delivered"
      if (stepId === "delivered") return "current";
      return "completed";
    }
  };

  const steps: Step[] = [
    {
      id: "pending",
      label: "発送前",
      icon: <PackageIcon className="w-5 h-5" />,
      status: getStepStatus("pending"),
    },
    {
      id: "shipped",
      label: "発送済み",
      icon: <TruckIcon className="w-5 h-5" />,
      status: getStepStatus("shipped"),
    },
    {
      id: "in_transit",
      label: "発送中",
      icon: <PackageCheckIcon className="w-5 h-5" />,
      status: getStepStatus("in_transit"),
    },
    {
      id: "delivered",
      label: "配達済み",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      status: getStepStatus("delivered"),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
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
                  {/* 左側のライン（または発送前の空スペース） */}
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

                  {/* 右側のライン（または発送済みの空スペース） */}
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

                {/* ラベル */}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-4">
        {currentStatus === "pending" ? (
          <p className="text-sm text-gray-600 text-center">
            試供品を発送後にクリエイターに知らせる必要があります。
            <br />
            「配送通知」ボタンから発送通知をクリエイターに送信してください。
          </p>
        ) : currentStatus === "shipped" ? (
          <p className="text-sm text-gray-600 text-center">
            クリエイターの発送確認が完了すると、発送済みに進みます
          </p>
        ) : currentStatus === "delivered" ? (
          <p className="text-sm text-gray-600 text-center">
            クリエイターの配達確認が完了しました。
          </p>
        ) : null}
      </div>
    </div>
  );
}
