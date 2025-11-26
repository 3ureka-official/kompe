"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { createUserSchema } from "@/schema/createUserSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { AuthContext } from "@/contexts/AuthContext";

export function SignupForm() {
  const { mutate: signUp, isPending, error } = useSignUp();
  const router = useRouter();
  const { user, isAuthLoading } = useContext(AuthContext);

  // 既にログインしているユーザーがサインアップページにアクセスした場合の処理
  useEffect(() => {
    if (user) {
      if (!user.email_confirmed_at) {
        // メール確認前のユーザーはサインアップ成功ページにリダイレクト
        router.replace(
          "/auth/verify-code?email=${encodeURIComponent(user.email)}",
        );
      } else {
        // メール確認済みのユーザーはコンテストページにリダイレクト
        router.replace("/contests");
      }
    }
  }, [user, router]);

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    const data = getValues();

    signUp(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          if (!response?.user) {
            return;
          }

          if (!response.email_confirmed_at) {
            // メール確認前のユーザーはサインアップ成功ページにリダイレクト
            router.replace(
              `/auth/verify-code?email=${encodeURIComponent(response.user.email ?? "")}`,
            );
          }
        },
      },
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          disabled={isPending || isAuthLoading}
          variant="default"
          className="w-full"
        >
          {isPending || isAuthLoading
            ? "アカウント作成中..."
            : "アカウント作成"}
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
