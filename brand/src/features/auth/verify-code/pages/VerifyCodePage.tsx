"use client";

import { VerifyCodeForm } from "@/features/auth/verify-code/components/ui-parts/VerifyCodeForm";
import { VerifyCodeError } from "@/features/auth/verify-code/components/ui-parts/VerifyCodeError";
import { Logo } from "@/components/ui-elements/Logo";
import { useVerifyCodeForm } from "@/features/auth/verify-code/hooks/useVerifyCodeForm";

export function VerifyCodePage() {
  const {
    control,
    handleSubmit,
    onSubmit,
    codeArray,
    handleCodeChange,
    handleCodeComplete,
    handleResendCode,
    isPending,
    error,
    email,
    errors,
    codeString,
  } = useVerifyCodeForm();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center mb-6 gap-4">
              <Logo size="lg" />
            </div>
            <VerifyCodeError errorMessage={error.message} />
          </div>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center mb-6 gap-4">
              <Logo size="lg" />
            </div>
            <VerifyCodeError errorMessage="再度ログインしてください。" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col items-center mb-6 gap-4">
            <Logo size="lg" />
          </div>
          <VerifyCodeForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            codeArray={codeArray}
            handleCodeChange={handleCodeChange}
            handleCodeComplete={handleCodeComplete}
            handleResendCode={handleResendCode}
            isPending={isPending}
            email={email}
            errors={errors}
            codeString={codeString}
          />
        </div>
      </div>
    </div>
  );
}
