"use client";

import { Input } from "@/components/ui/Input";
import { NumberInput } from "@/components/ui/NumberInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { SampleProductFormData } from "@/types/SampleProduct";

type Props = {
  sample: SampleProductFormData;
  onChange: (updates: Partial<SampleProductFormData>) => void;
  errors?: {
    product_name?: string;
    rental_or_purchase?: string;
    price_per_creator?: string;
    return_postal_code?: string;
    return_prefecture?: string;
    return_city?: string;
    return_address_line?: string;
  };
};

export function SampleProductSection({ sample, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-gray-900 mb-4">
        商品について
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商品名 <span className="text-red-500">*</span>
          </label>
          <Input
            value={sample.product_name}
            onChange={(value) => onChange({ product_name: value })}
            placeholder="試供品の商品名"
          />
          {errors?.product_name && (
            <p className="mt-1 text-sm text-red-600">{errors.product_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            貸す/購入 <span className="text-red-500">*</span>
          </label>
          <RadioGroup
            value={sample.rental_or_purchase}
            onValueChange={(value: "RENTAL" | "PURCHASE") =>
              onChange({ rental_or_purchase: value })
            }
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="RENTAL" id="rental" />
              <label htmlFor="rental">貸す</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="PURCHASE" id="purchase" />
              <label htmlFor="purchase">購入</label>
            </div>
          </RadioGroup>
          {errors?.rental_or_purchase && (
            <p className="mt-1 text-sm text-red-600">
              {errors.rental_or_purchase}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1クリエイターあたりの金額 <span className="text-red-500">*</span>
          </label>
          <NumberInput
            value={sample.price_per_creator}
            onChange={(value) =>
              onChange({ price_per_creator: Number(value) || 0 })
            }
            min={0}
            placeholder="金額"
          />
          {errors?.price_per_creator && (
            <p className="mt-1 text-sm text-red-600">
              {errors.price_per_creator}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
