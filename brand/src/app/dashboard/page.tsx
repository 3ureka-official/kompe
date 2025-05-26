import { mockContests } from '@/types/mocks';
import { ContestCard } from '@/components/ContestCard';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">マイコンテスト</h1>
        <p className="mt-2 text-gray-600">開催中および過去のコンテスト一覧</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContests.map(contest => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>

      {mockContests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">開催したコンテストはありません</p>
        </div>
      )}
    </div>
  );
} 