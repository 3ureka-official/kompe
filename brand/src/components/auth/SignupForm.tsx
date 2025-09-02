"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { createUserSchema } from "@/schema/createUserSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export function SignupForm() {
  const { mutate: signUp, isPending, error } = useSignUp();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    const data = getValues();

    signUp({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <Controller
          control={control}
          name="first_name"
          render={({ field, fieldState }) => (
            <FormField label="苗字" required error={fieldState.error?.message}>
              <Input
                type="text"
                value={field.value}
                onChange={field.onChange}
              />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field, fieldState }) => (
            <FormField label="名前" required error={fieldState.error?.message}>
              <Input
                type="text"
                value={field.value}
                onChange={field.onChange}
              />
            </FormField>
          )}
        />
      </div>

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <FormField
            label="メールアドレス"
            required
            error={fieldState.error?.message}
          >
            <Input type="email" value={field.value} onChange={field.onChange} />
          </FormField>
        )}
      />

      <div className="flex flex-col">
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
              />
            </FormField>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormField
              label="パスワード（確認）"
              required
              error={fieldState.error?.message}
            >
              <Input
                type="password"
                value={field.value}
                onChange={field.onChange}
              />
            </FormField>
          )}
        />
      </div>

      <div className="mt-6">
        <p className="text-red-500 text-sm">{error?.message}</p>

        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="w-full"
        >
          {isPending ? "アカウント作成中..." : "アカウント作成"}
        </Button>
      </div>

      <div className="text-sm text-center">
        <Link href="/auth/login" className="font-medium underline">
          ログイン
        </Link>
      </div>
    </form>
  );
}
