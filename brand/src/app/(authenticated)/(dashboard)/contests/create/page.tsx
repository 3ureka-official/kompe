'use client';

import { Stepper } from '@/components/contests/create/Stepper';
import { BasicInfo } from '@/components/contests/create/BasicInfo';
import { Brief } from '@/components/contests/create/Brief';
import { Resources } from '@/components/contests/create/Resources';
import { Prize } from '@/components/contests/create/Prize';
import { useCreateContest } from '@/hooks/useCreateContest';

const steps = [
  { id: 'basic', title: '基本情報' },
  { id: 'brief', title: 'コンテスト概要' },
  { id: 'resources', title: 'リソース' },
  { id: 'prize', title: '賞金設定' },
];

export default function CreateContestPage() {
  const {
    formData,
    currentStep,
    error,
    updateFormData,
    handleNext,
    handlePrev,
    handleSubmit
  } = useCreateContest();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo data={formData} onUpdate={updateFormData} onNext={handleNext} />;
      case 1:
        return <Brief data={formData} onUpdate={updateFormData} onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <Resources data={formData} onUpdate={updateFormData} onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <Prize data={formData} onUpdate={updateFormData} onPrev={handlePrev} onSubmit={handleSubmit} />;
      default:
        return <BasicInfo data={formData} onUpdate={updateFormData} onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8">
        <Stepper steps={steps} currentStep={currentStep} />

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
} 