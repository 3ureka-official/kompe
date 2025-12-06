"use client";

import { SampleProductSection } from "@/features/contest/form/components/ui-parts/SampleProductSection";
import { ReturnAddressSection } from "@/features/contest/form/components/ui-parts/ReturnAddressSection";
import { Toggle } from "@/components/ui-elements/Toggle";
import { useSamples } from "@/features/contest/form/hooks/useSamples";
import { ActionButtons } from "./ActionButtons";

export function Samples() {
  const {
    control,
    hasSamples,
    sample,
    watchSampleImageUrl,
    isPending,
    handleToggleChange,
    handleSampleImageSubmit,
    handleDeleteSampleImage,
    handleDraft,
    handleNext,
    handleBack,
  } = useSamples();

  return (
    <div className="flex flex-col gap-8">
      {/* トグルスイッチ */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <Toggle
          id="has_samples"
          checked={hasSamples}
          onChange={handleToggleChange}
          label="試供品を提供する"
        />
      </div>

      {/* 商品についてセクション */}
      {hasSamples && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <SampleProductSection
            control={control}
            sampleImageUrl={watchSampleImageUrl}
            onSampleImageSubmit={handleSampleImageSubmit}
            onDeleteSampleImage={handleDeleteSampleImage}
            isLoading={isPending}
          />
        </div>
      )}

      {/* 返却住所についてセクション */}
      {hasSamples && sample.sample_provide_type === "RENTAL" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <ReturnAddressSection control={control} sample={sample} />
        </div>
      )}

      <ActionButtons
        isLoading={isPending}
        handleDraft={handleDraft}
        handleBack={handleBack}
        handleNext={handleNext}
        needSubmitButton={false}
      />
    </div>
  );
}
