"use client";

import React from "react";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { VerifyCodeFormData } from "@/features/auth/verify-code/schemas/verifyCodeSchema";
import { CodeInputGroup } from "@/features/auth/verify-code/components/ui-parts/CodeInputGroup";
import { FormErrorMessage } from "@/features/auth/common/components/ui-elements/FormErrorMessage";
import { SubmitButton } from "@/features/auth/common/components/ui-elements/SubmitButton";
import { ResendCodeButton } from "@/features/auth/common/components/ui-elements/ResendCodeButton";
import { FormHeader } from "@/features/auth/common/components/ui-parts/FormHeader";

interface VerifyCodeFormProps {
  control: Control<VerifyCodeFormData>;
  handleSubmit: UseFormHandleSubmit<VerifyCodeFormData>;
  onSubmit: (data: VerifyCodeFormData) => void;
  codeArray: string[];
  handleCodeChange: (newCode: string[]) => void;
  handleCodeComplete: (codeValue: string) => void;
  handleResendCode: () => void;
  isPending: boolean;
  email: string | null;
  errors: FieldErrors<VerifyCodeFormData>;
  codeString: string;
}

export function VerifyCodeForm({
  control,
  handleSubmit,
  onSubmit,
  codeArray,
  handleCodeChange,
  handleCodeComplete,
  handleResendCode,
  isPending,
  email,
  errors,
  codeString,
}: VerifyCodeFormProps) {
  return (
    <div className="space-y-6">
      <FormHeader
        title="確認コードを入力"
        description={`${email}に送信された6桁のコードを入力してください`}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={control}
          name="code"
          render={() => (
            <CodeInputGroup
              code={codeArray}
              onChange={handleCodeChange}
              onComplete={handleCodeComplete}
            />
          )}
        />

        <FormErrorMessage message={errors.code?.message} />

        <ResendCodeButton onClick={handleResendCode} />

        <div className="text-center">
          <SubmitButton
            isLoading={isPending}
            loadingText="確認中..."
            defaultText="確認"
            disabled={codeString.length !== 6}
          />
        </div>
      </form>
    </div>
  );
}
