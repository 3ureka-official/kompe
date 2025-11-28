"use client";

import { Input } from "@/components/ui/Input";
import { SampleProductFormData } from "@/types/SampleProduct";

type Props = {
  sample: SampleProductFormData;
  onChange: (updates: Partial<SampleProductFormData>) => void;
  errors?: {
    return_postal_code?: string;
    return_prefecture?: string;
    return_city?: string;
    return_address_line?: string;
  };
};

export function ReturnAddressSection({ sample, onChange, errors }: Props) {
  if (sample.rental_or_purchase !== "RENTAL") {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-gray-900 mb-4">
        返却住所について
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            郵便番号 <span className="text-red-500">*</span>
          </label>
          <Input
            value={sample.return_postal_code || ""}
            onChange={(value) => onChange({ return_postal_code: value })}
            placeholder="123-4567"
          />
          {errors?.return_postal_code && (
            <p className="mt-1 text-sm text-red-600">
              {errors.return_postal_code}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            都道府県 <span className="text-red-500">*</span>
          </label>
          <Input
            value={sample.return_prefecture || ""}
            onChange={(value) => onChange({ return_prefecture: value })}
            placeholder="東京都"
          />
          {errors?.return_prefecture && (
            <p className="mt-1 text-sm text-red-600">
              {errors.return_prefecture}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            市区町村 <span className="text-red-500">*</span>
          </label>
          <Input
            value={sample.return_city || ""}
            onChange={(value) => onChange({ return_city: value })}
            placeholder="渋谷区"
          />
          {errors?.return_city && (
            <p className="mt-1 text-sm text-red-600">{errors.return_city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            番地・建物名 <span className="text-red-500">*</span>
          </label>
          <Input
            value={sample.return_address_line || ""}
            onChange={(value) => onChange({ return_address_line: value })}
            placeholder="1-2-3 ビル名"
          />
          {errors?.return_address_line && (
            <p className="mt-1 text-sm text-red-600">
              {errors.return_address_line}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
