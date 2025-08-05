"use client";

import { ContestList } from "@/components/contests/list/ContestList";
import { ContestsPageHeader } from "@/components/contests/list/ContestsPageHeader";
import { ContestsPageLayout } from "@/components/contests/list/ContestsPageLayout";
import { EmptyContestsState } from "@/components/contests/list/EmptyContestsState";

export default function ContestsPage() {
  return (
    <ContestsPageLayout>
      <ContestsPageHeader />

      {/* {contests && contests.length === 0 ? (
        <EmptyContestsState />
      ) : (
        <ContestList contests={contests} isLoading={false} />
      )} */}
    </ContestsPageLayout>
  );
}
