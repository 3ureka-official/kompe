'use client';

import { useState } from 'react';
import { BrandApplicationForm } from '@/types/Brand';
import { FormContainer, FormField, Input, Select, Textarea } from './ui';
import { Button } from '@/components/ui/button';

type Props = {
  onSubmit: (formData: BrandApplicationForm) => void;
  onSwitchToLogin: () => void;
};

const businessTypeOptions = [
  { value: '', label: '選択してください' },
  { value: 'fashion', label: 'ファッション・アパレル' },
  { value: 'beauty', label: '美容・コスメ' },
  { value: 'food', label: '食品・飲料' },
  { value: 'tech', label: 'IT・テクノロジー' },
  { value: 'lifestyle', label: 'ライフスタイル' },
  { value: 'sports', label: 'スポーツ・フィットネス' },
  { value: 'entertainment', label: 'エンターテイメント' },
  { value: 'other', label: 'その他' }
];

export function BrandApplicationFormComponent({ onSubmit, onSwitchToLogin }: Props) {
  const [formData, setFormData] = useState<BrandApplicationForm>({
    companyName: '',
    contactName: '',
    contactEmail: '',
    phoneNumber: '',
    businessType: '',
    website: '',
    description: ''
  });

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

  const handleChange = (field: keyof BrandApplicationForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <FormContainer
      title="ブランド申請"
      subtitle="ブランドパートナーとして参加するための申請フォームです"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="会社名" required>
          <Input
            value={formData.companyName}
            onChange={(value) => handleChange('companyName', value)}
            placeholder="例：ABC株式会社"
            required
          />
        </FormField>

        <FormField label="担当者名" required>
          <Input
            value={formData.contactName}
            onChange={(value) => handleChange('contactName', value)}
            placeholder="例：田中太郎"
            required
          />
        </FormField>

        <FormField label="メールアドレス" required>
          <Input
            type="email"
            value={formData.contactEmail}
            onChange={(value) => handleChange('contactEmail', value)}
            placeholder="contact@example.com"
            required
          />
        </FormField>

        <FormField label="電話番号" required>
          <Input
            type="tel"
            value={formData.phoneNumber}
            onChange={(value) => handleChange('phoneNumber', value)}
            placeholder="03-1234-5678"
            required
          />
        </FormField>

        <FormField label="業種" required>
          <Select
            options={businessTypeOptions}
            value={formData.businessType}
            onChange={(value) => handleChange('businessType', value)}
            required
          />
        </FormField>

        <FormField label="ウェブサイト">
          <Input
            type="url"
            value={formData.website || ''}
            onChange={(value) => handleChange('website', value)}
            placeholder="https://example.com"
          />
        </FormField>

        <FormField 
          label="事業内容" 
          required
          description={`${formData.description.length}/500文字`}
        >
          <Textarea
            value={formData.description}
            onChange={(value) => handleChange('description', value)}
            placeholder="事業内容や取り扱い商品について詳しく教えてください"
            maxLength={500}
            required
          />
        </FormField>

        <Button
          type="submit"
          className="w-full"
        >
          {isSubmitting ? '申請中...' : '申請を送信'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            既にアカウントをお持ちですか？{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-primary-400 hover:text-primary-500"
            >
              ログインはこちら
            </button>
          </p>
        </div>
      </form>
    </FormContainer>
  );
} 