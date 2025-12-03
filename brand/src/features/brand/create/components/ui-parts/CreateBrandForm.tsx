"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { Logo } from "@/components/ui-elements/Logo";
import { FormField } from "@/components/ui-elements/form/FormField";
import { SnsLinkField } from "@/features/brand/common/components/ui-elements/SnsLinkField";
import { FileUpload } from "@/features/brand/common/components/ui-elements/FileUpload";
import { Input } from "@/components/ui-elements/form/Input";
import { ErrorMessage } from "@/components/ui-elements/ErrorMessage";
import { Loading } from "@/components/ui-elements/Loading";
import { useCreateBrandForm } from "@/features/brand/create/hooks/useCreateBrandForm";
import { FormTextareaField } from "@/components/ui-elements/form/TextareaField";
import { FormUrlField } from "@/components/ui-elements/form/UrlField";
import { LoadingButton } from "@/components/ui-elements/LoadingButton";

interface CreateBrandFormProps {
  control: ReturnType<typeof useCreateBrandForm>["control"];
  handleSubmit: ReturnType<typeof useCreateBrandForm>["handleSubmit"];
  onSubmit: ReturnType<typeof useCreateBrandForm>["onSubmit"];
  isPending: boolean;
  error: ReturnType<typeof useCreateBrandForm>["error"];
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (url: string | null) => void;
  descriptionCount: number;
}

export function CreateBrandForm({
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
}: CreateBrandFormProps) {
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

            <FormField label="ロゴ画像">
              <FileUpload
                onFileChange={(file: File | null) => {
                  setLogoFile(file);
                }}
                onPreviewChange={(url: string | null) => {
                  setLogoPreview(url);
                }}
                preview={logoPreview}
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                className="w-full"
              />
            </FormField>

            <FormTextareaField
              control={control}
              name="description"
              label="ブランド紹介"
              description={`${descriptionCount}/240文字`}
              placeholder="あなたのブランドについて教えてください"
              maxLength={240}
              showCharCount={false}
            />

            <FormUrlField
              control={control}
              name="website"
              label="ブランドウェブサイト"
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
              <LoadingButton
                type="submit"
                variant="default"
                className="px-6 py-2"
                isLoading={isPending}
                loadingText="作成中..."
                defaultText="続ける"
              />
            </div>

            <ErrorMessage error={error?.message} />
          </form>
        </div>
      </div>
    </div>
  );
}
