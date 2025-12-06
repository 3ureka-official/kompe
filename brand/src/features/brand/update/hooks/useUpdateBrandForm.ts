"use client";

import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { brandFormSchema } from "@/features/brand/common/schemas/brandFormSchema";
import { useUpdateBrand } from "@/features/brand/update/hooks/useUpdateBrand";

export function useUpdateBrandForm() {
  const { brand } = useContext(AuthContext);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLogoChanged, setIsLogoChanged] = useState(false);

  const {
    mutate: updateBrand,
    error: updateError,
    isPending: isUpdatingBrand,
  } = useUpdateBrand();

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(brandFormSchema),
    mode: "onBlur",
    defaultValues: brandFormSchema.cast(brand),
  });

  const description = watch("description");
  const descriptionCount = description?.length || 0;

  useEffect(() => {
    if (brand) {
      setLogoPreview(brand.logo_url);
      reset(brandFormSchema.cast(brand));
    }
  }, [brand, reset]);

  const onSubmit = async () => {
    if (!brand) {
      console.error("ブランドが見つかりません");
      return;
    }

    const data = getValues();

    updateBrand(
      {
        brandId: brand.id,
        brandData: {
          name: data.name,
          description: data.description,
          website: data.website,
          tiktok_username: data.tiktok_username,
          instagram_url: data.instagram_url,
          logo_url: brand.logo_url,
        },
        logoFile: logoFile,
      },
      {
        onSuccess: () => {
          setIsLogoChanged(false);
          reset(brandFormSchema.cast(data));
        },
      },
    );
  };

  const handleLogoFileChange = (file: File | null) => {
    setLogoFile(file);
    setIsLogoChanged(true);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isPending: isUpdatingBrand,
    error: updateError,
    logoFile,
    setLogoFile: handleLogoFileChange,
    logoPreview,
    setLogoPreview,
    descriptionCount,
    isDirty,
    isLogoChanged,
  };
}
