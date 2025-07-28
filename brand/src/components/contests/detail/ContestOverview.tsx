import { Contest } from '@/types/contest';

type Props = {
  contest: Contest;
};

export function ContestOverview({ contest }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">コンテスト概要</h2>
      <p className="text-gray-700 leading-relaxed">{contest.description}</p>
    </div>
  );
} 