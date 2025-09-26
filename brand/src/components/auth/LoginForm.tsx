"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserSchema } from "@/schema/loginUserSchema";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const { mutate: signIn, isPending, error } = useSignIn();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginUserSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    const data = getValues();
    signIn({ email: data.email, password: data.password });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormField
              label="メールアドレス"
              required
              error={fieldState.error?.message}
            >
              <Input
                type="email"
                value={field.value}
                onChange={field.onChange}
                placeholder="メールアドレス"
              />
            </FormField>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <FormField
              label="パスワード"
              required
              error={fieldState.error?.message}
            >
              <Input
                type="password"
                value={field.value}
                onChange={field.onChange}
                placeholder="パスワード"
              />
            </FormField>
          )}
        />
      </div>

      <div>
        <p className="text-red-500 text-sm">{error?.message}</p>

        <Button
          type="submit"
          disabled={isPending}
          variant="default"
          className="w-full"
        >
          {isPending ? "ログイン中..." : "ログイン"}
        </Button>
      </div>
      <div className="text-sm text-center">
        <Link href="/auth/signup" className="font-medium underline">
          アカウントを作成
        </Link>
      </div>
    </form>
  );
}
