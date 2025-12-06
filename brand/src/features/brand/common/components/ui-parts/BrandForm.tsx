"use client";

import React from "react";
import { Control } from "react-hook-form";
import { Logo } from "@/components/ui-elements/Logo";
import { SnsLinkField } from "@/features/brand/common/components/ui-elements/SnsLinkField";
import { IconUploadField } from "@/features/brand/common/components/ui-elements/IconUploadField";
import { ErrorMessage } from "@/components/ui-elements/ErrorMessage";
import { Loading } from "@/components/ui-elements/Loading";
import { TextareaField } from "@/components/ui-elements/form/TextareaField";
import { UrlField } from "@/components/ui-elements/form/UrlField";
import { LoadingButton } from "@/components/ui-elements/LoadingButton";
import { TextField } from "@/components/ui-elements/form/TextField";
import { BrandFormData } from "@/features/brand/common/schemas/brandFormSchema";

interface BrandFormProps {
  control: Control<BrandFormData>;
  handleSubmit: (
    onSubmit: (data: BrandFormData) => void | Promise<void>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: BrandFormData) => void | Promise<void>;
  isPending: boolean;
  error: { message?: string } | null;
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (url: string | null) => void;
  descriptionCount: number;
  buttonText?: string;
  loadingText?: string;
  disabled?: boolean;
}

export function BrandForm({
  control,
  handleSubmit,
  onSubmit,
  isPending,
  error,
  setLogoFile,
  logoPreview,
  setLogoPreview,
  descriptionCount,
  buttonText = "続ける",
  loadingText = "処理中...",
  disabled = false,
}: BrandFormProps) {
  if (isPending) {
    return <Loading isPending={isPending} />;
  }

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
            <TextField
              control={control}
              name="name"
              label="ブランド名"
              required
            />

            <IconUploadField
              label="ロゴ画像"
              preview={logoPreview}
              onFileChange={(file: File | null) => {
                setLogoFile(file);
              }}
              onPreviewChange={(url: string | null) => {
                setLogoPreview(url);
              }}
            />

            <TextareaField
              control={control}
              name="description"
              label="ブランド紹介"
              description={`${descriptionCount}/240文字`}
              placeholder="あなたのブランドについて教えてください"
              maxLength={240}
              showCharCount={false}
            />

            <UrlField
              control={control}
              name="website"
              label="ブランドウェブサイト"
            />

            <SnsLinkField
              control={control}
              name="tiktok_username"
              type="tiktok"
            />

            <SnsLinkField
              control={control}
              name="instagram_url"
              type="instagram"
            />

            {/* 送信ボタン */}
            <div className="flex justify-end pt-6">
              <LoadingButton
                type="submit"
                variant="default"
                className="px-6 py-2"
                disabled={disabled}
                isLoading={isPending}
                loadingText={loadingText}
                defaultText={buttonText}
              />
            </div>

            <ErrorMessage error={error?.message} />
          </form>
        </div>
      </div>
    </div>
  );
}
