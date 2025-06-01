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
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userProfile !== null) {
      if (requireAuth && !user) {
        // 認証が必要だがユーザーがログインしていない場合
        router.push('/auth/login');
      } else if (!requireAuth && user) {
        // 認証が不要だがユーザーがログインしている場合（ログイン/サインアップページなど）
        if (userProfile?.hasBrand) {
          router.push('/dashboard/contests');
        } else {
          router.push('/auth/brand-creation');
        }
      } else if (requireAuth && user) {
        // 認証済みユーザーの場合
        if (requireBrand && !userProfile?.hasBrand) {
          // ブランドが必要だが作成していない場合
          router.push('/auth/brand-creation');
        } else if (!requireBrand && userProfile?.hasBrand && window.location.pathname === '/auth/brand-creation') {
          // ブランド作成済みだがブランド作成ページにいる場合
          router.push('/dashboard/contests');
        }
      }
    }
  }, [user, userProfile, loading, requireAuth, requireBrand, router]);

  // ローディング中は何も表示しない
  if (loading || userProfile === null) {
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
  if (requireAuth && !user) {
    return null; // リダイレクト中
  }

  if (!requireAuth && user) {
    return null; // リダイレクト中
  }

  if (requireBrand && !userProfile?.hasBrand) {
    return null; // リダイレクト中
  }

  return <>{children}</>;
} 