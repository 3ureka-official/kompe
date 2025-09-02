import { Contest } from "@/types/Contest";

type Props = {
  contest: Contest;
};

export function ContestOverview({ contest }: Props) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          コンテスト概要
        </h2>
        <div className="text-sm text-gray-500">{contest.description}</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          試供品について
        </h2>
        <div className="text-sm text-gray-500">{contest.supply_of_samples}</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">動画の条件</h2>
        <div className="text-sm text-gray-500">{contest.requirements}</div>
      </div>
    </div>
  );
}
