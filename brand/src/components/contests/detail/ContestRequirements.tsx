import { Contest } from "@/types/Contest";

type Props = {
  contest: Contest;
};

export function ContestRequirements({ contest }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">応募要件</h2>
      <div className="space-y-3">
        <p className="text-gray-700">{contest.requirements}</p>
      </div>
    </div>
  );
}
