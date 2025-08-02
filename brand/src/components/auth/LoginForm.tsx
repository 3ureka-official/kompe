'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { useSignIn } from '@/hooks/auth/useSignIn';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUserSchema } from '@/schema/loginUserSchema';
import { Input } from '@/components/ui/Input';

export function LoginForm() {
  const { mutate: signIn, isPending, error } = useSignIn();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(loginUserSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    const data = getValues();
    console.log(data);
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

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
            パスワードを忘れた方
          </Link>
        </div>
      </div>

      <div>
        <p className="text-red-500">{error?.message}</p>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isPending ? 'ログイン中...' : 'ログイン'}
        </Button>
      </div>
      <div className="text-sm">
        <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
          アカウントを作成
        </Link>
      </div>
    </form>
  );
} 