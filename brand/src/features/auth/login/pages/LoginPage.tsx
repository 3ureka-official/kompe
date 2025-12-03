"use client";

import { LoginForm } from "@/features/auth/login/components/ui-parts/LoginForm";
import { Logo } from "@/components/ui-elements/Logo";
import { useLoginForm } from "@/features/auth/login/hooks/useLoginForm";

export function LoginPage() {
  const { control, handleSubmit, onSubmit, isPending, error, isAuthLoading } =
    useLoginForm();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col items-center mb-6 gap-4">
            <Logo size="lg" />
          </div>
          <LoginForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isPending={isPending}
            error={error}
            isAuthLoading={isAuthLoading}
          />
        </div>
      </div>
    </div>
  );
}
