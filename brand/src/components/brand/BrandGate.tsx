'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { BrandContext } from '@/contexts/BrandContext';
import { AuthContext } from '@/contexts/AuthContext';

interface BrandGateProps {
  children: React.ReactNode;
}

export function BrandGate({ children }: BrandGateProps) {
  const { profile, loading: userLoading } = useContext(AuthContext);
  const { brand, loading: brandLoading } = useContext(BrandContext);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading) {
      if (profile?.brand_id) {
        router.push('/contests');
      } else {
        router.push('/brand/create');
      } 
    }
  }, [profile, userLoading]);

  // ローディング中は何も表示しない
  if (userLoading) {
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