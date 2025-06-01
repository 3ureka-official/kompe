'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ContestPageHeader() {
  return (
    <div className="px-8 py-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900">コンテスト</h1>
      
      <Link href="/dashboard/contests/create">
        <Button color='black' variant="success" className="bg-primary-400 hover:bg-primary-500 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" color="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-black">コンテストを作成</span>
        </Button>
      </Link>
    </div>
  );
} 