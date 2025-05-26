'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { mockBrands } from '@/types/mocks';

export default function BrandSettingsPage() {
  const brand = mockBrands[0]; // 仮のデータ

  const [formData, setFormData] = useState({
    name: brand.name,
    logoUrl: brand.logoUrl,
    description: brand.description,
    contact: brand.contact,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: フォームデータの送信処理
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">ブランド設定</h1>
        <p className="mt-2 text-gray-600">ブランド情報の確認・編集</p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                ブランド名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                ロゴ画像URL
              </label>
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              {formData.logoUrl && (
                <div className="mt-2">
                  <img
                    src={formData.logoUrl}
                    alt="ブランドロゴ"
                    className="h-20 w-20 object-contain"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                ブランド説明
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                連絡先メールアドレス
              </label>
              <input
                type="email"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="pt-6">
            <Button variant="primary" type="submit" className="w-full">
              設定を保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 