"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/contexts/AuthContext";
import { Logo } from "@/components/ui/Logo";
import { FormField, Textarea, SnsLinkField } from "./ui";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { brandCreateSchema } from "@/schema/brandCreateSchema";
import { useCreateBrand } from "@/hooks/brand/useCreateBrand";

export function BrandCreateForm() {
  const { user, profile } = useContext(AuthContext);
  const router = useRouter();

  const { mutate: createBrand, isPending, error } = useCreateBrand();

  const { control, handleSubmit, watch, getValues } = useForm({
    resolver: yupResolver(brandCreateSchema),
    mode: "onBlur",
    defaultValues: {
      email: user?.email || "",
      name: "",
      phonenumber: "",
      website: null,
      description: "",
      tiktok_username: null,
      instagram_url: null,
    },
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const description = watch("description");

  const onSubmit = async () => {
    if (!profile) return;

    const data = getValues();

    try {
      await createBrand(
        {
          userId: profile.id,
          brandData: {
            name: data.name,
            logo_url: logoPreview || null,
            email: data.email,
            phonenumber: data.phonenumber,
            description: data.description,
            website: data.website || null,
            tiktok_username: data.tiktok_username || null,
            instagram_url: data.instagram_url || null,
          },
          logoFile: logoFile,
        },
        {
          onSuccess: () => {
            router.push("/contests");
          },
        },
      );
    } catch (error) {
      console.error("ブランド作成エラー:", error);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <FormField
                  label="ブランドメールアドレス"
                  required
                  error={fieldState.error?.message}
                >
                  <Input
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                </FormField>
              )}
            />

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

            <FormField label="ブランドロゴ">
              <FileUpload
                file={logoFile}
                preview={logoPreview}
                onFileChange={setLogoFile}
                onPreviewChange={setLogoPreview}
              />
            </FormField>

            <Controller
              control={control}
              name="phonenumber"
              render={({ field, fieldState }) => (
                <FormField
                  label="電話番号"
                  required
                  error={fieldState.error?.message}
                >
                  <Input
                    type="tel"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="ハイフンなしで入力してください"
                    required
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <FormField
                  label="ブランド紹介"
                  required
                  description={`${description?.length || 0}/240文字`}
                  error={fieldState.error?.message}
                >
                  <Textarea
                    value={field.value}
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
                  required
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
                variant="primary"
                className="px-6 py-2"
                disabled={isPending}
              >
                {isPending ? "作成中..." : "続ける"}
              </Button>
            </div>

            <ErrorMessage error={error?.message} />
          </form>
        </div>
      </div>
    </div>
  );
}
