"use client";

import { ContestList } from "@/components/contests/list/ContestList";
import { ContestsPageHeader } from "@/components/contests/list/ContestsPageHeader";
import { ContestsPageLayout } from "@/components/contests/list/ContestsPageLayout";
import { EmptyContestsState } from "@/components/contests/list/EmptyContestsState";
import { useGetAllContests } from "@/hooks/contest/useGetAllContests";
import { useContext, useState, useMemo } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/Loading";
import { Contest } from "@/types/Contest";
import {
  getContestStatusType,
  ContestStatusType,
} from "@/utils/getContestStatus";

type FilterType = "all" | ContestStatusType;

export default function ContestsPage() {
  const { brand } = useContext(AuthContext);
  const { data, isPending, refetch } = useGetAllContests(brand?.id || "");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  // フィルターに応じてコンテストを絞り込み
  const filteredContests = useMemo(() => {
    if (!data || selectedFilter === "all") {
      return data || [];
    }

    return data.filter((contest: Contest) => {
      const statusType = getContestStatusType(contest);
      return statusType === selectedFilter;
    });
  }, [data, selectedFilter]);

  if (isPending) {
    return <Loading isPending={isPending} />;
  }

  return (
    <ContestsPageLayout>
      <ContestsPageHeader
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {filteredContests && filteredContests.length === 0 ? (
        <EmptyContestsState />
      ) : (
        <ContestList
          contests={filteredContests}
          isLoading={false}
          refetch={refetch}
        />
      )}
    </ContestsPageLayout>
  );
}
