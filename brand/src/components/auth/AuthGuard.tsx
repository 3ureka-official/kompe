'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireBrand?: boolean;
}

export function AuthGuard({ children, requireAuth = true, requireBrand = false }: AuthGuardProps) {
  const { user, userProfile, userBrand, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // 認証が必要だがユーザーがログインしていない場合
        router.push('/auth/login');
      } else if (!requireAuth && user) {
        // 認証が不要だがユーザーがログインしている場合（ログイン/サインアップページなど）
        if (userBrand) {
          router.push('/dashboard/contests');
        } else {
          router.push('/auth/brand-creation');
        }
      } else if (requireAuth && user && requireBrand && !userBrand) {
        // 認証済みだがブランドが必要で未作成の場合
        router.push('/auth/brand-creation');
      }
    }
  }, [user, userProfile, userBrand, loading, router, requireAuth, requireBrand]);

  // ローディング中は何も表示しない
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 認証状態に応じてコンテンツを表示
  return <>{children}</>;
} 