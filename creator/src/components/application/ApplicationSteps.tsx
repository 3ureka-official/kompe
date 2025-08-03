"use client";

import { ApplicationStep } from "@/types/application";
import { CheckCircle2, Circle } from "lucide-react";

interface ApplicationStepsProps {
  steps: ApplicationStep[];
  className?: string;
}

export function ApplicationSteps({
  steps,
  className = "",
}: ApplicationStepsProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* ステップ */}
            <div className="flex flex-col items-center">
              {/* アイコン */}
              <div className="flex items-center justify-center mb-2">
                {step.isCompleted ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <Circle className="w-8 h-8 text-gray-300" />
                )}
              </div>

              {/* ステップ情報 */}
              <div className="text-center max-w-32">
                <div
                  className={`text-sm font-medium mb-1 ${
                    step.isCompleted
                      ? "text-green-600"
                      : step.isActive
                        ? "text-primary-600"
                        : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  {step.description}
                </div>
              </div>
            </div>

            {/* 区切り線 */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-200 mx-4 mt-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
