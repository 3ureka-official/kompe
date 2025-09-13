import { Contest } from "@/types/Contest";
import { Separator } from "@/components/ui/Separator";

type Props = {
  contest: Contest;
};

export function ContestOverview({ contest }: Props) {
  return (
    <div>
      <div className="mt-4 mb-10">
        <h2 className="mb-4">コンテスト概要</h2>
        <div className="text-sm text-gray-500">{contest.description}</div>
      </div>

      <Separator />

      <div className="mt-4 mb-10">
        <h2 className="mb-4">試供品について</h2>
        <div className="text-sm text-gray-500">{contest.supply_of_samples}</div>
      </div>

      <Separator />

      <div className="mt-4 mb-10">
        <h2 className="mb-4">動画の条件</h2>
        <div className="text-sm text-gray-500">{contest.requirements}</div>
      </div>
    </div>
  );
}
