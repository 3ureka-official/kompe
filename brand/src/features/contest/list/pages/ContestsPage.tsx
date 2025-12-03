"use client";

import { ContestList } from "@/features/contest/list/components/ui-parts/ContestList";
import { ContestsPageHeader } from "@/features/contest/list/components/ui-parts/ContestsPageHeader";
import { ContestsPageLayout } from "@/features/contest/list/components/ui-parts/ContestsPageLayout";
import { EmptyContestsState } from "@/features/contest/list/components/ui-parts/EmptyContestsState";
import { useGetAllContests } from "@/features/contest/list/hooks/useGetAllContests";
import { useContext, useState, useMemo } from "react";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { Loading } from "@/components/ui-elements/Loading";
import { Contest } from "@/types/Contest";
import {
  getContestStatusType,
  ContestStatusType,
} from "@/utils/getContestStatus";

type FilterType = "all" | ContestStatusType;

export function ContestsPage() {
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
