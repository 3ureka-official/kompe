'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createBrand } from '@/services/brandService';
import { Logo } from '@/components/ui/Logo';
import { FormField, Input, Select, Textarea, FileUpload, SnsLinkField } from './ui';
import { Button } from '@/components/ui/button';
import { Brand } from '@/types/brand';
import { serverTimestamp } from 'firebase/firestore';
import { businessTypeOptions, howDidYouHearOptions } from '@/constants/brand-creation';

export function BrandCreationForm() {
  const { user, refreshUserData } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<Brand>({
    id: '',
    userId: '',
    name: '',
    logoUrl: '',
    contactEmail: user?.email || '',
    phoneNumber: '',
    businessType: '',
    howDidYouHear: '',
    snsLinks: {
      twitter: '',
      instagram: '',
      facebook: '',
      website: ''
    },
    description: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await createBrand(user.uid, {
        name: formData.name,
        logoUrl: formData.logoUrl,
        contactEmail: formData.contactEmail,
        phoneNumber: formData.phoneNumber,
        description: formData.description,
        snsLinks: formData.snsLinks,
        businessType: formData.businessType,
        howDidYouHear: formData.howDidYouHear,
      });
      
      await refreshUserData();
      router.push('/contests');
    } catch (error) {
      console.error('ブランド作成エラー:', error);
      // エラーハンドリング
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof Brand, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSnsChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      snsLinks: {
        ...prev.snsLinks,
        [platform]: value || undefined
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* ロゴ */}
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ようこそ、Kanatoさん！</h1>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="ブランドメールアドレス" required>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(value) => handleChange('contactEmail', value)}
                required
              />
            </FormField>

            <FormField label="ブランド名" required>
              <Input
                value={formData.name}
                onChange={(value) => handleChange('name', value)}
                required
              />
            </FormField>

            <FormField 
              label="ブランドロゴ"
              description="推奨サイズ: 200x200"
            >
              <FileUpload
                file={logoFile}
                preview={logoPreview}
                onFileChange={(file) => handleChange('logoUrl', file)}
                onPreviewChange={setLogoPreview}
                placeholder="ロゴ画像をアップロード"
              />
            </FormField>

            <FormField label="会社規模" required>
              <Select
                options={businessTypeOptions}
                value={formData.businessType}
                onChange={(value) => handleChange('businessType', value)}
                required
              />
            </FormField>

            <FormField label="電話番号" required>
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(value) => handleChange('phoneNumber', value)}
                required
              />
            </FormField>

            <FormField label="ブランドウェブサイト" required>
              <Input
                type="url"
                value={formData.website || ''}
                onChange={(value) => handleChange('website', value)}
                required
              />
            </FormField>

            <FormField 
              label="ブランド紹介" 
              required
              description={`${formData.description.length}/240文字`}
            >
              <Textarea
                value={formData.description}
                onChange={(value) => handleChange('description', value)}
                placeholder="あなたのブランドについて教えてください"
                maxLength={240}
                showCharCount={false}
                required
              />
            </FormField>

            <SnsLinkField
              type="tiktok"
              value={formData.tiktokHandle || ''}
              onChange={(value) => handleChange('tiktokHandle', value)}
            />

            <SnsLinkField
              type="instagram"
              value={formData.snsLinks.instagram || ''}
              onChange={(value) => handleSnsChange('instagram', value)}
            />

            <SnsLinkField
              type="twitter"
              value={formData.snsLinks.twitter || ''}
              onChange={(value) => handleSnsChange('twitter', value)}
            />

            <FormField label="ブランドコンテストを知ったきっかけは？" required>
              <Select
                options={howDidYouHearOptions}
                value={formData.howDidYouHear || ''}
                onChange={(value) => handleChange('howDidYouHear', value)}
                required
              />
            </FormField>

            {/* 送信ボタン */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="primary"
                className="px-6 py-2"
              >
                {isSubmitting ? '作成中...' : '続ける'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 