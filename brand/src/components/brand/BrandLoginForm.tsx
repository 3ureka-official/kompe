'use client';

import { useState } from 'react';
import { Brand } from '@/types/Brand';
import { FormContainer, FormField, Input, PasswordInput } from './ui';
import { Button } from '@/components/ui/button';
import { serverTimestamp } from 'firebase/firestore';

type Props = {
    onSubmit: (formData: Brand) => void;
  onSwitchToApplication: () => void;
};

export function BrandLoginFormComponent({ onSubmit, onSwitchToApplication }: Props) {
  const [formData, setFormData] = useState<Brand>({
    id: '',
    userId: '',
    name: '',
    logoUrl: '',
    contactEmail: '',
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

  const handleChange = (field: keyof Brand, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <FormContainer
      title="ブランドログイン"
      subtitle="ブランドアカウントにログインしてください"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="メールアドレス">
          <Input
            type="email"
            value={formData.contactEmail}
            onChange={(value) => handleChange('contactEmail', value)}
            placeholder="contact@example.com"
            required
          />
        </FormField>

        <FormField label="パスワード">
          <PasswordInput
            value={formData.phoneNumber}
            onChange={(value) => handleChange('phoneNumber', value)}
            required
          />
        </FormField>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="font-medium text-primary-400 hover:text-primary-500">
              パスワードを忘れた場合
            </a>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
        >
          {isSubmitting ? 'ログイン中...' : 'ログイン'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            まだアカウントをお持ちでない場合は{' '}
            <button
              type="button"
              onClick={onSwitchToApplication}
              className="font-medium text-primary-400 hover:text-primary-500"
            >
              ブランド申請はこちら
            </button>
          </p>
        </div>
      </form>
    </FormContainer>
  );
} 