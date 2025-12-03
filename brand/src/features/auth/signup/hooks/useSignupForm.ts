"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserSchema,
  signupFormDefaultValues,
} from "@/features/auth/signup/schemas/createUserSchema";
import { useSignUp } from "@/features/auth/signup/hooks/useSignUp";
import { AuthContext } from "@/features/auth/contexts/AuthContext";

export function useSignupForm() {
  const { mutate: signUp, isPending, error } = useSignUp();
  const router = useRouter();
  const { user, isAuthLoading } = useContext(AuthContext);

  // 既にログインしているユーザーがサインアップページにアクセスした場合の処理
  useEffect(() => {
    if (user) {
      if (!user.email_confirmed_at) {
        // メール確認前のユーザーはサインアップ成功ページにリダイレクト
        router.replace(
          `/auth/verify-code?email=${encodeURIComponent(user.email ?? "")}`,
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
    defaultValues: signupFormDefaultValues,
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

  return {
    control,
    handleSubmit,
    onSubmit,
    isPending,
    error,
    isAuthLoading,
  };
}
