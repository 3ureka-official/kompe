"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  loginUserSchema,
  loginFormDefaultValues,
} from "@/features/auth/login/schemas/loginUserSchema";
import { useSignIn } from "@/features/auth/login/hooks/useSignIn";
import { AuthContext } from "@/features/auth/contexts/AuthContext";

export function useLoginForm() {
  const router = useRouter();
  const { isAuthLoading } = useContext(AuthContext);
  const { mutate: signIn, isPending, error } = useSignIn();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginUserSchema),
    mode: "onBlur",
    defaultValues: loginFormDefaultValues,
  });

  const onSubmit = async () => {
    const data = getValues();
    signIn(
      { email: data.email, password: data.password },
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
