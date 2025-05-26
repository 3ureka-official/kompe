import { mockContests } from '@/types/mocks';
import { ContestCard } from '@/components/ContestCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ContestListPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">コンテスト一覧</h1>
        <Link href="/contests/create">
          <Button variant="primary">
            新規コンテスト作成
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContests.map(contest => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>

      {mockContests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">現在開催中のコンテストはありません</p>
        </div>
      )}
    </div>
  );
} 