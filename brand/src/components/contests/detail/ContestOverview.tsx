import { Contest } from "@/types/Contest";
import { Separator } from "@/components/ui/Separator";
import { formatCurrency } from "@/utils/format";

type Props = {
  contest: Contest;
};

export function ContestOverview({ contest }: Props) {
  return (
    <div>
      <div className="mt-4 mb-10">
        <h2 className="mb-1">コンテスト概要</h2>
        <div className="text-sm text-gray-500">{contest.description}</div>
      </div>

      <Separator />

      <div className="mt-4 mb-10">
        <h2 className="mb-1">賞金の分配</h2>
        <div className="text-sm text-gray-500">
          {contest.prize_distribution.map(
            (prize, index) =>
              prize > 0 && (
                <div className="flex items-center gap-2" key={index}>
                  <span className="text-sm text-gray-500">{index + 1}位:</span>
                  <span className="text-sm text-gray-500">
                    {formatCurrency(prize)}
                  </span>
                </div>
              ),
          )}
        </div>
      </div>

      <Separator />

      <div className="mt-4 mb-10">
        <h2 className="mb-1">試供品について</h2>
        <div className="text-sm text-gray-500">{contest.supply_of_samples}</div>
      </div>

      <Separator />

      <div className="mt-4 mb-10">
        <h2 className="mb-1">動画の条件</h2>
        <div className="text-sm text-gray-500">{contest.requirements}</div>
      </div>
    </div>
  );
}
