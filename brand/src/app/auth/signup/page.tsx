'use client';

import { AuthGuard, AuthLayout, SignupForm } from '@/components/auth';

export default function SignupPage() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthLayout
        title="新規登録"
        subtitle="既にアカウントをお持ちの方は"
        linkText="ログイン"
        linkHref="/auth/login"
      >
        <SignupForm />
      </AuthLayout>
    </AuthGuard>
  );
} 