'use client';

import { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { FormField, Input, Select, Textarea, FileUpload, SnsLinkField } from './ui';
import { Button } from '@/components/ui/button';
import { BrandCreationData } from '@/types/brand';

type Props = {
  onSubmit: (brandData: BrandCreationData) => void;
  onBack?: () => void;
  userEmail?: string;
};

const businessTypeOptions = [
  { value: '', label: '会社規模を選択してください' },
  { value: '1-10', label: '1-10名' },
  { value: '11-50', label: '11-50名' },
  { value: '51-200', label: '51-200名' },
  { value: '201-500', label: '201-500名' },
  { value: '500+', label: '500名以上' }
];

const howDidYouHearOptions = [
  { value: '', label: '選択してください' },
  { value: 'X', label: 'X (Twitter)' },
  { value: 'Youtube', label: 'YouTube' },
  { value: 'Google Search', label: 'Google検索' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Referred by a friend', label: '友人からの紹介' },
  { value: 'Other', label: 'その他' }
];

export function BrandCreationForm({ onSubmit, onBack, userEmail }: Props) {
  const [formData, setFormData] = useState<BrandCreationData>({
    name: '',
    logoFile: null,
    contactEmail: userEmail || '',
    phoneNumber: '',
    businessType: '',
    website: '',
    publicProfile: '',
    snsLinks: {
      twitter: '',
      instagram: '',
      facebook: '',
      website: ''
    },
    tiktokHandle: '',
    howDidYouHear: ''
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof BrandCreationData, value: any) => {
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
                file={formData.logoFile}
                preview={logoPreview}
                onFileChange={(file) => handleChange('logoFile', file)}
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
              description={`${formData.publicProfile.length}/240文字`}
            >
              <Textarea
                value={formData.publicProfile}
                onChange={(value) => handleChange('publicProfile', value)}
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