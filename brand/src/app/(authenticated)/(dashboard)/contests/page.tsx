"use client";

import { ContestList } from "@/components/contests/list/ContestList";
import { ContestsPageHeader } from "@/components/contests/list/ContestsPageHeader";
import { ContestsPageLayout } from "@/components/contests/list/ContestsPageLayout";
import { EmptyContestsState } from "@/components/contests/list/EmptyContestsState";
import { useGetAllContests } from "@/hooks/contest/useGetAllContests";
import { useContext } from "react";
import { BrandContext } from "@/contexts/BrandContext";

export default function ContestsPage() {
  const { brand } = useContext(BrandContext);
  const { data, isPending, refetch } = useGetAllContests(brand?.id || "");

  if (isPending) {
    return <div className="text-center py-8">Loading...</div>;
  }
  return (
    <ContestsPageLayout>
      <ContestsPageHeader />

      {data && data.length === 0 ? (
        <EmptyContestsState />
      ) : (
        <ContestList contests={data!} isLoading={false} refetch={refetch} />
      )}
    </ContestsPageLayout>
  );
}
