"use client";

import { Button } from "@/components/ui/Button";
import { useContext, useEffect, useState, useMemo } from "react";
import { CreateContestContext } from "@/contexts/CreateContestContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  samplesSchema,
  ContestCreateFormData,
} from "@/schema/createContestSchema";
import { SampleProductFormData } from "@/types/SampleProduct";
import { SampleProductSection } from "./SampleProductSection";
import { ReturnAddressSection } from "./ReturnAddressSection";
import { Toggle } from "@/components/ui/Toggle";
import * as yup from "yup";

const defaultSample: SampleProductFormData = {
  product_name: "",
  rental_or_purchase: "RENTAL",
  price_per_creator: 0,
  return_postal_code: null,
  return_prefecture: null,
  return_city: null,
  return_address_line: null,
};

export function Samples() {
  const { data, back, submit, isUpdating, updateData, next } =
    useContext(CreateContestContext);

  // 既存データから試供品情報を取得
  const existingHasSample =
    (data as Partial<ContestCreateFormData>).has_sample || false;
  const existingSample: SampleProductFormData | null = existingHasSample
    ? {
        product_name:
          (data as Partial<ContestCreateFormData>).sample_product_name || "",
        rental_or_purchase:
          ((data as Partial<ContestCreateFormData>)
            .sample_rental_or_purchase as "RENTAL" | "PURCHASE") || "RENTAL",
        price_per_creator:
          (data as Partial<ContestCreateFormData>).sample_price_per_creator ||
          0,
        return_postal_code:
          (data as Partial<ContestCreateFormData>).sample_return_postal_code ||
          null,
        return_prefecture:
          (data as Partial<ContestCreateFormData>).sample_return_prefecture ||
          null,
        return_city:
          (data as Partial<ContestCreateFormData>).sample_return_city || null,
        return_address_line:
          (data as Partial<ContestCreateFormData>).sample_return_address_line ||
          null,
      }
    : null;

  const [hasSamples, setHasSamples] = useState<boolean>(existingHasSample);
  const [sample, setSample] = useState<SampleProductFormData>(
    existingSample || defaultSample,
  );

  // バリデーション用のコンテキストをメモ化
  const validationContext = useMemo(() => ({ hasSamples }), [hasSamples]);

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(samplesSchema),
    context: validationContext,
    mode: "onSubmit",
    defaultValues: {
      has_sample: hasSamples,
      sample_product_name: sample.product_name || null,
      sample_rental_or_purchase: sample.rental_or_purchase || null,
      sample_price_per_creator: sample.price_per_creator || null,
      sample_return_postal_code: sample.return_postal_code || null,
      sample_return_prefecture: sample.return_prefecture || null,
      sample_return_city: sample.return_city || null,
      sample_return_address_line: sample.return_address_line || null,
    },
  });

  useEffect(() => {
    const existingHasSample =
      (data as Partial<ContestCreateFormData>).has_sample || false;
    const existingSample: SampleProductFormData | null = existingHasSample
      ? {
          product_name:
            (data as Partial<ContestCreateFormData>).sample_product_name || "",
          rental_or_purchase:
            ((data as Partial<ContestCreateFormData>)
              .sample_rental_or_purchase as "RENTAL" | "PURCHASE") || "RENTAL",
          price_per_creator:
            (data as Partial<ContestCreateFormData>).sample_price_per_creator ||
            0,
          return_postal_code:
            (data as Partial<ContestCreateFormData>)
              .sample_return_postal_code || null,
          return_prefecture:
            (data as Partial<ContestCreateFormData>).sample_return_prefecture ||
            null,
          return_city:
            (data as Partial<ContestCreateFormData>).sample_return_city || null,
          return_address_line:
            (data as Partial<ContestCreateFormData>)
              .sample_return_address_line || null,
        }
      : null;
    setHasSamples(existingHasSample);
    setSample(existingSample || defaultSample);
    reset({
      has_sample: existingHasSample,
      sample_product_name: existingSample?.product_name || null,
      sample_rental_or_purchase: existingSample?.rental_or_purchase || null,
      sample_price_per_creator: existingSample?.price_per_creator || null,
      sample_return_postal_code: existingSample?.return_postal_code || null,
      sample_return_prefecture: existingSample?.return_prefecture || null,
      sample_return_city: existingSample?.return_city || null,
      sample_return_address_line: existingSample?.return_address_line || null,
    });
  }, [data, reset]);

  const handleSampleChange = (updates: Partial<SampleProductFormData>) => {
    const updatedSample = { ...sample, ...updates };
    setSample(updatedSample);
    setValue("sample_product_name", updatedSample.product_name, {
      shouldValidate: false,
    });
    setValue("sample_rental_or_purchase", updatedSample.rental_or_purchase, {
      shouldValidate: false,
    });
    setValue("sample_price_per_creator", updatedSample.price_per_creator, {
      shouldValidate: false,
    });
    setValue("sample_return_postal_code", updatedSample.return_postal_code, {
      shouldValidate: false,
    });
    setValue("sample_return_prefecture", updatedSample.return_prefecture, {
      shouldValidate: false,
    });
    setValue("sample_return_city", updatedSample.return_city, {
      shouldValidate: false,
    });
    setValue("sample_return_address_line", updatedSample.return_address_line, {
      shouldValidate: false,
    });
  };

  const handleToggleChange = (checked: boolean) => {
    setHasSamples(checked);
    setValue("has_sample", checked, { shouldValidate: false });
    if (!checked) {
      setSample(defaultSample);
      setValue("sample_product_name", null, { shouldValidate: false });
      setValue("sample_rental_or_purchase", null, { shouldValidate: false });
      setValue("sample_price_per_creator", null, { shouldValidate: false });
      setValue("sample_return_postal_code", null, { shouldValidate: false });
      setValue("sample_return_prefecture", null, { shouldValidate: false });
      setValue("sample_return_city", null, { shouldValidate: false });
      setValue("sample_return_address_line", null, { shouldValidate: false });
    } else {
      setValue("sample_product_name", sample.product_name, {
        shouldValidate: false,
      });
      setValue("sample_rental_or_purchase", sample.rental_or_purchase, {
        shouldValidate: false,
      });
      setValue("sample_price_per_creator", sample.price_per_creator, {
        shouldValidate: false,
      });
      setValue("sample_return_postal_code", sample.return_postal_code, {
        shouldValidate: false,
      });
      setValue("sample_return_prefecture", sample.return_prefecture, {
        shouldValidate: false,
      });
      setValue("sample_return_city", sample.return_city, {
        shouldValidate: false,
      });
      setValue("sample_return_address_line", sample.return_address_line, {
        shouldValidate: false,
      });
    }
  };

  const draft = () => {
    const sampleData = hasSamples ? sample : null;
    updateData({
      has_sample: hasSamples,
      sample_product_name: sampleData?.product_name || null,
      sample_rental_or_purchase: sampleData?.rental_or_purchase || null,
      sample_price_per_creator: sampleData?.price_per_creator || null,
      sample_return_postal_code: sampleData?.return_postal_code || null,
      sample_return_prefecture: sampleData?.return_prefecture || null,
      sample_return_city: sampleData?.return_city || null,
      sample_return_address_line: sampleData?.return_address_line || null,
    });
    submit(true, {
      has_sample: hasSamples,
      sample_product_name: sampleData?.product_name || null,
      sample_rental_or_purchase: sampleData?.rental_or_purchase || null,
      sample_price_per_creator: sampleData?.price_per_creator || null,
      sample_return_postal_code: sampleData?.return_postal_code || null,
      sample_return_prefecture: sampleData?.return_prefecture || null,
      sample_return_city: sampleData?.return_city || null,
      sample_return_address_line: sampleData?.return_address_line || null,
    });
  };

  const handleNext = (formData: yup.InferType<typeof samplesSchema>) => {
    updateData({
      has_sample: hasSamples,
      sample_product_name: formData.sample_product_name || null,
      sample_rental_or_purchase: formData.sample_rental_or_purchase || null,
      sample_price_per_creator: formData.sample_price_per_creator || null,
      sample_return_postal_code: formData.sample_return_postal_code || null,
      sample_return_prefecture: formData.sample_return_prefecture || null,
      sample_return_city: formData.sample_return_city || null,
      sample_return_address_line: formData.sample_return_address_line || null,
    });
    // 保存せずに次のステップに進む
    next({
      has_sample: hasSamples,
      sample_product_name: formData.sample_product_name || null,
      sample_rental_or_purchase: formData.sample_rental_or_purchase || null,
      sample_price_per_creator: formData.sample_price_per_creator || null,
      sample_return_postal_code: formData.sample_return_postal_code || null,
      sample_return_prefecture: formData.sample_return_prefecture || null,
      sample_return_city: formData.sample_return_city || null,
      sample_return_address_line: formData.sample_return_address_line || null,
    });
  };

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

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={draft}
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "下書き保存"}
        </Button>

        <Button
          type="button"
          onClick={() =>
            back({
              has_sample: hasSamples,
              sample_product_name: hasSamples ? sample.product_name : null,
              sample_rental_or_purchase: hasSamples
                ? sample.rental_or_purchase
                : null,
              sample_price_per_creator: hasSamples
                ? sample.price_per_creator
                : null,
              sample_return_postal_code: hasSamples
                ? sample.return_postal_code
                : null,
              sample_return_prefecture: hasSamples
                ? sample.return_prefecture
                : null,
              sample_return_city: hasSamples ? sample.return_city : null,
              sample_return_address_line: hasSamples
                ? sample.return_address_line
                : null,
            })
          }
          variant="secondary"
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "前へ戻る"}
        </Button>

        <Button
          type="submit"
          variant="default"
          onClick={handleSubmit(handleNext)}
          disabled={isUpdating}
        >
          {isUpdating ? "保存中..." : "次へ進む"}
        </Button>
      </div>
    </div>
  );
}
