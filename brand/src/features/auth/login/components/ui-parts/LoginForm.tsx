"use client";

import React from "react";
import { UseFormHandleSubmit, Control } from "react-hook-form";
import { LoginFormData } from "@/features/auth/login/schemas/loginUserSchema";
import { InputField } from "@/features/auth/common/components/ui-elements/InputField";
import { FormErrorMessage } from "@/features/auth/common/components/ui-elements/FormErrorMessage";
import { SubmitButton } from "@/features/auth/common/components/ui-elements/SubmitButton";
import { AuthFormLink } from "@/features/auth/common/components/ui-elements/AuthFormLink";

interface LoginFormProps {
  control: Control<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: () => void;
  isPending: boolean;
  error: Error | null;
  isAuthLoading: boolean;
}

export function LoginForm({
  control,
  handleSubmit,
  onSubmit,
  isPending,
  error,
  isAuthLoading,
}: LoginFormProps) {
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <InputField control={control} name="email" type="email" required />
        <InputField
          control={control}
          name="password"
          type="password"
          required
        />
      </div>

      <div>
        <FormErrorMessage message={error?.message} />

        <SubmitButton
          isLoading={isPending || isAuthLoading}
          loadingText="ログイン中..."
          defaultText="ログイン"
        />
      </div>
      <AuthFormLink href="/auth/signup" text="アカウントを作成" />
    </form>
  );
}
