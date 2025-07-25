'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FormField } from './FormField';
import { ErrorMessage } from './ErrorMessage';
import { useSignUp } from '@/hooks/auth/useSignUp';
import { createUserSchema } from '@/schema/createUserSchema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

export function SignupForm() {
  const { mutate: signUp, isPending, error } = useSignUp();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur',
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
      <ErrorMessage error={error?.message} />

      <div className="flex gap-4">
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormField
              label="苗字"
              type="text"
              placeholder="苗字"
              required
              autoComplete="off"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormField
              label="名前"
              type="text"
              placeholder="名前"
              required
              autoComplete="off"
              {...field}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <FormField
            label="メールアドレス"
            type="email"
            placeholder="your@example.com"
            autoComplete="email"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormField
            label="パスワード"
            type="password"
            placeholder="6文字以上"
            autoComplete="new-password"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormField
            label="パスワード（確認）"
            type="password"
            placeholder="パスワードを再入力"
            autoComplete="new-password"
            {...field}
          />
        )}
      />

      <div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isPending ? 'アカウント作成中...' : 'アカウント作成'}
        </Button>
      </div>
      <div className="text-sm">
        <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
          ログイン
        </Link>
      </div>
    </form>
  );
} 