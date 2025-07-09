'use client';

import { ContestList } from '@/components/contests/list/ContestList';
import { ContestsPageHeader } from '@/components/contests/list/ContestsPageHeader';
import { ContestsPageLayout } from '@/components/contests/list/ContestsPageLayout';
import { ContestsLoadingState } from '@/components/contests/list/ContestsLoadingState';
import { ContestsErrorState } from '@/components/contests/list/ContestsErrorState';
import { EmptyContestsState } from '@/components/contests/list/EmptyContestsState';
import { useContests } from '@/hooks/useContests';

export default function ContestsPage() {
  const { contests, loading, error } = useContests();

  if (loading) {
    return (
      <ContestsPageLayout>
        <ContestsLoadingState />
      </ContestsPageLayout>
    );
  }

  if (error) {
    return (
      <ContestsPageLayout>
        <ContestsErrorState error={error} />
      </ContestsPageLayout>
    );
  }

  return (
    <ContestsPageLayout>
      <ContestsPageHeader />
      
      {contests.length === 0 ? (
        <EmptyContestsState />
      ) : (
        <ContestList contests={contests} isLoading={false} />
      )}
    </ContestsPageLayout>
  );
} 