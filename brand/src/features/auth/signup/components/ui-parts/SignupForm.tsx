"use client";

import React from "react";
import { UseFormHandleSubmit, Control } from "react-hook-form";
import { SignupFormData } from "@/features/auth/signup/schemas/createUserSchema";
import { FormInputField } from "@/features/auth/common/components/ui-elements/FormInputField";
import { FormErrorMessage } from "@/features/auth/common/components/ui-elements/FormErrorMessage";
import { SubmitButton } from "@/features/auth/common/components/ui-elements/SubmitButton";
import { AuthFormLink } from "@/features/auth/common/components/ui-elements/AuthFormLink";

interface SignupFormProps {
  control: Control<SignupFormData>;
  handleSubmit: UseFormHandleSubmit<SignupFormData>;
  onSubmit: () => void;
  isPending: boolean;
  error: Error | null;
  isAuthLoading: boolean;
}

export function SignupForm({
  control,
  handleSubmit,
  onSubmit,
  isPending,
  error,
  isAuthLoading,
}: SignupFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField control={control} name="email" type="email" required />

      <div className="flex flex-col">
        <FormInputField
          control={control}
          name="password"
          type="password"
          required
        />
        <FormInputField
          control={control}
          name="confirmPassword"
          type="password"
          label="パスワード（確認）"
          required
        />
      </div>

      <div className="mt-6">
        <FormErrorMessage message={error?.message} />

        <SubmitButton
          isLoading={isPending || isAuthLoading}
          loadingText="アカウント作成中..."
          defaultText="アカウント作成"
        />
      </div>

      <AuthFormLink href="/auth/login" text="ログイン" />
    </form>
  );
}
