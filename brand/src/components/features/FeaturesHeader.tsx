'use client';

import Link from 'next/link';
import { Logo } from '../ui/Logo';

export function FeaturesHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左側: ブランドコンテストのロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo size="md" /> 
            <span className="text-xl font-bold text-gray-900">ブランドコンテスト</span>
          </Link>

          {/* 右側: ユーザーアイコン */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 