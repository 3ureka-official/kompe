import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  samplesSchema,
  ContestCreateFormData,
} from "@/features/contest/form/schemas/createContestSchema";
import { CreateContestContext } from "@/features/contest/common/contexts/CreateContestContext";
import { SampleProductFormData } from "@/types/SampleProduct";
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

// データからSampleProductFormDataを取得するヘルパー関数
const getSampleFromData = (
  data: Partial<ContestCreateFormData>,
): SampleProductFormData | null => {
  const hasSample = data.has_sample || false;
  if (!hasSample) return null;

  return {
    product_name: data.sample_product_name || "",
    rental_or_purchase:
      (data.sample_rental_or_purchase as "RENTAL" | "PURCHASE") || "RENTAL",
    price_per_creator: data.sample_price_per_creator || 0,
    return_postal_code: data.sample_return_postal_code || null,
    return_prefecture: data.sample_return_prefecture || null,
    return_city: data.sample_return_city || null,
    return_address_line: data.sample_return_address_line || null,
  };
};

// SampleProductFormDataをフォームデータに変換するヘルパー関数
const sampleToFormData = (
  hasSample: boolean,
  sample: SampleProductFormData | null,
) => ({
  has_sample: hasSample,
  sample_product_name: sample?.product_name || null,
  sample_rental_or_purchase: sample?.rental_or_purchase || null,
  sample_price_per_creator: sample?.price_per_creator || null,
  sample_return_postal_code: sample?.return_postal_code || null,
  sample_return_prefecture: sample?.return_prefecture || null,
  sample_return_city: sample?.return_city || null,
  sample_return_address_line: sample?.return_address_line || null,
});

export function useSamples() {
  const { data, back, submit, isUpdating, updateData, next } =
    useContext(CreateContestContext);

  const existingSample = getSampleFromData(
    data as Partial<ContestCreateFormData>,
  );
  const existingHasSample =
    (data as Partial<ContestCreateFormData>).has_sample || false;

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
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(samplesSchema),
    context: validationContext,
    mode: "onSubmit",
    defaultValues: sampleToFormData(hasSamples, sample),
  });

  useEffect(() => {
    const newSample = getSampleFromData(data as Partial<ContestCreateFormData>);
    const newHasSample =
      (data as Partial<ContestCreateFormData>).has_sample || false;

    setHasSamples(newHasSample);
    setSample(newSample || defaultSample);
    reset(sampleToFormData(newHasSample, newSample));
  }, [data, reset]);

  // サンプルデータをフォームに反映するヘルパー関数
  const syncSampleToForm = useCallback(
    (sampleData: SampleProductFormData) => {
      const formData = sampleToFormData(true, sampleData);
      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as any, value, { shouldValidate: false });
      });
    },
    [setValue],
  );

  // フォームをクリアするヘルパー関数
  const clearSampleForm = useCallback(() => {
    const formData = sampleToFormData(false, null);
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as any, value, { shouldValidate: false });
    });
  }, [setValue]);

  const handleSampleChange = useCallback(
    (updates: Partial<SampleProductFormData>) => {
      const updatedSample = { ...sample, ...updates };
      setSample(updatedSample);
      syncSampleToForm(updatedSample);
    },
    [sample, syncSampleToForm],
  );

  const handleToggleChange = useCallback(
    (checked: boolean) => {
      setHasSamples(checked);
      setValue("has_sample", checked, { shouldValidate: false });

      if (!checked) {
        setSample(defaultSample);
        clearSampleForm();
      } else {
        syncSampleToForm(sample);
      }
    },
    [sample, setValue, syncSampleToForm, clearSampleForm],
  );

  const draft = useCallback(() => {
    const values = getValues();
    updateData(values);
    submit(true, values);
  }, [getValues, updateData, submit]);

  const handleNext = useCallback(
    (formData: yup.InferType<typeof samplesSchema>) => {
      updateData(formData);
      next(formData);
    },
    [updateData, next],
  );

  return {
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
  };
}
