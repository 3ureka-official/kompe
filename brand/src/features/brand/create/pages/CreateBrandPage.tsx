"use client";

import { CreateBrandForm } from "@/features/brand/create/components/ui-parts/CreateBrandForm";
import { useCreateBrandForm } from "@/features/brand/create/hooks/useCreateBrandForm";

export function CreateBrandPage() {
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
    <CreateBrandForm
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
    />
  );
}
