'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userProfile !== null) {
      if (user) {
        // ログインしている場合
        if (userProfile?.hasBrand) {
          // ブランド作成済みの場合はコンテスト一覧にリダイレクト
          router.push('/dashboard/contests');
        } else {
          // ブランド未作成の場合はブランド作成ページにリダイレクト
          router.push('/auth/brand-creation');
        }
      } else {
        // ログインしていない場合はログインページにリダイレクト
        router.push('/auth/login');
      }
    }
  }, [user, userProfile, loading, router]);

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

  return null; // リダイレクト中
} 