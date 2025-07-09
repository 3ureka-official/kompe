import { ContestDetail } from '@/types/contest';

type Props = {
  contest: ContestDetail;
};

export function ContestRequirements({ contest }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">応募要件</h2>
      <div className="space-y-3">
        {contest.requirements.map((req: string, index: number) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></div>
            <p className="text-gray-700">{req}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 