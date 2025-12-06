"use client";

import { BrandForm } from "@/features/brand/common/components/ui-parts/BrandForm";
import { useCreateBrandForm } from "@/features/brand/create/hooks/useCreateBrandForm";

export function CreateBrandForm() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isPending,
    error,
    logoFile,
    setLogoFile,
    logoPreview,
    setLogoPreview,
    descriptionCount,
  } = useCreateBrandForm();

  return (
    <BrandForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
      logoFile={logoFile}
      setLogoFile={setLogoFile}
      logoPreview={logoPreview}
      setLogoPreview={setLogoPreview}
      descriptionCount={descriptionCount}
      buttonText="続ける"
      loadingText="作成中..."
    />
  );
}
