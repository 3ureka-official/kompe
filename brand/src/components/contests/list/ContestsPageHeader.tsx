import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ContestsPageHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">コンテスト一覧</h1>
        <p className="text-gray-600 mt-1">作成したコンテストを管理できます</p>
      </div>
      <Link href="/dashboard/create">
        <Button className="bg-black text-white hover:bg-gray-800">
          新しいコンテストを作成
        </Button>
      </Link>
    </div>
  );
} 