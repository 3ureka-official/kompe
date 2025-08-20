"use client";

import { useParams } from "next/navigation";
import { ContestHeader } from "@/components/contests/detail/ContestHeader";
import { ContestOverview } from "@/components/contests/detail/ContestOverview";
import { ContestAssets } from "@/components/contests/detail/ContestAssets";
import { ContestCreatorSection } from "@/components/contests/detail/ContestCreatorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useGetContest } from "@/hooks/contest/useGetContest";

export default function ContestDetailPage() {
  const params = useParams();

  const { getContestQuery } = useGetContest(params.id as string);
  const { data: contest, isPending, refetch } = getContestQuery;

  if (isPending) return <div>読み込み中...</div>;
  if (!contest) return <div>コンテストが見つかりません</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダー */}
      <ContestHeader contest={contest} refetch={refetch} />

      {/* タブ形式のコンテンツ */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="creators">参加者</TabsTrigger>
          <TabsTrigger value="assets">アセット</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* コンテスト概要 */}
          <ContestOverview contest={contest} />
        </TabsContent>

        <TabsContent value="creators" className="space-y-6">
          {/* 参加クリエイター */}
          <ContestCreatorSection contest={contest} />
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          {/* イメージ動画 */}
          <ContestAssets contest={contest} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
