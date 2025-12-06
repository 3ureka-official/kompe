"use client";

import { BrandForm } from "@/features/brand/common/components/ui-parts/BrandForm";
import { useUpdateBrandForm } from "@/features/brand/update/hooks/useUpdateBrandForm";

export function UpdateBrandForm() {
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
    isDirty,
    isLogoChanged,
  } = useUpdateBrandForm();

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
      buttonText="更新する"
      loadingText="更新中..."
      disabled={!isDirty && !isLogoChanged}
    />
  );
}
