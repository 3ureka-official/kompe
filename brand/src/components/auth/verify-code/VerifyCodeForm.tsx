"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmailCode } from "@/hooks/auth/useVerifyEmailCode";
import { verifyCodeSchema } from "@/schema/verifyCodeSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerifyCodeError } from "./VerifyCodeError";
import { Button } from "@/components/ui/Button";
import { CodeInputGroup } from "./CodeInputGroup";
import { AuthContext } from "@/contexts/AuthContext";
import { resendConfirmationEmail } from "@/services/userService";

export function VerifyCodeForm() {
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
    defaultValues: {
      code: "",
    },
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

  if (error) {
    return <VerifyCodeError errorMessage={error.message} />;
  }

  if (!email) {
    return <VerifyCodeError errorMessage="再度ログインしてください。" />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          確認コードを入力
        </h2>
        <p className="text-gray-600">
          {email}に送信された6桁のコードを入力してください
        </p>
      </div>

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

        {errors.code && (
          <p className="text-red-500 text-sm text-center">
            {errors.code.message}
          </p>
        )}

        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              resendConfirmationEmail(email);
            }}
          >
            確認コードを再送信
          </Button>
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={codeString.length !== 6 || isPending}
            variant="default"
            className="w-full"
          >
            確認
          </Button>
        </div>
      </form>
    </div>
  );
}
