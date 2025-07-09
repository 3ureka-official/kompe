'use client';

import React, { useState } from 'react';
import { FormHeader } from './FormHeader';
import { TermsSection } from './TermsSection';
import { SubmitButton } from './SubmitButton';
import { CreatorSuccessPage } from './CreatorSuccessPage';

export function CreatorPreRegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    tiktokHandle: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Firestoreに保存
      const { savePreCreator } = await import('@/services/preRegisterService');
      const result = await savePreCreator({
        email: formData.email,
        tiktokHandle: formData.tiktokHandle,
      });
      
      console.log('クリエイター登録成功:', result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <CreatorSuccessPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FE2C55] via-[#FF0050] to-[#25F4EE] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <FormHeader 
            title="Kompe クリエイター事前登録"
            subtitle="TikTokクリエイターとして新しい収益の扉を開こう"
          />

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* 基本情報 */}
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTokユーザネーム <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
                    <input
                      type="text"
                      name="tiktokHandle"
                      value={formData.tiktokHandle}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
                      placeholder="your_tiktok_name"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    TikTokのプロフィールに表示されているユーザネームを入力してください
                  </p>
                </div>
              </div>
            </div>

            <TermsSection />

            <SubmitButton 
              isSubmitting={isSubmitting}
              buttonText="事前登録を完了する"
            />
          </form>
        </div>
      </div>
    </div>
  );
} 