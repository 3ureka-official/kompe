"use client";

import { cn } from "@/lib/utils";
import { PackageIcon, TruckIcon, CheckCircleIcon } from "lucide-react";

type SampleShippingStepperProps = {
  status: "pending" | "shipped" | "delivered" | null;
  className?: string;
};

type StepStatus = "completed" | "current" | "upcoming";

type Step = {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: StepStatus;
};

export function SampleShippingStepper({
  status,
  className = "",
}: SampleShippingStepperProps) {
  const getStepStatus = (stepId: string): StepStatus => {
    if (!status) {
      return stepId === "pending" ? "current" : "upcoming";
    }

    const stepOrder = ["pending", "shipped", "delivered"];
    const currentIndex = stepOrder.indexOf(status);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
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
      id: "delivered",
      label: "到着済み",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      status: getStepStatus("delivered"),
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className="flex flex-col flex-1 items-center"
              style={{ minWidth: 0 }}
            >
              {/* ステップインジケーター行 */}
              <div className="flex items-center w-full">
                {/* 左側のライン（または最初のステップの空スペース） */}
                {isFirst ? (
                  <div className="flex-1" />
                ) : (
                  <div
                    className={cn(
                      "flex-1 h-1",
                      step.status === "upcoming" ? "bg-gray-200" : "bg-primary",
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

                {/* 右側のライン（または最後のステップの空スペース） */}
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
              <div className="mt-3 text-center">
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
  );
}
