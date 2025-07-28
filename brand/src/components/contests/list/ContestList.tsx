'use client';

import { Contest } from '@/types/contest';
import { ContestCard } from '@/components/contests/list/ContestCard';

interface ContestListProps {
  contests: Contest[];
  isLoading?: boolean;
}

export function ContestList({ contests, isLoading = false }: ContestListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contests && contests.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">コンテストがありません</h3>
      </div>
    );
  }

  return (
    <div className="grid gap-6 mt-2">
      {contests && contests.map((contest, index) => (
        <ContestCard key={index} contest={contest} />
      ))}
    </div>
  );
} 