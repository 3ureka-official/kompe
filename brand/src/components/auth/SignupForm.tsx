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
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

      <div className="mt-6">
        <p className="text-red-500">{error?.message}</p>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isPending ? "アカウント作成中..." : "アカウント作成"}
        </Button>
      </div>

      <div className="text-sm">
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          ログイン
        </Link>
      </div>
    </form>
  );
}
