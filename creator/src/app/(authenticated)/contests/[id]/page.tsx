"use client";

import { useParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContest } from "@/hooks/useContest";
import { ContestHero } from "@/components/contest/ContestHero";
import { ContestDescription } from "@/components/contest/ContestDescription";
import { ContestGuidelines } from "@/components/contest/ContestGuidelines";
import { ContestRanking } from "@/components/contest/ContestRanking";
import { ContestSidebar } from "@/components/contest/ContestSidebar";

export default function ContestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contestId = params.id as string;

  const { contest, loading, error } = useContest({
    id: contestId,
    autoFetch: true,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            コンテストが見つかりません
          </h1>
          <p className="text-gray-600 mb-6">
            {error ||
              "お探しのコンテストは存在しないか、削除された可能性があります。"}
          </p>
          <Button onClick={() => router.push("/contests")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            コンテスト一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <ContestHero contest={contest} />

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：メインコンテンツ */}
          <div className="lg:col-span-2 space-y-8">
            <ContestDescription contest={contest} />
            <ContestGuidelines contest={contest} />
            <ContestRanking contest={contest} />
          </div>

          {/* 右側：サイドバー */}
          <div>
            <ContestSidebar contest={contest} />
          </div>
        </div>
      </div>
    </div>
  );
}
