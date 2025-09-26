"use client";

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "@/components/ui/Logo";
import { FormField, Textarea, SnsLinkField } from "./ui";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { FileUpload } from "@/components/brand/ui/FileUpload";
import { brandCreateSchema } from "@/schema/createBrandSchema";
import { useUpdateBrand } from "@/hooks/brand/useUpdateBrand";
import { BrandContext } from "@/contexts/BrandContext";
import { Brand } from "@/types/Brand";
import Image from "next/image";

export function BrandUpdateForm() {
  const { brand } = useContext(BrandContext);

  const { mutate: updateBrand, isPending, error } = useUpdateBrand();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLogoChanged, setIsLogoChanged] = useState(false);

  const getDefaultValues = (brand: Partial<Brand>) => ({
    name: brand?.name || "",
    website: brand?.website || null,
    description: brand?.description || "",
    tiktok_username: brand?.tiktok_username || null,
    instagram_url: brand?.instagram_url || null,
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(brandCreateSchema),
    mode: "onBlur",
    defaultValues: getDefaultValues({}),
  });

  const descriptionCount = watch("description")?.length || 0;

  useEffect(() => {
    if (brand) {
      setLogoPreview(brand?.logo_url || null);
      reset(getDefaultValues(brand));
    }
  }, [brand, reset]);

  const onSubmit = async () => {
    if (!brand) {
      console.error("ブランドが見つかりません");
      return;
    }

    const data = getValues();

    try {
      await updateBrand(
        {
          brandId: brand?.id,
          brandData: {
            name: data.name,
            description: data.description || "",
            website: data.website || null,
            tiktok_username: data.tiktok_username || null,
            instagram_url: data.instagram_url || null,
            logo_url: brand?.logo_url || null,
          },
          logoFile: logoFile,
        },
        {
          onSuccess: () => {
            setIsLogoChanged(false);
            reset(getDefaultValues(data));
          },
        },
      );
    } catch (error) {
      console.error("ブランド更新エラー:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* ロゴ */}
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <FormField
                  label="ブランド名"
                  required
                  error={fieldState.error?.message}
                >
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                </FormField>
              )}
            />

            {isLogoChanged}
            <FormField label="ロゴ画像">
              <FileUpload
                onFileChange={(file: File | null) => {
                  setLogoFile(file);
                  console.log("file", file);
                  setIsLogoChanged(true);
                }}
                onPreviewChange={(url: string | null) => {
                  setLogoPreview(url);
                }}
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                className="w-full"
              />
            </FormField>

            {logoPreview !== null && (
              <div className="flex justify-between items-center">
                <Image
                  src={logoPreview || ""}
                  alt="file"
                  width={160}
                  height={100}
                  className="w-[160px] h-[100px] object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setLogoPreview(null);
                    setLogoFile(null);
                  }}
                >
                  削除
                </Button>
              </div>
            )}

            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <FormField
                  label="ブランド紹介"
                  description={`${descriptionCount}/240文字`}
                  error={fieldState.error?.message}
                >
                  <Textarea
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="あなたのブランドについて教えてください"
                    maxLength={240}
                    showCharCount={false}
                    required
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="website"
              render={({ field, fieldState }) => (
                <FormField
                  label="ブランドウェブサイト"
                  error={fieldState.error?.message}
                >
                  <Input
                    type="url"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="https://"
                    required
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="tiktok_username"
              render={({ field, fieldState }) => (
                <SnsLinkField
                  type="tiktok"
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="instagram_url"
              render={({ field, fieldState }) => (
                <SnsLinkField
                  type="instagram"
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 送信ボタン */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="default"
                className="px-6 py-2"
                disabled={isPending || (!isDirty && !isLogoChanged)}
              >
                {isPending ? "更新中..." : "更新する"}
              </Button>
            </div>

            <ErrorMessage error={error?.message} />
          </form>
        </div>
      </div>
    </div>
  );
}
