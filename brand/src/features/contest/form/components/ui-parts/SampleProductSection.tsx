"use client";

import { Control } from "react-hook-form";
import { TextField } from "@/components/ui-elements/form/TextField";
import { SamplesFormData } from "@/features/contest/form/schemas/samplesSchema";
import { RadioField } from "@/components/ui-elements/form/RadioField";
import { ImageUploadField } from "@/features/contest/form/components/ui-elements/ImageUploadField";
import { SAMPLE_OPTIONS } from "@/features/contest/common/constants/contest.constant";

type Props = {
  control: Control<SamplesFormData>;
  sampleImageUrl: string;
  onSampleImageSubmit: (file: File | null) => void;
  onDeleteSampleImage: () => void;
  isLoading: boolean;
};

export function SampleProductSection({
  control,
  sampleImageUrl,
  onSampleImageSubmit,
  onDeleteSampleImage,
  isLoading,
}: Props) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-gray-900 mb-4">
        商品について
      </h4>
      <div className="flex gap-4">
        <TextField
          control={control}
          name="sample_product_name"
          label="商品名"
          placeholder="試供品の商品名"
          required
        />

        <RadioField
          control={control}
          name="sample_provide_type"
          label="レンタル/提供"
          required
          options={SAMPLE_OPTIONS}
        />
      </div>

      <ImageUploadField
        control={control}
        name="sample_image_url"
        label="試供品の画像"
        handleSubmit={onSampleImageSubmit}
        handleDelete={onDeleteSampleImage}
        selectedFileUrl={sampleImageUrl}
        hasSelected={!!sampleImageUrl}
        disabled={isLoading}
      />
    </div>
  );
}
