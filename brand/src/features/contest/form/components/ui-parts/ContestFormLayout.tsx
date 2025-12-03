"use client";

import { useContext } from "react";
import { Stepper } from "../ui-elements/Stepper";
import { BasicInfo } from "@/features/contest/form/components/ui-parts/BasicInfo";
import { Brief } from "@/features/contest/form/components/ui-parts/Brief";
import { Resources } from "@/features/contest/form/components/ui-parts/Resources";
import { Samples } from "@/features/contest/form/components/ui-parts/Samples";
import { Prize } from "@/features/contest/form/components/ui-parts/Prize";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";

export const steps = [
  { id: "basic", view: <BasicInfo />, title: "基本情報" },
  { id: "samples", view: <Samples />, title: "試供品" },
  { id: "brief", view: <Brief />, title: "コンテスト概要" },
  { id: "resources", view: <Resources />, title: "リソース" },
  { id: "prize", view: <Prize />, title: "賞金設定" },
];

export function ContestFormLayout() {
  const { step } = useContext(CreateContestContext);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Stepper steps={steps} currentStep={step} />

      <div className="mt-8">{steps[step].view}</div>
    </div>
  );
}
