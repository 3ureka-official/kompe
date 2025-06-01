'use client';

import { useState } from 'react';
import { Stepper } from '@/components/create-contest/Stepper';
import { BasicInfo } from '@/components/create-contest/BasicInfo';
import { BrandInfo } from '@/components/create-contest/BrandInfo';
import { Brief } from '@/components/create-contest/Brief';
import { Resources } from '@/components/create-contest/Resources';
import { Prize } from '@/components/create-contest/Prize';
import { createContest } from '@/services/contentestService';
import { Contest } from '@/types/contest';

const steps = [
  { id: 'basic', title: '基本情報' },
  { id: 'brief', title: 'コンテスト概要' },
  { id: 'resources', title: 'リソース' },
  { id: 'prize', title: '賞金設定' },
];

export default function CreateContestPage() {
  const [contest, setContest] = useState<Contest | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (contest) {
      createContest(contest);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo onNext={handleNext} />;
      case 1:
        return <Brief onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <Resources onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <Prize onPrev={handlePrev} onSubmit={handleSubmit} />;
      default:
        return <BasicInfo onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
} 