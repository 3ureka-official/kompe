"use client";

import { SampleProductSection } from "@/features/contest/form/components/ui-parts/SampleProductSection";
import { ReturnAddressSection } from "@/features/contest/form/components/ui-parts/ReturnAddressSection";
import { Toggle } from "@/components/ui-elements/Toggle";
import { LoadingButton } from "@/components/ui-elements/LoadingButton";
import { useSamples } from "@/features/contest/form/hooks/useSamples";
import { ActionButtons } from "./ActionButtons";

export function Samples() {
  const {
    handleSubmit,
    getValues,
    hasSamples,
    sample,
    errors,
    isUpdating,
    handleSampleChange,
    handleToggleChange,
    draft,
    handleNext,
    back,
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
            sample={sample}
            onChange={handleSampleChange}
            errors={
              errors.sample_product_name ||
              errors.sample_rental_or_purchase ||
              errors.sample_price_per_creator ||
              errors.sample_return_postal_code ||
              errors.sample_return_prefecture ||
              errors.sample_return_city ||
              errors.sample_return_address_line
                ? {
                    product_name: errors.sample_product_name?.message,
                    rental_or_purchase:
                      errors.sample_rental_or_purchase?.message,
                    price_per_creator: errors.sample_price_per_creator?.message,
                    return_postal_code:
                      errors.sample_return_postal_code?.message,
                    return_prefecture: errors.sample_return_prefecture?.message,
                    return_city: errors.sample_return_city?.message,
                    return_address_line:
                      errors.sample_return_address_line?.message,
                  }
                : undefined
            }
          />
        </div>
      )}

      {/* 返却住所についてセクション */}
      {hasSamples && sample.rental_or_purchase === "RENTAL" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <ReturnAddressSection
            sample={sample}
            onChange={handleSampleChange}
            errors={
              errors.sample_return_postal_code ||
              errors.sample_return_prefecture ||
              errors.sample_return_city ||
              errors.sample_return_address_line
                ? {
                    return_postal_code:
                      errors.sample_return_postal_code?.message,
                    return_prefecture: errors.sample_return_prefecture?.message,
                    return_city: errors.sample_return_city?.message,
                    return_address_line:
                      errors.sample_return_address_line?.message,
                  }
                : undefined
            }
          />
        </div>
      )}

      <ActionButtons
        isLoading={isUpdating}
        handleDraft={draft}
        handleBack={() => back(getValues())}
        handleNext={handleSubmit((data) => handleNext(data))}
        needSubmitButton={false}
      />
    </div>
  );
}
