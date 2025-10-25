"use client";

import { useContext, useEffect, useState } from "react";
import { Stepper } from "@/components/contests/create/Stepper";
import { BasicInfo } from "@/components/contests/create/BasicInfo";
import { Brief } from "@/components/contests/create/Brief";
import { Resources } from "@/components/contests/create/Resources";
import { Prize } from "@/components/contests/create/Prize";
import {
  CreateContestContext,
  CreateContestProvider,
} from "@/contexts/CreateContestContext";
import { BrandContext } from "@/contexts/BrandContext";

const steps = [
  { id: "basic", title: "基本情報" },
  { id: "brief", title: "コンテスト概要" },
  { id: "resources", title: "リソース" },
  { id: "prize", title: "賞金設定" },
];

function CreateContestContent() {
  const { step, initContest } = useContext(CreateContestContext);
  const { brand } = useContext(BrandContext);
  const [hasInitialized, setHasInitialized] = useState(false);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BasicInfo />;
      case 1:
        return <Brief />;
      case 2:
        return <Resources />;
      case 3:
        return <Prize />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (brand?.id && !hasInitialized) {
      initContest(brand.id);
      setHasInitialized(true);
    }
  }, [brand?.id, initContest, hasInitialized]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Stepper steps={steps} currentStep={step} />

      <div className="mt-8">{renderStep()}</div>
    </div>
  );
}

export default function CreateContestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CreateContestProvider>
        <CreateContestContent />
      </CreateContestProvider>
    </div>
  );
}
