'use client';

import { useState } from 'react';
import { Brand } from '@/types/Brand';
import { FormField, Input, Textarea, FileUpload, SnsLinkField } from './ui';
import { Button } from '@/components/ui/button';


type Props = {
  brand: Brand;
  onSave?: (updatedData: Partial<Brand>) => void;
};

export function BrandInfoDisplay({ brand, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Brand>(brand);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(brand);
    setLogoFile(null);
    setLogoPreview(brand.logoUrl || null);
  };

  const handleSave = () => {
    if (onSave) {
      const updatedData: Partial<Brand> = {
        contactEmail: formData.contactEmail,
        name: formData.name,
        logoUrl: logoPreview === '' ? '' : (logoPreview || formData.logoUrl || ''),
        phoneNumber: formData.phoneNumber,
        snsLinks: formData.snsLinks,
        publicProfile: formData.publicProfile
      };
      
      onSave(updatedData);
    }
    setIsEditing(false);
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(brand);
    setLogoFile(null);
    setLogoPreview(null);
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

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">

          {/* フォーム */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <form className="space-y-6">
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
                  preview={logoPreview || brand.logoUrl || null}
                  onFileChange={setLogoFile}
                  onPreviewChange={setLogoPreview}
                  placeholder="ロゴ画像をアップロード"
                />
              </FormField>

              <FormField label="電話番号" required>
                <Input
                  type="tel"
                  value={formData.phoneNumber || ''}
                  onChange={(value) => handleChange('phoneNumber', value)}
                  required
                />
              </FormField>

              <FormField 
                label="ブランド紹介" 
                required
                description={`${formData.publicProfile.length}/500文字`}
              >
                <Textarea
                  value={formData.publicProfile}
                  onChange={(value) => handleChange('publicProfile', value)}
                  placeholder="あなたのブランドについて教えてください"
                  maxLength={500}
                  showCharCount={false}
                  required
                />
              </FormField>

              <SnsLinkField
                type="instagram"
                value={formData.snsLinks?.instagram || ''}
                onChange={(value) => handleSnsChange('instagram', value)}
              />

              <SnsLinkField
                type="twitter"
                value={formData.snsLinks?.twitter || ''}
                onChange={(value) => handleSnsChange('twitter', value)}
              />

              <SnsLinkField
                type="website"
                value={formData.snsLinks?.website || ''}
                onChange={(value) => handleSnsChange('website', value)}
              />

              {/* アクションボタン */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                >
                  キャンセル
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSave}
                  className="px-6 py-2"
                >
                  保存
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 表示モード
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">

        {/* 情報表示 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* ブランドメールアドレス */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ブランドメールアドレス
              </label>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-900">{brand.contactEmail}</p>
              </div>
            </div>

            {/* ブランド名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ブランド名
              </label>
              <p className="text-gray-900">{brand.name}</p>
            </div>

            {/* ブランドロゴ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                ブランドロゴ
              </label>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {brand.logoUrl ? (
                  <img 
                    src={brand.logoUrl} 
                    alt="ブランドロゴ" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      > 
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* 電話番号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電話番号
              </label>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-900">{brand.phoneNumber || '未設定'}</p>
              </div>
            </div>

            {/* ブランド紹介 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ブランド紹介
              </label>
              <p className="text-gray-900 whitespace-pre-wrap">{brand.publicProfile}</p>
            </div>

            {/* Instagram */}
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <label className="text-sm font-medium text-gray-700">Instagram</label>
              </div>
              {brand.snsLinks?.instagram ? (
                <a 
                  href={brand.snsLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  {brand.snsLinks.instagram}
                </a>
              ) : (
                <p className="text-gray-500">未設定</p>
              )}
            </div>

            {/* Twitter */}
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <label className="text-sm font-medium text-gray-700">X (Twitter)</label>
              </div>
              {brand.snsLinks?.twitter ? (
                <a 
                  href={brand.snsLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  {brand.snsLinks.twitter}
                </a>
              ) : (
                <p className="text-gray-500">未設定</p>
              )}
            </div>

            {/* ウェブサイト */}
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
                </svg>
                <label className="text-sm font-medium text-gray-700">ウェブサイト</label>
              </div>
              {brand.snsLinks?.website ? (
                <a 
                  href={brand.snsLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  {brand.snsLinks.website}
                </a>
              ) : (
                <p className="text-gray-500">未設定</p>
              )}
            </div>

            {/* 編集ボタン */}
            <div className="flex justify-end pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={handleEdit}
              >
                編集
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 