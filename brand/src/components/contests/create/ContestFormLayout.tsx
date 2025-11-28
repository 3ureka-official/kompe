"use client";

import { useContext } from "react";
import { Stepper } from "./ui/Stepper";
import { BasicInfo } from "@/components/contests/create/BasicInfo";
import { Brief } from "@/components/contests/create/Brief";
import { Resources } from "@/components/contests/create/Resources";
import { Samples } from "@/components/contests/create/Samples";
import { Prize } from "@/components/contests/create/Prize";
import { CreateContestContext } from "@/contexts/CreateContestContext";

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
