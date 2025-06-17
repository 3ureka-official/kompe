'use client';

import { useState } from 'react';
import { BrandInfoDisplay } from '@/components/brand/BrandInfoDisplay';
import { Brand, mockBrands } from '@/types/brand';

export default function BrandPage() {
  // 現在のユーザーのブランド情報（実際にはAPIから取得）
  const [currentBrand, setCurrentBrand] = useState<Brand>(mockBrands[0]);

  // ブランド情報保存処理
  const handleSave = ( updatedData: Partial<Brand>) => {
    const updatedBrand = {
      ...currentBrand,
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentBrand(updatedBrand);
    
    // TODO: APIに保存リクエストを送信
    console.log('保存しました', updatedData);
    alert('保存しました');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ブランド管理</h1>
        <p className="text-gray-600 mt-1">ブランド情報の確認・編集ができます</p>
      </div>
      
      <BrandInfoDisplay 
        brand={currentBrand}
        onSave={(updatedData) => handleSave(updatedData)}
      />
    </div>
  );
} 