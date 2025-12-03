import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { steps } from "@/features/contest/form/components/ui-parts/ContestFormLayout";

function useContestNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLパラメータからstepを取得（デフォルトは0）
  const stepParam = searchParams.get("step");
  const step =
    stepParam && parseInt(stepParam) < steps.length
      ? parseInt(stepParam, 10)
      : 0;

  const setStep = useCallback(
    (newStep: number | ((prev: number) => number)) => {
      const stepValue = typeof newStep === "function" ? newStep(step) : newStep;
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", stepValue.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [step, searchParams, router],
  );

  return {
    step,
    setStep,
  };
}

export { useContestNavigation };
