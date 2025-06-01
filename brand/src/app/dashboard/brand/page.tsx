'use client';

import { useState } from 'react';
import { BrandInfoDisplay } from '@/components/brand/BrandInfoDisplay';
import { Brand, mockBrands } from '@/types/brand';

export default function BrandPage() {
  // 現在のユーザーのブランド情報（実際にはAPIから取得）
  const [currentBrand, setCurrentBrand] = useState<Brand>(mockBrands[0]);

  // ブランド情報保存処理
  const handleSave = (section: string, updatedData: Partial<Brand>) => {
    const updatedBrand = {
      ...currentBrand,
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentBrand(updatedBrand);
    
    // TODO: APIに保存リクエストを送信
    console.log(`${section}セクションを更新:`, updatedData);
    alert(`${getSectionName(section)}を保存しました`);
  };

  const getSectionName = (section: string) => {
    switch (section) {
      case 'basic': return 'ブランド基本情報';
      case 'contact': return '連絡先情報';
      case 'sns': return 'SNSリンク';
      case 'public': return '公開情報';
      default: return '情報';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ブランド管理</h1>
        <p className="text-gray-600 mt-1">ブランド情報の確認・編集ができます</p>
      </div>
      
      <BrandInfoDisplay 
        brand={currentBrand}
        onSave={handleSave}
      />
    </div>
  );
} 