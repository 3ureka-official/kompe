"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { brandFormSchema } from "@/features/brand/common/schemas/brandFormSchema";
import { useCreateBrand } from "@/features/brand/create/hooks/useCreateBrand";

export function useCreateBrandForm() {
  const { profile } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    mutate: createBrand,
    error: createError,
    isPending: isCreatingBrand,
  } = useCreateBrand();

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(brandFormSchema),
    mode: "onBlur",
  });

  const description = watch("description");
  const descriptionCount = description?.length || 0;

  const isPendingState = isPending || isCreatingBrand;

  const onSubmit = async () => {
    if (!profile) return;

    const data = getValues();

    setIsPending(true);

    createBrand({
      userId: profile.id,
      brandData: {
        name: data.name,
        logo_url: logoPreview || null,
        description: data.description,
        website: data.website,
        tiktok_username: data.tiktok_username,
        instagram_url: data.instagram_url,
      },
      logoFile: logoFile,
    });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isPending: isPendingState,
    error: createError,
    logoFile,
    setLogoFile,
    logoPreview,
    setLogoPreview,
    descriptionCount,
    isDirty,
  };
}
