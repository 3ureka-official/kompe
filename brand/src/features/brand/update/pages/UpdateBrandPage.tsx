"use client";

import { UpdateBrandForm } from "@/features/brand/update/components/ui-parts/UpdateBrandForm";
import { useUpdateBrandForm } from "@/features/brand/update/hooks/useUpdateBrandForm";

export function UpdateBrandPage() {
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
    <UpdateBrandForm
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
      isDirty={isDirty}
      isLogoChanged={isLogoChanged}
    />
  );
}
