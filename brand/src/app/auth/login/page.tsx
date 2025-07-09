'use client';

import { AuthGuard, AuthLayout, LoginForm } from '@/components/auth';

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthLayout
        title="ログイン"
        subtitle="アカウントをお持ちでない方は"
        linkText="新規登録"
        linkHref="/auth/signup"
      >
        <LoginForm />
      </AuthLayout>
    </AuthGuard>
  );
}