"use client";

import { ContestList } from "@/components/contests/list/ContestList";
import { ContestsPageHeader } from "@/components/contests/list/ContestsPageHeader";
import { ContestsPageLayout } from "@/components/contests/list/ContestsPageLayout";
import { EmptyContestsState } from "@/components/contests/list/EmptyContestsState";
import { useContests } from "@/hooks/useContests";

export default function ContestsPage() {
  const { contests } = useContests();

  return (
    <ContestsPageLayout>
      <ContestsPageHeader />

      {contests && contests.length === 0 ? (
        <EmptyContestsState />
      ) : (
        <ContestList contests={contests} isLoading={false} />
      )}
    </ContestsPageLayout>
  );
}
