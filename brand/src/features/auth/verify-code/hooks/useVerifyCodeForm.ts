"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  verifyCodeSchema,
  verifyCodeFormDefaultValues,
} from "@/features/auth/verify-code/schemas/verifyCodeSchema";
import { useVerifyEmailCode } from "@/features/auth/verify-code/hooks/useVerifyEmailCode";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { resendConfirmationEmail } from "@/services/supabase/userService";

export function useVerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");
  const email = emailFromQuery;

  const { user } = useContext(AuthContext);
  const { mutate: verifyCode, isPending, error } = useVerifyEmailCode();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyCodeSchema),
    mode: "onChange",
    defaultValues: verifyCodeFormDefaultValues,
  });

  const codeString = watch("code");
  const codeArray = codeString
    .split("")
    .slice(0, 6)
    .concat(Array(6 - codeString.length).fill(""));

  const onSubmit = (data: { code: string }) => {
    if (!email) {
      return;
    }

    verifyCode(
      { email, code: data.code },
      {
        onSuccess: () => {
          if (user) {
            router.replace("/contests");
          } else {
            router.replace("/auth/login");
          }
        },
      },
    );
  };

  const handleCodeChange = (newCode: string[]) => {
    const codeValue = newCode.join("");
    setValue("code", codeValue, { shouldValidate: true });
  };

  const handleCodeComplete = (codeValue: string) => {
    setValue("code", codeValue, { shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  const handleResendCode = () => {
    if (email) {
      resendConfirmationEmail(email);
    }
  };

  return {
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
  };
}
