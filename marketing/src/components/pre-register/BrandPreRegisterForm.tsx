'use client';

import { useState } from 'react';
import { FormHeader } from './FormHeader';
import { TermsSection } from './TermsSection';
import { SubmitButton } from './SubmitButton';
import BrandSuccessPage from './BrandSuccessPage';
import { savePreBrand } from '@/services/preRegisterService';

export function BrandPreRegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    brandName: '',
    website: '',
    industry: '',
    hasReadTerms: false,
    hasReadPrivacy: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.name.trim()) {
      newErrors.name = '氏名を入力してください';
    }

    if (!formData.brandName.trim()) {
      newErrors.brandName = 'ブランド名を入力してください';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = '業種を選択してください';
    }

    if (!formData.hasReadTerms) {
      newErrors.hasReadTerms = '利用規約への同意が必要です';
    }

    if (!formData.hasReadPrivacy) {
      newErrors.hasReadPrivacy = 'プライバシーポリシーへの同意が必要です';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await savePreBrand({
        email: formData.email,
        name: formData.name,
        brandName: formData.brandName,
        website: formData.website || undefined,
        industry: formData.industry,
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData({ ...formData, ...updates });
    
    // Clear error when user starts typing
    Object.keys(updates).forEach(key => {
      if (errors[key]) {
        setErrors({ ...errors, [key]: '' });
      }
    });
  };

  if (isSubmitted) {
    return <BrandSuccessPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <FormHeader 
          title="Kompe"
          subtitle="ブランド様向け事前登録"
        />
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* メールアドレス */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent transition duration-200"
                placeholder="example@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* 氏名 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent transition duration-200"
              placeholder="山田太郎"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* ブランド名 */}
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
              ブランド名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="brandName"
              value={formData.brandName}
              onChange={(e) => updateFormData({ brandName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent transition duration-200"
              placeholder="ブランド名を入力"
            />
            {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>}
          </div>

          {/* Webページ（任意） */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Webページ
            </label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={(e) => updateFormData({ website: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent transition duration-200"
              placeholder="https://example.com"
            />
          </div>

          {/* 業種 */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              業種 <span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => updateFormData({ industry: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent appearance-none cursor-pointer transition duration-200"
            >
              <option value="" disabled>業種を選択してください</option>
              <option value="アパレル">アパレル</option>
              <option value="アプリ">アプリ</option>
              <option value="美容">美容</option>
              <option value="食品・飲料">食品・飲料</option>
              <option value="エンターテイメント">エンターテイメント</option>
              <option value="テクノロジー">テクノロジー</option>
              <option value="ライフスタイル">ライフスタイル</option>
              <option value="フィットネス・健康">フィットネス・健康</option>
              <option value="教育">教育</option>
              <option value="旅行・観光">旅行・観光</option>
              <option value="その他">その他</option>
            </select>
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
          </div>
          
          <TermsSection 
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
          
          <SubmitButton 
            isSubmitting={isSubmitting}
            buttonText="ブランド事前登録を完了する"
          />
        </form>
      </div>
    </div>
  );
} 