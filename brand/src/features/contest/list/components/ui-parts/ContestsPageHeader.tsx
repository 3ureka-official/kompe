"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContestStatusType } from "@/utils/getContestStatus";

type FilterType = "all" | ContestStatusType;

type Props = {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export function ContestsPageHeader({ selectedFilter, onFilterChange }: Props) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "全て" },
    { value: "scheduled", label: "開催前" },
    { value: "holding", label: "応募・開催中" },
    { value: "ended", label: "終了" },
    { value: "draft", label: "下書き" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">コンテスト一覧</h1>
        </div>
        <Link href="/contests/create">
          <Button variant="default">新しいコンテストを作成</Button>
        </Link>
      </div>

      {/* フィルターボタン */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            variant={selectedFilter === filter.value ? "default" : "outline"}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
