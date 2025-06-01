'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createBrand } from '@/services/userService';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { BrandCreationForm } from '@/components/brand/BrandCreationForm';
import { BrandCreationData } from '@/types/brand';

export default function BrandCreationPage() {
  const { user, refreshUserData } = useAuth();
  const router = useRouter();

  const handleSubmit = async (brandData: BrandCreationData) => {
    if (!user) return;

    try {
      // TODO: ロゴファイルをFirebase Storageにアップロード
      // 現在は仮のURLを使用
      const logoUrl = brandData.logoFile ? 'https://example.com/logo.png' : undefined;

      await createBrand({
        name: brandData.name,
        logoUrl,
        email: brandData.contactEmail,
        phoneNumber: brandData.phoneNumber,
        description: brandData.publicProfile,
        socialLinks: brandData.snsLinks,
        ownerId: user.uid,
      });

      // ユーザーデータを更新
      await refreshUserData();

      // コンテスト一覧ページにリダイレクト
      router.push('/dashboard/contests');
    } catch (error) {
      console.error('ブランド作成エラー:', error);
      throw error; // BrandCreationFormでエラーハンドリング
    }
  };

  return (
    <AuthGuard requireAuth={true} requireBrand={false}>
      <BrandCreationForm 
        onSubmit={handleSubmit}
        userEmail={user?.email || undefined}
      />
    </AuthGuard>
  );
} 