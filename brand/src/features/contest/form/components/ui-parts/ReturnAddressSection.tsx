"use client";

import { Control } from "react-hook-form";
import { TextField } from "@/components/ui-elements/form/TextField";
import { SamplesFormData } from "@/features/contest/form/schemas/samplesSchema";

type Props = {
  control: Control<SamplesFormData>;
  sample: SamplesFormData;
};

export function ReturnAddressSection({ control, sample }: Props) {
  if (sample.sample_provide_type !== "RENTAL") {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-gray-900 mb-4">
        返却住所について
      </h4>
      <div className="space-y-4">
        <TextField
          control={control}
          name="sample_return_postal_code"
          label="郵便番号"
          placeholder="123-4567"
          required
        />

        <TextField
          control={control}
          name="sample_return_prefecture"
          label="都道府県"
          placeholder="東京都"
          required
        />

        <TextField
          control={control}
          name="sample_return_city"
          label="市区町村"
          placeholder="渋谷区"
          required
        />

        <TextField
          control={control}
          name="sample_return_address_line"
          label="番地・建物名"
          placeholder="1-2-3 ビル名"
          required
        />
      </div>
    </div>
  );
}
